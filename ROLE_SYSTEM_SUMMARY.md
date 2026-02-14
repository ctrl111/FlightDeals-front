# FlightDeals 角色系统总结

## 🎯 你的问题

> "正常逻辑下用户、航司和管理员身份是怎么登录以及切换的？"

---

## ✅ 答案总结

### 1. 所有用户都通过钱包登录

```
用户 → 连接钱包 (MetaMask) → 获取地址 (0x...) → 系统自动识别角色
```

**没有传统的用户名/密码**，钱包地址就是唯一身份标识。

---

### 2. 角色如何分配？

#### 方案 A: 智能合约管理 (推荐)

```solidity
// 智能合约存储角色
mapping(address => Role) public userRoles;

// 查询角色
function getRole(address user) public view returns (Role) {
    return userRoles[user];
}
```

- ✅ 去中心化
- ✅ 透明公开
- ✅ 不可篡改

#### 方案 B: 后端数据库管理

```javascript
// 数据库查询
SELECT role FROM users WHERE address = '0x...'
```

- ✅ 灵活快速
- ✅ 易于管理
- ⚠️ 中心化

#### 方案 C: 混合方案 (最佳)

```
后端数据库 (基础角色) + 智能合约 (关键权限)
```

---

### 3. 航司如何获得权限？

#### 选项 1: 管理员审批

```
1. 航司提交申请
   - 公司名称
   - 营业执照
   - 钱包地址

2. 管理员审核
   - 验证资质
   - 批准/拒绝

3. 智能合约记录
   - 链上授权
   - 获得发布权限
```

#### 选项 2: 质押代币

```
1. 航司质押 100 ETH
2. 自动获得权限
3. 违规扣除保证金
```

---

### 4. 管理员如何产生？

#### 方案 1: 合约部署者

```solidity
address public owner;

constructor() {
    owner = msg.sender; // 部署者自动成为管理员
}
```

#### 方案 2: 多签钱包

```
需要 3/5 管理员签名才能执行关键操作
```

#### 方案 3: DAO 治理

```
代币持有者投票决定
```

---

### 5. 角色不能随意切换！

#### ❌ 错误做法 (当前演示版本)

```javascript
// 手动切换 - 仅用于开发测试
<select onChange={(e) => setRole(e.target.value)}>
    <option value="user">普通用户</option>
    <option value="airline">航空公司</option>
    <option value="admin">管理员</option>
</select>
```

#### ✅ 正确做法 (生产环境)

```javascript
// 连接钱包时自动获取角色
const handleConnect = async () => {
    const address = await connectWallet();
    const role = await getUserRole(address); // 从合约或后端查询
    setRole(role); // 不允许手动修改
};
```

---

## 🔄 完整登录流程

### 普通用户

```
1. 点击 "连接钱包"
2. MetaMask 弹出授权
3. 获取地址: 0xABC...
4. 查询角色: USER
5. 显示: 机票市场 + 个人中心
```

### 航空公司

```
1. 点击 "连接钱包"
2. MetaMask 弹出授权
3. 获取地址: 0xDEF...
4. 查询角色: AIRLINE (已注册)
5. 显示: 机票市场 + 航司后台
```

### 管理员

```
1. 点击 "连接钱包"
2. MetaMask 弹出授权
3. 获取地址: 0x123... (合约 owner)
4. 查询角色: ADMIN
5. 显示: 所有页面 + 管理面板
```

---

## 🛡️ 安全机制

### 1. 签名验证

```javascript
// 防止地址伪造
const nonce = generateNonce();
const signature = await wallet.signMessage(nonce);
const verified = verifySignature(address, nonce, signature);
```

### 2. 后端权限验证

```javascript
// API 必须验证角色
app.post('/api/flights/create', async (req, res) => {
    const { address } = req.user;
    const role = await getUserRole(address);
    
    if (role !== 'airline' && role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    
    // 创建航班...
});
```

### 3. 智能合约权限

```solidity
modifier onlyAirline() {
    require(userRoles[msg.sender] == Role.AIRLINE, "Not airline");
    _;
}

function createFlight(...) public onlyAirline {
    // 只有航司可以调用
}
```

---

## 📝 当前实现状态

### 演示模式 (开发中)

- ✅ 手动切换角色 (用于测试)
- ✅ 模拟钱包连接
- ✅ 本地角色数据库
- ⚠️ 不适合生产环境

### 生产模式 (待实现)

- ⏳ 真实 MetaMask 集成
- ⏳ 智能合约角色查询
- ⏳ 后端 API 验证
- ⏳ 航司申请流程
- ⏳ 管理员审批系统

---

## 🚀 实现步骤

### 第一阶段: 基础认证 ✅

- [x] 钱包连接模拟
- [x] 角色管理工具
- [x] 演示模式开关

### 第二阶段: Web3 集成

- [ ] MetaMask 真实连接
- [ ] 签名验证
- [ ] 智能合约部署
- [ ] 角色查询接口

### 第三阶段: 完整系统

- [ ] 航司申请表单
- [ ] 管理员审批界面
- [ ] 质押机制
- [ ] 权限验证中间件

---

## 💡 关键要点

1. **所有人都用钱包登录** - 没有用户名密码
2. **角色由系统分配** - 不能自己选择
3. **航司需要申请** - 管理员审批或质押代币
4. **管理员是合约 owner** - 或多签钱包
5. **演示模式仅用于开发** - 生产环境必须移除

---

## 📚 相关文件

- `AUTHENTICATION_DESIGN.md` - 详细设计文档
- `src/utils/roleManager.js` - 角色管理工具
- `src/app/page.js` - 主应用逻辑
- `src/components/Navbar.js` - 导航栏 (含角色显示)

---

## 🎯 下一步

1. 阅读 `AUTHENTICATION_DESIGN.md` 了解完整方案
2. 测试当前的演示模式
3. 决定使用哪种角色管理方案
4. 开始实现 Web3 集成

有任何问题随时问我！🚀
