<template>
  <div>
    {{ text }}
    <realtime-chart></realtime-chart>
  </div>
</template>

<script>
import RealtimeChart from '@/components/RealtimeChart'
export default {
  name: 'chart-view',
  data () {
    return {
      text: 'Hello Page'
    }
  },
  components: {
    'realtime-chart': RealtimeChart
  }
}
</script>
