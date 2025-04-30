<template>
  <div>
    <div v-if="showDetail">
      <asset-detail 
        asset-type="ip"
        :asset="selectedAsset"
        @back="showDetail = false"
      />
    </div>
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
      columns: [
        { key: 'address', label: 'IP地址' },
        { key: 'location', label: 'IP所在地' },
        { key: 'provider', label: 'IP供应商' },
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
     * 查看IP详情
     */
    viewDetails(asset) {
      this.selectedAsset = asset;
      this.showDetail = true;
    }
  }
}
</script> 