<template>
  <div class="history-table">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <div class="flex gap-4">
        <div class="flex items-center">
          <button 
            @click="togglePenaltiesFilter"
            :class="[
              'px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center',
              showPenaltiesOnly 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {{ showPenaltiesOnly ? '显示全部' : '只看处罚' }}
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-x-auto">
      <table class="w-full table-auto">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-center text-base font-bold text-gray-700 uppercase tracking-wider">
              记录时间
            </th>
            <th class="px-4 py-3 text-center text-base font-bold text-gray-700 uppercase tracking-wider">
              主题
            </th>
            <th class="px-4 py-3 text-center text-base font-bold text-gray-700 uppercase tracking-wider">
              发帖快照
            </th>
            <th class="px-4 py-3 text-center text-base font-bold text-gray-700 uppercase tracking-wider">
              动作
            </th>
            <th class="px-4 py-3 text-center text-base font-bold text-gray-700 uppercase tracking-wider">
              处罚原因
            </th>
            <th class="px-4 py-3 text-center text-base font-bold text-gray-700 uppercase tracking-wider">
              账号
            </th>
            <th class="px-4 py-3 text-center text-base font-bold text-gray-700 uppercase tracking-wider">
              虚拟号
            </th>
            <th class="px-4 py-3 text-center text-base font-bold text-gray-700 uppercase tracking-wider">
              车辆
            </th>
            <th class="px-4 py-3 text-center text-base font-bold text-gray-700 uppercase tracking-wider">
              IP
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="(item, idx) in paginatedData" 
            :key="idx"
          >
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 text-center">
              {{ formatTo24HourTime(item.time) }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-800 text-center">
              <a :href="item.link" target="_blank" class="text-gray-700 hover:text-indigo-600 hover:underline transition-colors">
                {{ item.title }}
              </a>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 text-center">
              <button 
                @click="viewSnapshot(item)"
                class="text-gray-600 hover:text-indigo-600 hover:underline text-xs font-medium transition-colors"
              >
                查看快照
              </button>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 text-center">
              <div class="flex items-center justify-center">
                <span :class="getActionTagClass(item.action)">
                  {{ getActionText(item.action) }}
                </span>
                <button 
                  v-if="hasEditPermission"
                  @click="editAction(item)"
                  class="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 text-center">
              <div class="flex items-center justify-center">
                <div class="flex flex-wrap gap-1 justify-center">
                  <span 
                    v-for="reason in item.reasons" 
                    :key="reason"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                  >
                    {{ getReasonText(reason) }}
                  </span>
                  <span v-if="!item.reasons || item.reasons.length === 0" class="text-gray-400 text-xs">未设置</span>
                </div>
                <button 
                  v-if="hasEditPermission"
                  @click="editReasons(item)"
                  class="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 text-center">
              <a 
                href="javascript:void(0)" 
                @click="navigateToAssetDetail('account', item.account)"
                class="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {{ item.account }}
              </a>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 text-center">
              <a 
                href="javascript:void(0)" 
                @click="navigateToAssetDetail('virtualNumber', item.virtualNumber)"
                class="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {{ item.virtualNumber }}
              </a>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 text-center">
              <div class="flex flex-col items-center">
                <a 
                  href="javascript:void(0)" 
                  @click="navigateToAssetDetail('vehicle', item.vehicle)"
                  class="text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <div class="flex flex-col items-center">
                    <span v-if="getVehicleInfo(item.vehicle)?.brand" class="font-medium">{{ getVehicleInfo(item.vehicle)?.brand }}</span>
                    <span v-if="getVehicleInfo(item.vehicle)?.detail" class="text-sm text-gray-500 whitespace-normal text-center">{{ getVehicleInfo(item.vehicle)?.detail }}</span>
                    <span v-if="!getVehicleInfo(item.vehicle)">{{ item.vehicle }}</span>
                  </div>
                </a>
              </div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 text-center">
              <a 
                href="javascript:void(0)" 
                @click="navigateToAssetDetail('ip', item.ip)"
                class="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {{ item.ip }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页器 -->
    <div class="flex justify-between items-center mt-4">
      <div class="text-sm text-gray-700">
        显示 {{ startItem }} - {{ endItem }} 项，共 {{ filteredData.length }} 项
      </div>
      <div class="flex">
        <nav class="inline-flex rounded-md shadow-sm -space-x-px" aria-label="分页">
          <button 
            @click="prevPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="sr-only">上一页</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <!-- 页码 -->
          <template v-for="page in getPageNumbers()" :key="page">
            <button 
              v-if="page !== '...'" 
              @click="goToPage(page)"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                currentPage === page
                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
            <span 
              v-else 
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
            >
              ...
            </span>
          </template>
          
          <button 
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="sr-only">下一页</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    </div>

    <!-- 快照弹窗 -->
    <div v-if="showSnapshot && currentSnapshot" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">{{ currentSnapshot?.title || '' }}</h3>
          <button @click="closeSnapshot" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="snapshot-content border-t pt-4">
          <div class="mb-4">
            <p class="text-sm text-gray-700">发布时间: {{ formatTo24HourTime(currentSnapshot?.time) }}</p>
            <p class="text-sm text-gray-700">发布账号: {{ currentSnapshot?.account || '' }}</p>
            <p class="text-sm text-gray-700">联系电话: {{ currentSnapshot?.virtualNumber || '' }}</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-md">
            <h4 class="font-bold mb-2">帖子内容:</h4>
            <p>{{ generateFakeContent(currentSnapshot) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 动作编辑弹窗 -->
    <div v-if="showActionModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">修改动作</h3>
          <button @click="closeActionModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <button 
            v-for="action in actionOptions" 
            :key="action"
            @click="updateAction(action)"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-full focus:outline-none transition-colors text-center',
              currentEditingItem && currentEditingItem.action === action
                ? getActionButtonClass(action)
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            {{ getActionText(action) }}
          </button>
        </div>
        <div class="flex justify-end mt-6">
          <button 
            @click="saveAction"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            确定
          </button>
        </div>
      </div>
    </div>

    <!-- 处罚原因编辑弹窗 -->
    <div v-if="showReasonsModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">修改处罚原因</h3>
          <button @click="closeReasonsModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="space-y-3">
          <div 
            v-for="reason in reasonOptions" 
            :key="reason"
            class="flex items-center"
          >
            <input 
              type="checkbox" 
              :id="reason" 
              :value="reason" 
              v-model="selectedReasons"
              class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label 
              :for="reason" 
              class="ml-2 block text-sm text-gray-900 cursor-pointer"
            >
              {{ getReasonText(reason) }}
            </label>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button 
            @click="saveReasons"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { vehicleAssets } from '../data/mockData';

/**
 * 定义组件的属性
 */
interface Props {
  /** 表格标题 */
  title?: string;
  /** 历史数据数组 */
  data: Array<any>;
  /** 资产过滤器对象 */
  assetFilter?: {
    type: string;
    value: string;
  } | null;
}

const props = withDefaults(defineProps<Props>(), {
  title: '资产信用历史',
  assetFilter: null
});

// 常量定义
const actionOptions = ['posting', 'pending', 'manual_deletion', 'deletion_penalty', 'ban_penalty'];
const reasonOptions = ['friendly', 'ip', 'title'];
const itemsPerPage = 20;

// 响应式状态
const searchQuery = ref('');
const showPenaltiesOnly = ref(false);
const currentPage = ref(1);
const showSnapshot = ref(false);
const currentSnapshot = ref<any>(null);
const showActionModal = ref(false);
const showReasonsModal = ref(false);
const currentEditingItem = ref<any>(null);
const selectedReasons = ref<string[]>([]);
const tempAction = ref<string | null>(null);

// 路由
const router = useRouter();

/**
 * 是否具有编辑权限
 */
const hasEditPermission = computed(() => {
  return true; // 默认都有编辑权限，可根据权限系统修改
});

/**
 * 是否具有删除权限
 */
const hasDeletePermission = computed(() => {
  return true; // 默认都有删除权限，可根据权限系统修改
});

/**
 * 应用过滤条件后的数据
 */
const filteredData = computed(() => {
  // 应用资产过滤
  let filtered = props.data || [];
  
  if (props.assetFilter) {
    const { type, value } = props.assetFilter;
    if (type === 'account') {
      filtered = filtered.filter(item => item.account === value);
    } else if (type === 'virtualNumber') {
      filtered = filtered.filter(item => item.virtualNumber === value);
    } else if (type === 'vehicle') {
      filtered = filtered.filter(item => item.vehicle === value);
    } else if (type === 'ip') {
      filtered = filtered.filter(item => item.ip === value);
    }
  }
  
  // 应用处罚过滤
  if (showPenaltiesOnly.value) {
    filtered = filtered.filter(item => 
      item.action === 'deletion_penalty' || item.action === 'ban_penalty'
    );
  }
  
  // 应用搜索过滤
  if (searchQuery.value) {
    const searchLower = searchQuery.value.toLowerCase();
    filtered = filtered.filter(item => {
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.account.toLowerCase().includes(searchLower) ||
        item.virtualNumber.toLowerCase().includes(searchLower) ||
        item.vehicle.toLowerCase().includes(searchLower) ||
        item.ip.toLowerCase().includes(searchLower)
      );
    });
  }
  
  return filtered;
});

/**
 * 分页后的数据
 */
const paginatedData = computed(() => {
  if (!filteredData.value || !Array.isArray(filteredData.value)) {
    return [];
  }
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredData.value.slice(start, end);
});

/**
 * 总页数
 */
const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage) || 1;
});

/**
 * 当前页起始项
 */
const startItem = computed(() => {
  return (currentPage.value - 1) * itemsPerPage + 1;
});

/**
 * 当前页结束项
 */
const endItem = computed(() => {
  return Math.min(currentPage.value * itemsPerPage, filteredData.value.length);
});

// 监听过滤条件变化，重置页码
watch(showPenaltiesOnly, () => {
  currentPage.value = 1;
});

watch(searchQuery, () => {
  currentPage.value = 1;
});

watch(() => props.assetFilter, () => {
  currentPage.value = 1;
}, { deep: true });

/**
 * 切换处罚过滤
 */
function togglePenaltiesFilter() {
  showPenaltiesOnly.value = !showPenaltiesOnly.value;
}

/**
 * 获取动作标签的CSS类
 * @param action 动作类型
 */
function getActionTagClass(action: string): string {
  if (action === 'posting') return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
  if (action === 'pending') return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800';
  if (action === 'manual_deletion') return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800';
  if (action === 'deletion_penalty') return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800';
  if (action === 'ban_penalty') return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white';
  return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
}

/**
 * 获取动作按钮的CSS类
 * @param action 动作类型
 */
function getActionButtonClass(action: string): string {
  if (action === 'posting') return 'bg-green-100 text-green-800';
  if (action === 'pending') return 'bg-orange-100 text-orange-800';
  if (action === 'manual_deletion') return 'bg-blue-100 text-blue-800';
  if (action === 'deletion_penalty') return 'bg-red-100 text-red-800';
  if (action === 'ban_penalty') return 'bg-red-500 text-white';
  return 'bg-gray-100 text-gray-800';
}

/**
 * 获取动作显示文本
 * @param action 动作类型
 */
function getActionText(action: string): string {
  const actionMap: Record<string, string> = {
    'posting': '发帖',
    'pending': '待确认',
    'manual_deletion': '手动删帖',
    'deletion_penalty': '删帖处罚',
    'ban_penalty': '封号处罚'
  };
  return actionMap[action] || action;
}

/**
 * 获取处罚原因显示文本
 * @param reason 处罚原因
 */
function getReasonText(reason: string): string {
  const reasonMap: Record<string, string> = {
    'friendly': '友军',
    'ip': 'IP',
    'title': '标题'
  };
  return reasonMap[reason] || reason;
}

/**
 * 编辑动作
 * @param item 要编辑的项
 */
function editAction(item: any) {
  currentEditingItem.value = item;
  tempAction.value = item.action;
  showActionModal.value = true;
}

/**
 * 关闭动作编辑弹窗
 */
function closeActionModal() {
  showActionModal.value = false;
  currentEditingItem.value = null;
  tempAction.value = null;
}

/**
 * 编辑处罚原因
 * @param item 要编辑的项
 */
function editReasons(item: any) {
  currentEditingItem.value = item;
  if (!item.reasons) {
    item.reasons = [];
  }
  selectedReasons.value = [...item.reasons];
  showReasonsModal.value = true;
}

/**
 * 关闭处罚原因编辑弹窗
 */
function closeReasonsModal() {
  showReasonsModal.value = false;
  currentEditingItem.value = null;
  selectedReasons.value = [];
}

/**
 * 更新动作
 * @param action 新的动作
 */
function updateAction(action: string) {
  if (currentEditingItem.value) {
    tempAction.value = action;
  }
}

/**
 * 保存动作
 */
function saveAction() {
  if (currentEditingItem.value && tempAction.value) {
    currentEditingItem.value.action = tempAction.value;
  }
  closeActionModal();
}

/**
 * 保存处罚原因
 */
function saveReasons() {
  if (currentEditingItem.value) {
    currentEditingItem.value.reasons = [...selectedReasons.value];
  }
  closeReasonsModal();
}

/**
 * 查看帖子快照
 * @param item 要查看的项
 */
function viewSnapshot(item: any) {
  if (!item) return;
  
  currentSnapshot.value = item;
  showSnapshot.value = true;
}

/**
 * 关闭快照弹窗
 */
function closeSnapshot() {
  showSnapshot.value = false;
  currentSnapshot.value = null;
}

/**
 * 将AM/PM时间格式转为24小时制
 * @param timeString 时间字符串
 */
function formatTo24HourTime(timeString: string): string {
  if (!timeString) return '';
  
  try {
    // 示例格式: "2025-04-30 09:15 AM"
    const [datePart, timePart, ampm] = timeString.split(' ');
    
    if (!datePart || !timePart || !ampm) {
      return timeString;
    }
    
    const [hours, minutes] = timePart.split(':');
    
    if (!hours || !minutes) {
      return timeString;
    }
    
    let hour24 = parseInt(hours);
    
    // 转换为24小时制
    if (ampm === 'PM' && hour24 < 12) {
      hour24 += 12;
    } else if (ampm === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    
    // 格式化为2位数的小时
    const formattedHour = hour24.toString().padStart(2, '0');
    
    return `${datePart} ${formattedHour}:${minutes}`;
  } catch (error) {
    console.error('Time format error:', error);
    return timeString;
  }
}

/**
 * 生成虚拟的帖子内容（用于快照展示）
 * @param item 帖子数据项
 */
function generateFakeContent(item: any): string {
  if (!item || !item.title) return '';
  
  const titleParts = item.title.split(' ');
  if (titleParts.length < 2) return item.title;
  
  let carType = titleParts[0] + ' ' + titleParts[1];
  
  return `${carType} 车况优质\n\n低里程：仅行驶了45,000公里\n车况：外观内饰保养完好，定期保养\n配置：自动挡、导航、倒车影像、真皮座椅、全景天窗\n\n价格：$19,800\n联系电话：${item.virtualNumber || '未提供'}\n地点：洛杉矶\n\n有意向请尽快联系，谢谢！`;
}

/**
 * 获取车辆详细信息
 * @param vin 车辆VIN码
 */
function getVehicleInfo(vin: string) {
  if (!vin) return null;
  return vehicleAssets.find(vehicle => vehicle.vin === vin) || null;
}

/**
 * 跳转到资产详情页
 * @param type 资产类型
 * @param value 资产值
 */
function navigateToAssetDetail(type: string, value: string) {
  if (!value) return;
  
  let path = '';
  switch (type) {
    case 'account':
      path = `/accounts/detail/${value}`;
      break;
    case 'virtualNumber':
      path = `/virtual-numbers/detail/${value}`;
      break;
    case 'vehicle':
      path = `/vehicles/detail/${value}`;
      break;
    case 'ip':
      path = `/ips/detail/${value}`;
      break;
    default:
      return;
  }
  
  router.push(path);
}

/**
 * 前往上一页
 */
function prevPage() {
  currentPage.value = Math.max(1, currentPage.value - 1);
}

/**
 * 前往下一页
 */
function nextPage() {
  currentPage.value = Math.min(totalPages.value, currentPage.value + 1);
}

/**
 * 跳转到指定页
 * @param page 页码
 */
function goToPage(page: number) {
  currentPage.value = page;
}

/**
 * 获取页码显示数组
 */
function getPageNumbers() {
  const numbersToShow = [];
  const ellipsis = '...';
  
  if (totalPages.value <= 7) {
    // 少于7页，显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      numbersToShow.push(i);
    }
  } else {
    // 总是显示第一页
    numbersToShow.push(1);
    
    // 当前页接近开始
    if (currentPage.value <= 3) {
      numbersToShow.push(2, 3, 4, ellipsis);
    } 
    // 当前页接近结束
    else if (currentPage.value >= totalPages.value - 2) {
      numbersToShow.push(
        ellipsis, 
        totalPages.value - 3, 
        totalPages.value - 2, 
        totalPages.value - 1
      );
    } 
    // 当前页在中间
    else {
      numbersToShow.push(
        ellipsis,
        currentPage.value - 1,
        currentPage.value,
        currentPage.value + 1,
        ellipsis
      );
    }
    
    // 总是显示最后一页
    numbersToShow.push(totalPages.value);
  }
  
  return numbersToShow;
}
</script>

<style scoped>
.history-table {
  padding: 1rem;
  width: 100%;
}

/* 下拉菜单样式 */
.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style> 