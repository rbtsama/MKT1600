import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '../components/AppLayout.vue';
import AccountAssets from '../views/AccountAssets.vue';
import VirtualNumberAssets from '../views/VirtualNumberAssets.vue';
import VehicleAssets from '../views/VehicleAssets.vue';
import IPAssets from '../views/IPAssets.vue';
import AssetHistory from '../views/AssetHistory.vue';

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        redirect: '/accounts'
      },
      {
        path: '/accounts',
        name: 'Accounts',
        component: AccountAssets
      },
      {
        path: '/virtual-numbers',
        name: 'VirtualNumbers',
        component: VirtualNumberAssets
      },
      {
        path: '/vehicles',
        name: 'Vehicles',
        component: VehicleAssets
      },
      {
        path: '/ips',
        name: 'IPs',
        component: IPAssets
      },
      {
        path: '/history',
        name: 'History',
        component: AssetHistory
      },
      {
        path: '/history/:type/:value',
        name: 'FilteredHistory',
        component: AssetHistory
      },
      {
        path: '/accounts/detail/:username',
        name: 'AccountDetail',
        component: () => import('../views/AccountDetail.vue')
      },
      {
        path: '/virtual-numbers/detail/:number',
        name: 'VirtualNumberDetail',
        component: () => import('../views/VirtualNumberDetail.vue')
      },
      {
        path: '/vehicles/detail/:vin',
        name: 'VehicleDetail',
        component: () => import('../views/VehicleDetail.vue')
      },
      {
        path: '/ips/detail/:address',
        name: 'IPDetail',
        component: () => import('../views/IPDetail.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 