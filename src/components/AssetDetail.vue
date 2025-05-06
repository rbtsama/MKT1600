<template>
  <div>
    <!-- 标题栏 - 显示资产信息和返回按钮 -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">{{ getTitle() }}</h2>
      <button 
        @click="goBack"
        class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors flex items-center"
        aria-label="返回上一页"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回
      </button>
    </div>

    <!-- 资产基础信息卡片 -->
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
                aria-label="选择账号等级"
              >
                <option value="bronze" class="text-gray-900">🥉 铜牌</option>
                <option value="silver" class="text-gray-900">🥈 银牌</option>
                <option value="gold" class="text-gray-900">🥇 金牌</option>
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
            <span class="text-sm font-medium text-gray-500 mb-1">整备状态</span>
            <span class="text-sm text-gray-800 font-medium">{{ asset.prepStatus }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">车辆状态</span>
            <span :class="getStatusClass(asset.status)">{{ getStatusText(asset.status) }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">车辆名称</span>
            <span class="text-sm text-gray-800 font-medium">{{ asset.brand }} <span class="text-xs text-gray-500">{{ asset.detail }}</span></span>
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
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-1">IP状态</span>
            <span :class="getStatusClass(asset.status)">{{ getStatusText(asset.status) }}</span>
          </div>
        </template>
        
        <!-- 所有资产类型的公共统计信息 -->
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-500 mb-1">使用次数</span>
          <span class="text-sm font-medium text-gray-800">{{ asset.usageCount }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-500 mb-1">最近使用</span>
          <span class="text-sm font-medium text-gray-800">{{ asset.lastUsed === 0 ? '0天前' : `${asset.lastUsed}天前` }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-500 mb-1">最近停用</span>
          <span class="text-sm font-medium text-gray-800">{{ asset.lastInactive === 0 ? '0天前' : `${asset.lastInactive}天前` }}</span>
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

    <!-- 资产历史记录卡片 -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden mb-8">
      <div class="asset-history p-4">
        <h3 class="text-lg font-bold mb-4">资产信用历史</h3>
        
        <!-- 资产历史记录表格 -->
        <history-table 
          :data="assetHistories" 
          :asset-filter="getAssetFilter()"
        />
      </div>
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
 * @returns {string} 根据资产类型生成的标题
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
 * @param {string} status - 状态值
 * @returns {string} 对应的CSS类名
 */
function getStatusClass(status: string): string {
  const statusClasses = {
    // 原始状态值映射
    'available': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800',
    'in_use': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
    'disabled': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800',
    'sold': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500',
    // 新增状态值映射
    'active': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
    'inactive': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800',
    'warning': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800',
    'penalty': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'
  };
  return statusClasses[status] || 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
}

/**
 * 获取状态显示文本
 * @param {string} status - 状态值
 * @returns {string} 对应的显示文本
 */
function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    // 原始状态值映射
    'available': '可用',
    'in_use': '使用中',
    'disabled': '禁用',
    'sold': '已售',
    // 新增状态值映射
    'active': '使用中',
    'inactive': '未使用',
    'warning': '警告',
    'penalty': '处罚中'
  };
  return statusMap[status] || status;
}

/**
 * 获取整备状态显示文本
 * @param {string} status - 状态值
 * @returns {string} 对应的显示文本
 */
function getPrepStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    // 原始状态值映射
    'Ready_For_Sale': '可售',
    'Retail_Photo': '拍照中',
    'Inspection': '检验中',
    'SOLD': '已售出',
    // 新增状态值映射
    'ready': '已整备',
    'pending': '待整备',
    'repairing': '整备中',
    'na': '不适用'
  };
  return statusMap[status] || status;
}

/**
 * 获取资产过滤器
 * @returns {Object|null} 用于HistoryTable的资产过滤器对象
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

/**
 * 判断当前资产是否有处罚
 * @returns {boolean} 是否有处罚记录
 */
function hasPenalty(): boolean {
  const assetId = getAssetValue();
  if (!assetId) return false;
  
  // 使用字符串哈希简单算法
  const hash = assetId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  // 约40%的资产会有处罚记录
  return hash % 10 < 4;
}

/**
 * 获取当前资产的值
 * @returns {string} 当前资产的唯一标识
 */
function getAssetValue(): string {
  if (props.assetType === 'account') {
    return props.asset.username;
  } else if (props.assetType === 'virtualNumber') {
    return props.asset.number;
  } else if (props.assetType === 'vehicle') {
    return props.asset.vin;
  } else if (props.assetType === 'ip') {
    return props.asset.address;
  }
  return '';
}
</script>

<style scoped>
/* 样式已移除，页面结构直接使用父组件的布局 */
</style> 