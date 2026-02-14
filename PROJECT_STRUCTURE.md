# FlightDeals Frontend - 项目结构说明

## 📁 目录结构

```
flight-deals-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.js          # 根布局
│   │   ├── page.js            # 主应用入口
│   │   └── globals.css        # 全局样式
│   ├── components/            # React 组件
│   │   ├── Navbar.js          # 导航栏
│   │   ├── Notification.js    # 通知提示
│   │   ├── CountdownTimer.js  # 倒计时组件
│   │   ├── LandingPage.js     # 登录落地页
│   │   ├── Marketplace.js     # 机票市场
│   │   ├── UserProfile.js     # 用户个人中心
│   │   ├── AirlineDashboard.js # 航司后台
│   │   └── AdminPanel.js      # 管理员面板
│   └── data/
│       └── mockData.js        # 模拟数据
├── public/                    # 静态资源
└── package.json              # 项目依赖

```

## 🧩 组件说明

### 核心组件

- **page.js**: 主应用逻辑，管理状态和路由
- **Navbar.js**: 顶部导航栏，支持角色切换和钱包显示
- **LandingPage.js**: 未登录时的欢迎页面
- **Notification.js**: 全局通知组件

### 功能组件

- **Marketplace.js**: 机票列表展示和购买
- **UserProfile.js**: 用户订单管理
- **AirlineDashboard.js**: 航空公司发布航班
- **AdminPanel.js**: 系统管理员审计
- **CountdownTimer.js**: 实时倒计时

## 🚀 运行项目

```bash
cd flight-deals-frontend
npm install
npm run dev
```

访问 http://localhost:3000

## 🎨 技术栈

- Next.js 16
- React 19
- Tailwind CSS 4
- Lucide React (图标库)

## 📝 功能特性

- 钱包连接模拟
- 三种角色切换 (用户/航司/管理员)
- 机票浏览和购买
- 订单管理
- 航班发布
- 系统审计
