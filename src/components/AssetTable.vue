<template>
  <div class="asset-table">
    <!-- 筛选区域 - 条件过滤器 -->
    <div class="bg-white shadow-md rounded-lg p-5 mb-4">
      <div class="flex flex-wrap items-end gap-4">
        <!-- 最近使用筛选 -->
        <div class="w-40">
          <label class="block text-sm font-medium text-gray-700 mb-1">最近使用</label>
          <select v-model="filters.lastUsed" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 bg-gray-50">
            <option value="-1">不限制</option>
            <option value="3">3天以上</option>
            <option value="8">8天以上</option>
            <option value="15">15天以上</option>
            <option value="31">31天以上</option>
          </select>
        </div>
        
        <!-- 最近停用筛选 -->
        <div class="w-40">
          <label class="block text-sm font-medium text-gray-700 mb-1">最近停用</label>
          <select v-model="filters.lastInactive" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 bg-gray-50">
            <option value="-1">不限制</option>
            <option value="3">3天以上</option>
            <option value="8">8天以上</option>
            <option value="15">15天以上</option>
            <option value="31">31天以上</option>
          </select>
        </div>
        
        <!-- 最近处罚筛选 -->
        <div class="w-40">
          <label class="block text-sm font-medium text-gray-700 mb-1">最近处罚</label>
          <select v-model="filters.lastPenalty" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 bg-gray-50">
            <option value="-1">不限制</option>
            <option value="3">3天以上</option>
            <option value="8">8天以上</option>
            <option value="15">15天以上</option>
            <option value="31">31天以上</option>
          </select>
        </div>
        
        <!-- 使用次数筛选 -->
        <div class="w-40">
          <label class="block text-sm font-medium text-gray-700 mb-1">使用次数</label>
          <select v-model="filters.usageCount" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 bg-gray-50">
            <option value="-1">不限制</option>
            <option value="0">0次以下</option>
            <option value="3">3次以下</option>
            <option value="5">5次以下</option>
            <option value="8">8次以下</option>
          </select>
        </div>
        
        <!-- 删帖处罚筛选 -->
        <div class="w-40">
          <label class="block text-sm font-medium text-gray-700 mb-1">删帖处罚</label>
          <select v-model="filters.deletionCount" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 bg-gray-50">
            <option value="-1">不限制</option>
            <option value="0">0次以下</option>
            <option value="2">2次以下</option>
            <option value="4">4次以下</option>
            <option value="6">6次以下</option>
          </select>
        </div>
        
        <!-- 封号处罚筛选 -->
        <div class="w-40">
          <label class="block text-sm font-medium text-gray-700 mb-1">封号处罚</label>
          <select v-model="filters.banCount" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 bg-gray-50">
            <option value="-1">不限制</option>
            <option value="0">0次以下</option>
            <option value="1">1次以下</option>
            <option value="2">2次以下</option>
            <option value="3">3次以下</option>
          </select>
        </div>
        
        <!-- 筛选按钮 -->
        <button 
          @click="applyFilters" 
          class="h-10 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors font-medium"
          aria-label="应用筛选条件"
        >
          筛选
        </button>
        
        <!-- 重置按钮 -->
        <button 
          @click="resetFilters" 
          class="h-10 px-6 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors font-medium"
          aria-label="重置所有筛选条件"
        >
          重置
        </button>
      </div>
    </div>

    <!-- 资产表格主体 -->
    <div class="bg-white shadow-md rounded-lg overflow-x-auto">
      <table class="w-full table-auto">
        <!-- 表头区域 - 支持排序 -->
        <thead class="bg-gray-800 text-white">
          <tr>
            <th 
              v-for="(column, index) in columns" 
              :key="index"
              scope="col" 
              class="px-4 py-3 text-center text-sm font-bold uppercase tracking-wider cursor-pointer"
              @click="sortBy(column.key)"
            >
              {{ column.label }}
              <span v-if="sortKey === column.key" class="ml-1">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th scope="col" class="px-4 py-3 text-center text-sm font-bold uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <!-- 表格内容区域 -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(item, idx) in paginatedData" :key="idx" class="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
            <td 
              v-for="(column, colIdx) in columns" 
              :key="colIdx"
              class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 text-center"
            >
              <!-- 使用具名插槽支持自定义单元格渲染 -->
              <slot :name="column.key" :item="item">
                <div v-if="column.key === 'status'" :class="getStatusClass(item.status)">
                  {{ getStatusText(item.status) }}
                </div>
                <div v-else-if="column.key === 'prepStatus'" class="text-sm">
                  {{ getPrepStatusText(item.prepStatus) }}
                </div>
                <div v-else-if="column.key === 'level'" :class="getLevelClass(item.level)">
                  <span class="flex items-center">
                    <span v-if="item.level === 'bronze'" class="mr-1.5 text-sm">🥉</span>
                    <span v-else-if="item.level === 'silver'" class="mr-1.5 text-sm">🥈</span>
                    <span v-else-if="item.level === 'gold'" class="mr-1.5 text-sm">🥇</span>
                    {{ getLevelText(item.level) }}
                  </span>
                </div>
                <div v-else-if="column.key === 'lastPenalty'" class="text-sm">
                  {{ item.lastPenalty === null ? '' : `${item.lastPenalty}天前` }}
                </div>
                <div v-else-if="column.key === 'lastUsed'" class="text-sm">
                  {{ item.lastUsed === 0 ? '0天前' : `${item.lastUsed}天前` }}
                </div>
                <div v-else-if="column.key === 'lastInactive'" class="text-sm">
                  {{ item.lastInactive === 0 ? '0天前' : `${item.lastInactive}天前` }}
                </div>
                <div v-else-if="column.key === 'vehicle'" class="flex flex-col">
                  <span class="text-sm">{{ item.brand }}</span>
                  <span class="text-xs text-gray-500">{{ item.detail }}</span>
                </div>
                <div v-else class="text-sm">
                  {{ item[column.key] }}
                </div>
              </slot>
            </td>
            <!-- 操作列 -->
            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-center">
              <button 
                @click="viewDetails(item)"
                class="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md hover:bg-blue-100 transition-colors"
                aria-label="查看详情"
              >
                详情
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页控制区 -->
    <div class="flex justify-between items-center mt-4">
      <div class="text-sm text-gray-700">
        显示 {{ startItem }} - {{ endItem }} 项，共 {{ filteredData.length }} 项
      </div>
      <div class="flex gap-2">
        <button 
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="上一页"
        >
          上一页
        </button>
        <span class="px-3 py-1 border border-gray-300 rounded-md">{{ currentPage }} / {{ totalPages }}</span>
        <button 
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="下一页"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 资产表格组件
 * 
 * 提供资产数据的表格展示、筛选、排序和分页功能
 * 支持通过具名插槽自定义单元格渲染
 */
export default {
  name: 'AssetTable',
  props: {
    /**
     * 表格标题
     */
    title: {
      type: String,
      required: true
    },
    /**
     * 表格列定义
     */
    columns: {
      type: Array,
      required: true
    },
    /**
     * 表格数据
     */
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchQuery: '',
      sortKey: 'lastUsed',
      sortOrder: 'asc',
      currentPage: 1,
      itemsPerPage: 20,
      activeFilters: {},
      filters: {
        lastUsed: '-1',
        lastInactive: '-1',
        lastPenalty: '-1',
        usageCount: '-1',
        deletionCount: '-1',
        banCount: '-1'
      }
    }
  },
  computed: {
    /**
     * 过滤后的数据
     */
    filteredData() {
      return this.data.filter(item => {
        // 搜索过滤
        let passSearch = true;
        if (this.searchQuery !== '') {
          passSearch = Object.values(item).some(value => {
            if (value === null) return false;
            return String(value).toLowerCase().includes(this.searchQuery.toLowerCase());
          });
        }
        
        // 条件过滤
        let passFilters = true;
        
        // 最近使用筛选
        if (this.activeFilters.lastUsed !== undefined && parseInt(this.activeFilters.lastUsed) > 0) {
          passFilters = passFilters && item.lastUsed >= parseInt(this.activeFilters.lastUsed);
        }
        
        // 最近停用筛选
        if (this.activeFilters.lastInactive !== undefined && parseInt(this.activeFilters.lastInactive) > 0) {
          passFilters = passFilters && (item.lastInactive !== null && item.lastInactive >= parseInt(this.activeFilters.lastInactive));
        }
        
        // 最近处罚筛选
        if (this.activeFilters.lastPenalty !== undefined && parseInt(this.activeFilters.lastPenalty) > 0) {
          passFilters = passFilters && (item.lastPenalty !== null && item.lastPenalty >= parseInt(this.activeFilters.lastPenalty));
        }
        
        // 使用次数筛选
        if (this.activeFilters.usageCount !== undefined && parseInt(this.activeFilters.usageCount) >= 0) {
          passFilters = passFilters && item.usageCount < parseInt(this.activeFilters.usageCount);
        }
        
        // 删帖处罚筛选
        if (this.activeFilters.deletionCount !== undefined && parseInt(this.activeFilters.deletionCount) >= 0) {
          passFilters = passFilters && item.deletionCount < parseInt(this.activeFilters.deletionCount);
        }
        
        // 封号处罚筛选
        if (this.activeFilters.banCount !== undefined && parseInt(this.activeFilters.banCount) >= 0) {
          passFilters = passFilters && item.banCount < parseInt(this.activeFilters.banCount);
        }
        
        return passSearch && passFilters;
      }).sort((a, b) => {
        let aValue = a[this.sortKey];
        let bValue = b[this.sortKey];
        
        // 处理null值和0值（对于lastUsed字段，0表示"0天前"，应该排在最前面）
        if (this.sortKey === 'lastUsed') {
          // 处理null或undefined值，排在最后
          if (aValue === null || aValue === undefined) return this.sortOrder === 'asc' ? 1 : -1;
          if (bValue === null || bValue === undefined) return this.sortOrder === 'asc' ? -1 : 1;
          
          // 使用数值比较
          return this.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        // 处理其他字段的null值
        if (aValue === null || aValue === undefined) return this.sortOrder === 'asc' ? 1 : -1;
        if (bValue === null || bValue === undefined) return this.sortOrder === 'asc' ? -1 : 1;
        
        // 处理字符串比较
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortOrder === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        // 处理数值比较
        return this.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      });
    },
    
    /**
     * 分页后的数据
     */
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredData.slice(start, end);
    },
    
    /**
     * 总页数
     */
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage) || 1;
    },
    
    /**
     * 当前页起始项
     */
    startItem() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    
    /**
     * 当前页结束项
     */
    endItem() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredData.length);
    }
  },
  methods: {
    /**
     * 应用筛选条件
     */
    applyFilters() {
      this.activeFilters = JSON.parse(JSON.stringify(this.filters));
      this.currentPage = 1; // 重置到第一页
    },
    
    /**
     * 重置筛选条件
     */
    resetFilters() {
      this.filters = {
        lastUsed: '-1',
        lastInactive: '-1',
        lastPenalty: '-1',
        usageCount: '-1',
        deletionCount: '-1',
        banCount: '-1'
      };
      this.activeFilters = JSON.parse(JSON.stringify(this.filters));
      this.currentPage = 1;
    },
    
    /**
     * 设置排序方式
     * @param {string} key - 要排序的列名
     */
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'desc';
      }
    },
    
    /**
     * 查看详情
     * @param {Object} item - 要查看的资产对象
     */
    viewDetails(item) {
      this.$emit('view-details', item);
    },
    
    /**
     * 获取状态样式类
     * @param {string} status - 状态值
     * @returns {string} CSS类名
     */
    getStatusClass(status) {
      const statusClasses = {
        'active': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
        'inactive': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800',
        'warning': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800',
        'penalty': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'
      };
      return statusClasses[status] || statusClasses['inactive'];
    },
    
    /**
     * 获取状态文本
     * @param {string} status - 状态值
     * @returns {string} 格式化的状态文本
     */
    getStatusText(status) {
      const statusText = {
        'active': '使用中',
        'inactive': '未使用',
        'warning': '警告',
        'penalty': '处罚中'
      };
      return statusText[status] || '未知状态';
    },
    
    /**
     * 获取整备状态文本
     * @param {string} status - 整备状态值
     * @returns {string} 格式化的整备状态文本
     */
    getPrepStatusText(status) {
      const statusText = {
        'ready': '已整备',
        'pending': '待整备',
        'repairing': '整备中',
        'na': '不适用'
      };
      return statusText[status] || '未知状态';
    },
    
    /**
     * 获取等级样式类
     * @param {string} level - 等级值
     * @returns {string} CSS类名
     */
    getLevelClass(level) {
      const levelClasses = {
        'bronze': 'text-amber-700',
        'silver': 'text-gray-500',
        'gold': 'text-yellow-500'
      };
      return levelClasses[level] || '';
    },
    
    /**
     * 获取等级文本
     * @param {string} level - 等级值
     * @returns {string} 格式化的等级文本
     */
    getLevelText(level) {
      const levelText = {
        'bronze': '铜牌',
        'silver': '银牌',
        'gold': '金牌'
      };
      return levelText[level] || '无等级';
    }
  }
}
</script>

<style scoped>
.asset-table {
  width: 100%;
}

:deep(th) {
  position: relative;
  overflow: hidden;
  letter-spacing: 0.025em;
  font-size: 0.875rem;
}

:deep(th):after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: rgba(255,255,255,0.3);
  transform: translateY(1px);
  transition: transform 0.2s;
}

:deep(th:hover):after {
  transform: translateY(0);
}

:deep(table) {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

:deep(tbody tr) {
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

:deep(tbody tr):hover {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  background-color: #f9fafb;
}

:deep(tbody td) {
  border-bottom: 1px solid #f3f4f6;
}

:deep(tbody tr:last-child td) {
  border-bottom: none;
}
</style> 