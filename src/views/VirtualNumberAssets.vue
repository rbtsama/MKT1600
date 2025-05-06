<template>
  <div>
    <!-- 详情模式 - 显示虚拟号详情 -->
    <div v-if="showDetail">
      <asset-detail 
        asset-type="virtualNumber"
        :asset="selectedAsset"
        @back="showDetail = false"
      />
    </div>
    <!-- 列表模式 - 显示所有虚拟号资产 -->
    <div v-else>
      <asset-table
        title="虚拟号资产管理"
        :columns="columns"
        :data="virtualNumberAssets"
        @view-details="viewDetails"
      />
    </div>
  </div>
</template>

<script>
import AssetTable from '../components/AssetTable.vue';
import AssetDetail from '../components/AssetDetail.vue';
import { virtualNumberAssets } from '../data/mockData';

/**
 * 虚拟号资产管理页面
 * 
 * 提供虚拟号资产的列表展示和详情查看功能
 */
export default {
  name: 'VirtualNumberAssets',
  components: {
    AssetTable,
    AssetDetail
  },
  data() {
    return {
      virtualNumberAssets,
      showDetail: false,
      selectedAsset: null,
      // 表格列配置 - 列顺序遵循统一的业务逻辑排列
      columns: [
        { key: 'number', label: '虚拟号' },
        { key: 'status', label: '虚拟号状态' },
        { key: 'lastUsed', label: '最近使用' },
        { key: 'lastInactive', label: '最近停用' },
        { key: 'lastPenalty', label: '最近处罚' },
        { key: 'usageCount', label: '使用次数' },
        { key: 'deletionCount', label: '删帖处罚' },
        { key: 'banCount', label: '封号处罚' }
      ]
    }
  },
  methods: {
    /**
     * 查看虚拟号详情
     * @param {Object} asset - 选中的虚拟号资产对象
     */
    viewDetails(asset) {
      this.selectedAsset = asset;
      this.showDetail = true;
    }
  }
}
</script> 