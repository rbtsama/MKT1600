<template>
  <div class="app-layout min-h-screen bg-gray-100">
    <!-- 导航头部 - 固定定位确保在页面滚动时保持在顶部 -->
    <header class="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div class="max-w-75 mx-auto">
        <div class="flex justify-between h-16 px-6">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900">资产信用管理系统</h1>
          </div>
          <div class="flex items-center space-x-4">
            <!-- 预留用户信息区域 -->
          </div>
        </div>
        
        <!-- 顶部Tab导航 - 居左布局 -->
        <nav class="flex">
          <router-link 
            to="/accounts" 
            class="px-6 py-4 text-center border-b-2 font-medium text-base transition-colors flex items-center mr-2"
            :class="[$route.path.startsWith('/accounts') ? 'border-blue-600 text-blue-700 font-semibold' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300']"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            账户资产
          </router-link>
          <router-link 
            to="/virtual-numbers" 
            class="px-6 py-4 text-center border-b-2 font-medium text-base transition-colors flex items-center mr-2"
            :class="[$route.path.startsWith('/virtual-numbers') ? 'border-blue-600 text-blue-700 font-semibold' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300']"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            虚拟号资产
          </router-link>
          <router-link 
            to="/vehicles" 
            class="px-6 py-4 text-center border-b-2 font-medium text-base transition-colors flex items-center mr-2"
            :class="[$route.path.startsWith('/vehicles') ? 'border-blue-600 text-blue-700 font-semibold' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300']"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm10.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" stroke-width="2"></path>
              <path d="M15 13h-4V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8z" stroke-width="0" fill="currentColor"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l1.5-5h11L19 11M19 14H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"></path>
            </svg>
            车辆资产
          </router-link>
          <router-link 
            to="/ips" 
            class="px-6 py-4 text-center border-b-2 font-medium text-base transition-colors flex items-center mr-2"
            :class="[$route.path.startsWith('/ips') ? 'border-blue-600 text-blue-700 font-semibold' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300']"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
            </svg>
            IP资产
          </router-link>
          <router-link 
            to="/history" 
            class="px-6 py-4 text-center border-b-2 font-medium text-base transition-colors flex items-center mr-2"
            :class="[$route.path.startsWith('/history') ? 'border-blue-600 text-blue-700 font-semibold' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300']"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            资产信用历史
          </router-link>
        </nav>
      </div>
    </header>

    <!-- 主内容区 - 添加上边距避免被固定导航遮挡 -->
    <main class="w-full max-w-75 mx-auto px-4 py-6 flex-1 mt-28">
      <!-- 路由视图 -->
      <router-view />
    </main>
  </div>
</template>

<script>
/**
 * 应用主布局组件
 * 
 * 提供整个应用的基础布局结构，包括顶部固定导航和内容区域
 */
export default {
  name: 'AppLayout'
}
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
}

.max-w-75 {
  max-width: 75%;
}

/* 平滑滚动效果 */
html {
  scroll-behavior: smooth;
}

/* 导航链接样式与动画效果 */
.router-link-active {
  transition: all 0.3s ease;
}

nav a {
  position: relative;
  overflow: hidden;
}

/* 导航下划线动画效果 */
nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #3b82f6;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

nav a:hover::after {
  width: 70%;
}

nav a.router-link-active::after {
  width: 100%;
}
</style> 