<template>
  <div>
    <!-- 详情模式 - 显示车辆详情 -->
    <div v-if="showDetail">
      <asset-detail 
        asset-type="vehicle"
        :asset="selectedAsset"
        @back="showDetail = false"
      />
    </div>
    <!-- 列表模式 - 显示所有车辆资产 -->
    <div v-else>
      <asset-table
        title="车辆资产管理"
        :columns="columns"
        :data="vehicleAssets"
        @view-details="viewDetails"
      >
        <!-- 自定义车辆信息显示插槽 -->
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

/**
 * 车辆资产管理页面
 * 
 * 提供车辆资产的列表展示和详情查看功能
 * 包含自定义车辆信息的显示格式
 */
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
      // 表格列配置 - 列顺序遵循统一的业务逻辑排列
      columns: [
        { key: 'vehicle', label: '车辆信息' },
        { key: 'vin', label: 'VIN码' },
        { key: 'prepStatus', label: '整备状态' },
        { key: 'status', label: '车辆状态' },
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
     * 查看车辆详情
     * @param {Object} asset - 选中的车辆资产对象
     */
    viewDetails(asset) {
      this.selectedAsset = asset;
      this.showDetail = true;
    }
  }
}
</script> 