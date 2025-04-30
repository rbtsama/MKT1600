<template>
  <div class="asset-table">
    <div class="bg-white shadow-md rounded-lg overflow-x-auto">
      <table class="w-full table-auto">
        <thead class="bg-gray-50">
          <tr>
            <th 
              v-for="(column, index) in columns" 
              :key="index"
              scope="col" 
              class="px-6 py-3 text-center text-base font-bold text-gray-700 uppercase tracking-wider cursor-pointer"
              @click="sortBy(column.key)"
            >
              {{ column.label }}
              <span v-if="sortKey === column.key" class="ml-1">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th scope="col" class="px-6 py-3 text-center text-base font-bold text-gray-700 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(item, idx) in paginatedData" :key="idx" class="hover:bg-gray-50 transition-colors">
            <td 
              v-for="(column, colIdx) in columns" 
              :key="colIdx"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center"
            >
              <slot :name="column.key" :item="item">
                <div v-if="column.key === 'status'" :class="getStatusClass(item.status)">
                  {{ isAccountStatus(item.status) ? getStatusText(item.status) : item.status }}
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
                  {{ item.lastUsed === 0 ? '' : `${item.lastUsed}天前` }}
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
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
              <button 
                @click="viewDetails(item)"
                class="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md hover:bg-blue-100 transition-colors"
              >
                详情
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页器 -->
    <div class="flex justify-between items-center mt-4">
      <div class="text-sm text-gray-700">
        显示 {{ startItem }} - {{ endItem }} 项，共 {{ filteredData.length }} 项
      </div>
      <div class="flex gap-2">
        <button 
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          上一页
        </button>
        <span class="px-3 py-1 border border-gray-300 rounded-md">{{ currentPage }} / {{ totalPages }}</span>
        <button 
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  },
  computed: {
    /**
     * 过滤后的数据
     */
    filteredData() {
      return this.data.filter(item => {
        return Object.values(item).some(value => {
          if (value === null) return false;
          if (this.searchQuery === '') return true;
          return String(value).toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      }).sort((a, b) => {
        let aValue = a[this.sortKey];
        let bValue = b[this.sortKey];
        
        // 处理null值和0值（对于lastUsed字段，0表示"今天"，应该排在最前面）
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
     * 设置排序方式
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
     * 查看资产详情
     */
    viewDetails(item) {
      this.$emit('view-details', item);
    },
    
    /**
     * 判断是否为账号状态
     */
    isAccountStatus(status) {
      return status === 'normal' || status === 'banned' || status === 'deleted';
    },
    
    /**
     * 获取状态CSS类
     */
    getStatusClass(status) {
      if (this.isAccountStatus(status)) {
        if (status === 'normal') return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
        if (status === 'banned' || status === 'deleted') return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800';
        return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
      }
      
      // 车辆状态不使用特殊样式
      if (status === 'Ready_For_Sale' || status === 'Fixed' || status === 'SOLD' || 
          status === 'Smoke' || status === 'Detailing' || status === 'Retail_Photo') {
        return 'text-sm';
      }
      
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
    },
    
    /**
     * 获取状态显示文本
     */
    getStatusText(status) {
      const statusMap = {
        'normal': '正常',
        'banned': '封号',
        'deleted': '删除'
      };
      return statusMap[status] || status;
    },
    
    /**
     * 获取等级CSS类
     */
    getLevelClass(level) {
      if (level === 'bronze') return 'text-amber-700 font-medium flex items-center';
      if (level === 'silver') return 'text-gray-600 font-medium flex items-center';
      if (level === 'gold') return 'text-yellow-600 font-medium flex items-center';
      return 'text-gray-900 font-medium flex items-center';
    },
    
    /**
     * 获取等级显示文本
     */
    getLevelText(level) {
      const levelMap = {
        'bronze': '青铜',
        'silver': '白银',
        'gold': '黄金'
      };
      return levelMap[level] || level;
    }
  }
}
</script>

<style scoped>
.asset-table {
  padding: 1rem;
  width: 100%;
}
</style> 