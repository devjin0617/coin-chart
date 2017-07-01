<template>
  <div>
    {{ text }}
    <realtime-chart :api-data="ltcData"></realtime-chart>
  </div>
</template>

<script>
import RealtimeChart from '@/components/RealtimeChart'
export default {
  name: 'chart-view',
  data () {
    return {
      text: 'Hello Page',
      ltcData: {}
    }
  },
  mounted () {
    this.request()
  },
  methods: {
    request () {
      const vm = this
      const url = '/bithumb/public/ticker/LTC'
      this.$http.get(url)
        .then(res => res.data)
        .then(res => {
          console.log(res)
          vm.ltcData = JSON.stringify(res.data)
          setTimeout(() => {
            vm.request()
          }, 1000)
        })
        .catch(() => {
          vm.apiText = 'error'
        })
    }
  },
  components: {
    'realtime-chart': RealtimeChart
  }
}
</script>
