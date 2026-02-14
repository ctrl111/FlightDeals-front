# FlightDeals 身份认证与角色管理设计

## 🎯 核心理念

在 Web3 应用中，所有用户都通过钱包地址登录，但角色由智能合约或后端系统管理。

---

## 🔐 认证流程设计

### 方案 1: 智能合约角色管理 (推荐)

```
用户连接钱包
    ↓
获取钱包地址 (0x...)
    ↓
查询智能合约
    ↓
合约返回角色信息
    ↓
前端显示对应界面
```

#### 智能合约结构 (Solidity 示例)

```solidity
contract FlightDealsRoles {
    // 角色枚举
    enum Role { USER, AIRLINE, ADMIN }
    
    // 地址 => 角色映射
    mapping(address => Role) public userRoles;
    
    // 航司注册列表
    mapping(address => bool) public registeredAirlines;
    
    // 管理员地址
    address public owner;
    
    constructor() {
        owner = msg.sender;
        userRoles[msg.sender] = Role.ADMIN;
    }
    
    // 注册为航司 (需要管理员批准)
    function registerAirline(address airline) public {
        require(msg.sender == owner, "Only admin");
        userRoles[airline] = Role.AIRLINE;
        registeredAirlines[airline] = true;
    }
    
    // 查询角色
    function getRole(address user) public view returns (Role) {
        return userRoles[user];
    }
    
    // 默认角色为普通用户
    function getRoleOrDefault(address user) public view returns (Role) {
        if (registeredAirlines[user]) return Role.AIRLINE;
        if (user == owner) return Role.ADMIN;
        return Role.USER;
    }
}
```

#### 前端实现

```javascript
// 连接钱包后查询角色
async function connectWallet() {
    const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
    });
    const address = accounts[0];
    
    // 查询智能合约获取角色
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const role = await contract.getRoleOrDefault(address);
    
    // role: 0=USER, 1=AIRLINE, 2=ADMIN
    setWallet(address);
    setRole(role === 0 ? 'user' : role === 1 ? 'airline' : 'admin');
}
```

---

### 方案 2: 后端 API + 数据库管理

```
用户连接钱包
    ↓
获取钱包地址
    ↓
签名验证身份
    ↓
后端查询数据库
    ↓
返回角色信息
    ↓
前端显示对应界面
```

#### 签名验证流程

```javascript
// 1. 前端请求随机消息
const { nonce } = await fetch('/api/auth/nonce', {
    method: 'POST',
    body: JSON.stringify({ address: walletAddress })
});

// 2. 用户签名消息
const signature = await window.ethereum.request({
    method: 'personal_sign',
    params: [nonce, walletAddress]
});

// 3. 后端验证签名并返回角色
const { role, token } = await fetch('/api/auth/verify', {
    method: 'POST',
    body: JSON.stringify({ address: walletAddress, signature })
});

// 4. 保存 JWT token
localStorage.setItem('authToken', token);
setRole(role);
```

#### 后端 API 示例 (Node.js)

```javascript
// POST /api/auth/verify
app.post('/api/auth/verify', async (req, res) => {
    const { address, signature } = req.body;
    
    // 验证签名
    const recoveredAddress = ethers.utils.verifyMessage(nonce, signature);
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
        return res.status(401).json({ error: 'Invalid signature' });
    }
    
    // 查询数据库获取角色
    const user = await db.users.findOne({ address });
    const role = user?.role || 'user';
    
    // 生成 JWT
    const token = jwt.sign({ address, role }, SECRET_KEY);
    
    res.json({ role, token });
});
```

#### 数据库结构

```sql
CREATE TABLE users (
    address VARCHAR(42) PRIMARY KEY,
    role ENUM('user', 'airline', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE airline_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(42),
    company_name VARCHAR(255),
    license_number VARCHAR(100),
    status ENUM('pending', 'approved', 'rejected'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🏢 航司注册流程

### 选项 A: 管理员审批制

```
1. 航司提交申请
   - 公司名称
   - 营业执照
   - 联系方式
   - 钱包地址

2. 管理员审核
   - 查看申请材料
   - 验证资质
   - 批准/拒绝

3. 批准后
   - 智能合约记录角色
   - 或数据库更新角色
   - 航司获得发布权限
```

### 选项 B: 质押代币制

```
1. 航司质押代币
   - 质押 100 ETH (或平台代币)
   - 作为信誉保证金

2. 自动获得权限
   - 质押成功后立即获得航司角色
   - 违规可扣除保证金

3. 退出机制
   - 申请退出
   - 等待期 (如 30 天)
   - 退还保证金
```

---

## 👨‍💼 管理员管理

### 方案 1: 合约 Owner (去中心化)

```solidity
// 只有合约部署者是管理员
address public owner;

modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}

// 可以转移所有权
function transferOwnership(address newOwner) public onlyOwner {
    owner = newOwner;
}
```

### 方案 2: 多签钱包 (更安全)

```
使用 Gnosis Safe 等多签钱包
- 需要 3/5 管理员签名
- 防止单点故障
- 更加去中心化
```

### 方案 3: DAO 治理 (完全去中心化)

```
- 代币持有者投票
- 提案制度
- 时间锁机制
```

---

## 🔄 角色切换逻辑

### 当前实现 (开发/演示模式)

```javascript
// 仅用于开发测试
const [role, setRole] = useState('user');

// 手动切换 (生产环境应移除)
<select value={role} onChange={(e) => setRole(e.target.value)}>
    <option value="user">普通用户</option>
    <option value="airline">航空公司</option>
    <option value="admin">管理员</option>
</select>
```

### 生产环境实现

```javascript
// 连接钱包时自动获取角色
const handleConnect = async () => {
    try {
        // 1. 连接钱包
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        const address = accounts[0];
        
        // 2. 查询角色 (从智能合约或后端)
        const userRole = await fetchUserRole(address);
        
        // 3. 设置状态
        setWallet(address);
        setRole(userRole); // 'user' | 'airline' | 'admin'
        
        // 4. 不允许手动切换
        // 角色由链上数据或后端决定
        
    } catch (error) {
        console.error('Connection failed:', error);
    }
};

// 查询角色函数
async function fetchUserRole(address) {
    // 方案 1: 从智能合约查询
    const contract = new ethers.Contract(
        ROLE_CONTRACT_ADDRESS, 
        ROLE_ABI, 
        provider
    );
    const roleId = await contract.getRole(address);
    return roleId === 1 ? 'airline' : roleId === 2 ? 'admin' : 'user';
    
    // 方案 2: 从后端 API 查询
    const response = await fetch(`/api/users/${address}/role`);
    const { role } = await response.json();
    return role;
}
```

---

## 🎯 推荐实现方案

### 混合方案 (最佳实践)

```
┌─────────────────────────────────────────┐
│         用户连接钱包                      │
│         (MetaMask/WalletConnect)         │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    前端: 签名验证 (防止伪造地址)          │
│    const signature = await sign(nonce)   │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    后端: 验证签名 + 查询角色              │
│    - 数据库查询基础角色                   │
│    - 智能合约查询链上权限                 │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    返回角色 + JWT Token                  │
│    { role: 'airline', token: '...' }    │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    前端: 根据角色显示界面                 │
│    - user: 市场 + 个人中心                │
│    - airline: 市场 + 航司后台             │
│    - admin: 所有页面 + 管理面板           │
└─────────────────────────────────────────┘
```

### 优势
1. ✅ 安全: 签名验证防止地址伪造
2. ✅ 灵活: 后端可快速调整角色
3. ✅ 透明: 关键权限记录在链上
4. ✅ 高效: 不是每次操作都查询合约

---

## 📝 实现步骤

### 第一阶段: 基础认证
1. 集成 MetaMask 连接
2. 实现签名验证
3. 后端角色管理 API

### 第二阶段: 智能合约
1. 部署角色管理合约
2. 前端集成合约查询
3. 管理员批准流程

### 第三阶段: 高级功能
1. 航司申请系统
2. 质押机制
3. DAO 治理

---

## 🔒 安全考虑

1. **防止角色伪造**
   - 必须验证签名
   - 不能仅依赖前端状态

2. **权限验证**
   - 后端 API 必须验证角色
   - 不能只在前端隐藏按钮

3. **审计日志**
   - 记录所有角色变更
   - 链上事件监听

4. **多重验证**
   - 关键操作需要二次确认
   - 大额交易需要多签

---

## 💡 开发建议

### 当前阶段 (原型/演示)
- ✅ 保留手动切换功能
- ✅ 用于演示不同角色界面
- ✅ 添加明显的 "演示模式" 标识

### 生产环境
- ❌ 移除手动切换
- ✅ 实现真实的角色查询
- ✅ 添加角色申请流程
- ✅ 实现权限验证中间件

---

## 📚 参考资源

- [EIP-4337: Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337)
- [OpenZeppelin AccessControl](https://docs.openzeppelin.com/contracts/4.x/access-control)
- [WalletConnect Docs](https://docs.walletconnect.com/)
- [Gnosis Safe](https://gnosis-safe.io/)
