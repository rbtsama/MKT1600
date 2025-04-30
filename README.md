# 资产信用管理系统

基于Vue 3和Tailwind CSS的前端资产信用管理系统，用于管理和追踪不同类型资产的信用历史。

## 项目概述

本系统旨在提供一个集中式平台，用于管理和监控多种资产类型的信用记录和使用历史。系统支持账号、虚拟号码、车辆和IP等多种资产类型，提供统一的信用管理界面，便于管理员追踪和处理不同资产的信用状况。

### 主要功能

- **多资产类型管理**：支持账号、虚拟号码、车辆和IP四大类资产管理
- **资产详情查看**：展示各类资产的基本信息和详细属性
- **信用历史记录**：查看和管理资产的使用历史和信用记录
- **信用操作管理**：支持发帖、待确认、手动删帖、删帖处罚、封号处罚等多种操作
- **处罚管理**：记录和管理各类资产的处罚历史和原因
- **信用数据统计**：统计展示资产的使用次数、最近使用、处罚次数等数据

## 技术栈

- **前端框架**：Vue 3 + Vite
- **UI框架**：Tailwind CSS
- **编程语言**：TypeScript
- **路由管理**：Vue Router
- **开发工具**：VSCode + Volar

## 安装和运行

### 环境要求

- Node.js 14.0+
- npm 6.14+

### 项目设置

```sh
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
src/
├─ assets/         # 静态资源
├─ components/     # 可复用组件
│  ├─ AssetDetail.vue    # 资产详情组件
│  ├─ AssetTable.vue     # 资产列表表格组件
│  ├─ HistoryTable.vue   # 历史记录表格组件
├─ data/           # 模拟数据
├─ router/         # 路由配置
├─ types/          # TypeScript类型定义
├─ views/          # 页面级组件
│  ├─ AccountAssets.vue    # 账号资产页面
│  ├─ VirtualNumberAssets.vue # 虚拟号资产页面
│  ├─ VehicleAssets.vue    # 车辆资产页面
│  ├─ IPAssets.vue         # IP资产页面
│  ├─ AssetHistory.vue     # 资产历史记录页面
├─ App.vue         # 根组件
├─ main.js         # 入口文件
```

## 开发指南

### 组件设计原则

- 使用Vue 3 Composition API和TypeScript
- 每个组件应专注于单一职责
- 使用Tailwind CSS进行样式设计
- 遵循项目统一的命名约定和代码风格

### 添加新资产类型

1. 在`types/`目录中定义新的资产类型接口
2. 在`data/mockData.js`中添加相应的模拟数据
3. 创建新的资产视图组件
4. 更新路由配置

## 贡献指南

1. Fork本仓库
2. 创建特性分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add some amazing feature'`
4. 推送到分支: `git push origin feature/amazing-feature`
5. 提交Pull Request

## 许可证

[MIT](LICENSE)
