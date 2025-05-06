<template>
  <div>
    <div v-if="account">
      <asset-detail 
        asset-type="account"
        :asset="account"
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
import { accountAssets } from '../data/mockData';

const route = useRoute();
const router = useRouter();
const account = ref(null);

// 账号用户名
const username = computed(() => route.params.username as string);

/**
 * 获取并设置账号信息
 */
function loadAccountData() {
  const found = accountAssets.find(item => item.username === username.value);
  if (found) {
    account.value = found;
  } else {
    // 没有找到账号，显示错误信息或跳转到404页面
    console.error('未找到账号数据:', username.value);
  }
}

/**
 * 返回上一页
 */
function goBack() {
  router.push('/accounts');
}

// 组件挂载时加载数据
onMounted(() => {
  loadAccountData();
});
</script> 