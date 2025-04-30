<template>
  <div>
    <div v-if="showDetail">
      <asset-detail 
        asset-type="vehicle"
        :asset="selectedAsset"
        @back="showDetail = false"
      />
    </div>
    <div v-else>
      <asset-table
        title="车辆资产管理"
        :columns="columns"
        :data="vehicleAssets"
        @view-details="viewDetails"
      >
        <template #vehicle="{ item }">
          <div class="flex flex-col">
            <span class="font-medium">{{ item.brand }}</span>
            <span class="text-sm text-gray-500">{{ item.detail }}</span>
          </div>
        </template>
      </asset-table>
    </div>
  </div>
</template>

<script>
import AssetTable from '../components/AssetTable.vue';
import AssetDetail from '../components/AssetDetail.vue';
import { vehicleAssets } from '../data/mockData';

export default {
  name: 'VehicleAssets',
  components: {
    AssetTable,
    AssetDetail
  },
  data() {
    return {
      vehicleAssets,
      showDetail: false,
      selectedAsset: null,
      columns: [
        { key: 'vehicle', label: '车辆信息' },
        { key: 'vin', label: 'VIN码' },
        { key: 'status', label: '车辆状态' },
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
     * 查看车辆详情
     */
    viewDetails(asset) {
      this.selectedAsset = asset;
      this.showDetail = true;
    }
  }
}
</script> 