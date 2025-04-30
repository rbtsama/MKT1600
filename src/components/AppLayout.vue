<template>
  <div class="app-layout min-h-screen bg-gray-100">
    <!-- 导航头部 -->
    <header class="bg-white shadow-sm">
      <div class="max-w-75 mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900">资产信用管理系统</h1>
          </div>
          <div class="flex items-center space-x-4">
            <!-- 管理员文字已移除 -->
          </div>
        </div>
        
        <!-- 顶部Tab导航 -->
        <nav class="flex -mb-px pb-0">
          <router-link 
            to="/accounts" 
            class="px-4 py-3 text-center border-b-2 font-medium text-sm transition-colors flex items-center"
            :class="[$route.path.startsWith('/accounts') ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            账户资产
          </router-link>
          <router-link 
            to="/virtual-numbers" 
            class="px-4 py-3 text-center border-b-2 font-medium text-sm transition-colors flex items-center"
            :class="[$route.path.startsWith('/virtual-numbers') ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            虚拟号资产
          </router-link>
          <router-link 
            to="/vehicles" 
            class="px-4 py-3 text-center border-b-2 font-medium text-sm transition-colors flex items-center"
            :class="[$route.path.startsWith('/vehicles') ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
            车辆资产
          </router-link>
          <router-link 
            to="/ips" 
            class="px-4 py-3 text-center border-b-2 font-medium text-sm transition-colors flex items-center"
            :class="[$route.path.startsWith('/ips') ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
            </svg>
            IP资产
          </router-link>
          <router-link 
            to="/history" 
            class="px-4 py-3 text-center border-b-2 font-medium text-sm transition-colors flex items-center"
            :class="[$route.path.startsWith('/history') ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            资产信用历史
          </router-link>
        </nav>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="w-full max-w-75 mx-auto px-4 py-6 flex-1">
      <!-- 路由视图 -->
      <router-view />
    </main>
  </div>
</template>

<script>
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
</style> 