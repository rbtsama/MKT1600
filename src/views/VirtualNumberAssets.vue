<template>
  <div>
    <div v-if="showDetail">
      <asset-detail 
        asset-type="virtualNumber"
        :asset="selectedAsset"
        @back="showDetail = false"
      />
    </div>
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
      columns: [
        { key: 'number', label: '虚拟号' },
        { key: 'status', label: '虚拟号状态' },
        { key: 'usageCount', label: '使用次数' },
        { key: 'lastUsed', label: '最近使用' },
        { key: 'lastPenalty', label: '最近处罚' },
        { key: 'deletionCount', label: '删帖处罚' },
        { key: 'banCount', label: '封号处罚' }
      ]
    }
  },
  methods: {
    /**
     * 查看虚拟号详情
     */
    viewDetails(asset) {
      this.selectedAsset = asset;
      this.showDetail = true;
    }
  }
}
</script> 