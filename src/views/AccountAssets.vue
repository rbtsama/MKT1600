<template>
  <div>
    <div v-if="showDetail">
      <asset-detail 
        asset-type="account"
        :asset="selectedAsset"
        @back="showDetail = false"
      />
    </div>
    <div v-else>
      <asset-table
        title="账户资产管理"
        :columns="columns"
        :data="accountAssets"
        @view-details="viewDetails"
      />
    </div>
  </div>
</template>

<script>
import AssetTable from '../components/AssetTable.vue';
import AssetDetail from '../components/AssetDetail.vue';
import { accountAssets } from '../data/mockData';

export default {
  name: 'AccountAssets',
  components: {
    AssetTable,
    AssetDetail
  },
  data() {
    return {
      accountAssets,
      showDetail: false,
      selectedAsset: null,
      columns: [
        { key: 'username', label: '用户名' },
        { key: 'status', label: '账号状态' },
        { key: 'level', label: '账号等级' },
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
     * 查看账户详情
     */
    viewDetails(asset) {
      this.selectedAsset = asset;
      this.showDetail = true;
    }
  }
}
</script> 