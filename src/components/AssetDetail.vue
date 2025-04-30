<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">{{ getTitle() }}</h2>
      <button 
        @click="goBack"
        class="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
      >
        返回
      </button>
    </div>

    <!-- 资产基础信息标题 -->
    <h3 class="text-lg font-bold mb-3">基本信息</h3>
    <div class="bg-white shadow-md rounded-lg overflow-hidden p-6 mb-8">
      <!-- 基本信息内容，使用flex布局自适应一行展示 -->
      <div class="flex flex-wrap gap-6">
        <!-- 账户资产特有信息 -->
        <template v-if="assetType === 'account'">
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">用户名</span>
            <span class="text-sm text-gray-800 font-medium">{{ asset.username }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">密码</span>
            <span class="text-sm text-gray-800 font-medium">{{ asset.password }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">账号状态</span>
            <span :class="getStatusClass(asset.status)">{{ getStatusText(asset.status) }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">账号等级</span>
            <div class="flex items-center justify-center">
              <select 
                v-model="editableLevel" 
                class="text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md text-center"
                style="width: 90px;"
              >
                <option value="bronze" class="text-gray-900">🥉 青铜</option>
                <option value="silver" class="text-gray-900">🥈 白银</option>
                <option value="gold" class="text-gray-900">🥇 黄金</option>
              </select>
            </div>
          </div>
        </template>
        
        <!-- 虚拟号资产特有信息 -->
        <template v-else-if="assetType === 'virtualNumber'">
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">虚拟号</span>
            <span class="text-sm text-gray-800 font-medium">{{ asset.number }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">状态</span>
            <span :class="getStatusClass(asset.status)">{{ getStatusText(asset.status) }}</span>
          </div>
        </template>
        
        <!-- 车辆资产特有信息 -->
        <template v-else-if="assetType === 'vehicle'">
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">VIN码</span>
            <span class="text-sm text-gray-800 font-medium">{{ asset.vin }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">车辆名称</span>
            <span class="text-sm text-gray-800 font-medium">{{ asset.brand }} <span class="text-xs text-gray-500">{{ asset.detail }}</span></span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">车辆状态</span>
            <span class="text-sm text-gray-800 font-medium">{{ asset.status }}</span>
          </div>
        </template>
        
        <!-- IP资产特有信息 -->
        <template v-else-if="assetType === 'ip'">
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">IP地址</span>
            <span class="text-sm text-gray-800 font-medium">{{ asset.address }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">IP所在地</span>
            <span class="text-sm text-gray-800">{{ asset.location }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">IP供应商</span>
            <span class="text-sm text-gray-800">{{ asset.provider }}</span>
          </div>
        </template>
        
        <!-- 公共统计信息 -->
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-500 mb-1">使用次数</span>
          <span class="text-sm font-medium text-gray-800">{{ asset.usageCount }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-500 mb-1">最近使用</span>
          <span class="text-sm font-medium text-gray-800">{{ asset.lastUsed === 0 ? '今天' : `${asset.lastUsed}天前` }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-500 mb-1">最近处罚</span>
          <span class="text-sm font-medium text-gray-800">{{ asset.lastPenalty === null ? '无处罚' : `${asset.lastPenalty}天前` }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-500 mb-1">删帖处罚</span>
          <span class="text-sm font-medium text-gray-800">{{ asset.deletionCount }}次</span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-500 mb-1">封号处罚</span>
          <span class="text-sm font-medium text-gray-800">{{ asset.banCount }}次</span>
        </div>
      </div>
    </div>

    <!-- 包装HistoryTable组件，添加与基本信息表格相同的容器样式 -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden mb-8">
      <history-table 
        :data="assetHistories" 
        :asset-filter="getAssetFilter()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HistoryTable from './HistoryTable.vue';
import { assetHistories } from '../data/mockData';

/**
 * 定义组件的属性
 */
interface Props {
  /** 资产类型 */
  assetType: 'account' | 'virtualNumber' | 'vehicle' | 'ip';
  /** 资产数据 */
  asset: Record<string, any>;
}

const props = defineProps<Props>();

/**
 * 事件
 */
const emit = defineEmits<{
  /** 返回上一页事件 */
  (event: 'back'): void;
}>();

/** 账号等级编辑值 */
const editableLevel = ref(props.assetType === 'account' ? props.asset.level : null);

/**
 * 返回上一页
 */
function goBack() {
  emit('back');
}

/**
 * 获取页面标题
 * @returns 根据资产类型生成的标题
 */
function getTitle(): string {
  if (props.assetType === 'account') {
    return `账户详情: ${props.asset.username}`;
  } else if (props.assetType === 'virtualNumber') {
    return `虚拟号详情: ${props.asset.number}`;
  } else if (props.assetType === 'vehicle') {
    return `车辆详情: ${props.asset.brand}`;
  } else if (props.assetType === 'ip') {
    return `IP详情: ${props.asset.address}`;
  }
  return '资产详情';
}

/**
 * 获取状态CSS类
 * @param status 状态值
 * @returns 对应的CSS类名
 */
function getStatusClass(status: string): string {
  if (status === 'normal') return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
  if (status === 'banned' || status === 'deleted') return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800';
  return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
}

/**
 * 获取状态显示文本
 * @param status 状态值
 * @returns 对应的显示文本
 */
function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    'normal': '正常',
    'banned': '封号',
    'deleted': '删除',
    'Ready_For_Sale': '可售',
    'Fixed': '已修复',
    'SOLD': '已售出'
  };
  return statusMap[status] || status;
}

/**
 * 获取资产过滤器
 * @returns 用于HistoryTable的资产过滤器对象
 */
function getAssetFilter() {
  if (props.assetType === 'account') {
    return { type: 'account', value: props.asset.username };
  } else if (props.assetType === 'virtualNumber') {
    return { type: 'virtualNumber', value: props.asset.number };
  } else if (props.assetType === 'vehicle') {
    return { type: 'vehicle', value: props.asset.vin };
  } else if (props.assetType === 'ip') {
    return { type: 'ip', value: props.asset.address };
  }
  return null;
}
</script>

<style scoped>
/* 样式已移除，页面结构直接使用父组件的布局 */
</style> 