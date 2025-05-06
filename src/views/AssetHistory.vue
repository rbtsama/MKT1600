<template>
  <div class="asset-history-modern">
    <!-- 页面头部 - 标题和搜索过滤区域 -->
    <div class="page-header">
      <h1 class="page-title">资产信用历史</h1>
      <div class="header-actions">
        <!-- 搜索框 -->
        <div class="search-container">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索VIN..."
            class="search-input"
          />
          <button class="search-button" aria-label="搜索">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <!-- 当前筛选标签 -->
        <div class="filter-badge" v-if="currentFilter">
          <span>{{ getFilterText }}</span>
          <button @click="clearFilter" class="clear-filter" aria-label="清除筛选">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 历史记录表格 -->
    <history-table 
      :data="filteredHistories"
      :asset-filter="currentFilter"
    />
  </div>
</template>

<script>
import HistoryTable from '../components/HistoryTable.vue';
import { assetHistories } from '../data/mockData';
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/**
 * 资产信用历史页面
 * 
 * 显示资产的信用历史记录，支持搜索和筛选功能
 */
export default {
  name: 'AssetHistory',
  components: {
    HistoryTable
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const searchQuery = ref('');
    
    /**
     * 从路由参数获取过滤信息
     * 用于确定是否应用特定资产类型和值的筛选
     */
    const currentFilter = computed(() => {
      const { type, value } = route.params;
      if (type && value) {
        return { type, value };
      }
      return null;
    });
    
    /**
     * 格式化筛选文本显示
     * 将资产类型代码转换为用户可读的中文名称
     */
    const getFilterText = computed(() => {
      if (!currentFilter.value) return '';
      
      const typeMap = {
        'account': '账号',
        'virtualNumber': '虚拟号',
        'vehicle': '车辆',
        'ip': 'IP'
      };
      
      return `${typeMap[currentFilter.value.type] || currentFilter.value.type}: ${currentFilter.value.value}`;
    });
    
    /**
     * 清除当前筛选条件
     * 通过路由导航回到无筛选状态
     */
    const clearFilter = () => {
      router.push({ name: 'AssetHistory' });
    };
    
    /**
     * 根据搜索关键字过滤历史记录
     * 在所有相关字段中搜索匹配项
     */
    const filteredHistories = computed(() => {
      if (!searchQuery.value) {
        return assetHistories;
      }
      
      const query = searchQuery.value.toLowerCase();
      return assetHistories.filter(item => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.account.toLowerCase().includes(query) ||
          item.virtualNumber.toLowerCase().includes(query) ||
          item.vehicle.toLowerCase().includes(query) ||
          item.ip.toLowerCase().includes(query)
        );
      });
    });
    
    return {
      assetHistories,
      filteredHistories,
      searchQuery,
      currentFilter,
      getFilterText,
      clearFilter
    }
  }
}
</script>

<style scoped>
.asset-history-modern {
  padding: 1.5rem;
  background-color: #f9fafb;
  width: 100%;
  max-width: 100%;
}

/* 页面头部样式 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

/* 页面标题样式 */
.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  position: relative;
  padding-left: 1rem;
}

/* 标题前的装饰条 */
.page-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.25rem;
  height: 1.25rem;
  width: 0.25rem;
  background: linear-gradient(to bottom, #4b5563, #1f2937);
  border-radius: 0.125rem;
}

/* 头部操作区域样式 */
.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* 搜索框容器 */
.search-container {
  position: relative;
  width: 300px;
}

/* 搜索输入框 */
.search-input {
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: white;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #6b7280;
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.1);
}

/* 搜索按钮 */
.search-button {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.search-button:hover {
  color: #4b5563;
}

/* 筛选标签 */
.filter-badge {
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* 清除筛选按钮 */
.clear-filter {
  margin-left: 0.5rem;
  color: #4b5563;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.125rem;
  border-radius: 9999px;
  display: flex;
  transition: background-color 0.2s;
}

.clear-filter:hover {
  background-color: #e5e7eb;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .search-container {
    width: 100%;
  }
}
</style> 