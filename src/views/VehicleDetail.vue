<template>
  <div>
    <div v-if="vehicle">
      <asset-detail 
        asset-type="vehicle"
        :asset="vehicle"
        @back="goBack"
      />
    </div>
    <div v-else class="p-4 text-center">
      <div class="animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
        <div class="h-8 bg-gray-200 rounded mb-6"></div>
        <div class="h-32 bg-gray-200 rounded mb-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AssetDetail from '../components/AssetDetail.vue';
import { vehicleAssets } from '../data/mockData';

const route = useRoute();
const router = useRouter();
const vehicle = ref(null);

// 车辆VIN码
const vin = computed(() => route.params.vin as string);

/**
 * 获取并设置车辆信息
 */
function loadVehicleData() {
  const found = vehicleAssets.find(item => item.vin === vin.value);
  if (found) {
    vehicle.value = found;
  } else {
    // 没有找到车辆，显示错误信息或跳转到404页面
    console.error('未找到车辆数据:', vin.value);
  }
}

/**
 * 返回上一页
 */
function goBack() {
  router.push('/vehicles');
}

// 组件挂载时加载数据
onMounted(() => {
  loadVehicleData();
});
</script> 