<template>
  <div>
    <history-table 
      title="资产信用历史" 
      :data="assetHistories"
    />
  </div>
</template>

<script>
import HistoryTable from '../components/HistoryTable.vue';
import { assetHistories } from '../data/mockData';

export default {
  name: 'AssetHistory',
  components: {
    HistoryTable
  },
  data() {
    return {
      assetHistories
    }
  }
}
</script> 