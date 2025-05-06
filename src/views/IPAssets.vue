<template>
  <div>
    <!-- 详情模式 - 显示IP详情 -->
    <div v-if="showDetail">
      <asset-detail 
        asset-type="ip"
        :asset="selectedAsset"
        @back="showDetail = false"
      />
    </div>
    <!-- 列表模式 - 显示所有IP资产 -->
    <div v-else>
      <asset-table
        title="IP资产管理"
        :columns="columns"
        :data="ipAssets"
        @view-details="viewDetails"
      />
    </div>
  </div>
</template>

<script>
import AssetTable from '../components/AssetTable.vue';
import AssetDetail from '../components/AssetDetail.vue';
import { ipAssets } from '../data/mockData';

/**
 * IP资产管理页面
 * 
 * 提供IP资产的列表展示和详情查看功能
 */
export default {
  name: 'IPAssets',
  components: {
    AssetTable,
    AssetDetail
  },
  data() {
    return {
      ipAssets,
      showDetail: false,
      selectedAsset: null,
      // 表格列配置 - 列顺序遵循统一的业务逻辑排列
      columns: [
        { key: 'address', label: 'IP地址' },
        { key: 'location', label: 'IP所在地' },
        { key: 'provider', label: 'IP供应商' },
        { key: 'status', label: 'IP状态' },
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
     * 查看IP详情
     * @param {Object} asset - 选中的IP资产对象
     */
    viewDetails(asset) {
      this.selectedAsset = asset;
      this.showDetail = true;
    }
  }
}
</script> 