<template>
  <div>
    <div v-if="ip">
      <asset-detail 
        asset-type="ip"
        :asset="ip"
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
import { ipAssets } from '../data/mockData';

const route = useRoute();
const router = useRouter();
const ip = ref(null);

// IP地址
const address = computed(() => route.params.address as string);

/**
 * 获取并设置IP信息
 */
function loadIPData() {
  const found = ipAssets.find(item => item.address === address.value);
  if (found) {
    ip.value = found;
  } else {
    // 没有找到IP，显示错误信息或跳转到404页面
    console.error('未找到IP数据:', address.value);
  }
}

/**
 * 返回上一页
 */
function goBack() {
  router.push('/ips');
}

// 组件挂载时加载数据
onMounted(() => {
  loadIPData();
});
</script> 