<template>
  <div>
    <!-- 详情模式 - 显示账户详情 -->
    <div v-if="showDetail">
      <asset-detail 
        asset-type="account"
        :asset="selectedAsset"
        @back="showDetail = false"
      />
    </div>
    <!-- 列表模式 - 显示所有账户资产 -->
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

/**
 * 账户资产管理页面
 * 
 * 提供账户资产的列表展示和详情查看功能
 */
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
      // 表格列配置 - 列顺序遵循统一的业务逻辑排列
      columns: [
        { key: 'username', label: '用户名' },
        { key: 'status', label: '账号状态' },
        { key: 'level', label: '账号等级' },
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
     * 查看账户详情
     * @param {Object} asset - 选中的账户资产对象
     */
    viewDetails(asset) {
      this.selectedAsset = asset;
      this.showDetail = true;
    }
  }
}
</script> 