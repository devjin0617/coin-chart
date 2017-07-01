<template>
  <div>
    <div>
      <realtime-chart title="라이트코인" :api-data="ltcData"></realtime-chart>
      <realtime-chart title="이더리움" :api-data="ethData"></realtime-chart>
      <realtime-chart title="비트코인" :api-data="btcData"></realtime-chart>
      <realtime-chart title="리플" :api-data="xrpData"></realtime-chart>
      <realtime-chart title="이더리움클래식" :api-data="etcData"></realtime-chart>
      <realtime-chart title="대시" :api-data="etcData"></realtime-chart>
    </div>
  </div>
</template>

<script>
import RealtimeChart from '@/components/RealtimeChart'
export default {
  name: 'chart-view',
  data () {
    return {
      text: 'Coin Chart',
      ltcData: {},
      ethData: {},
      btcData: {},
      xrpData: {},
      etcData: {},
      dashData: {}
    }
  },
  mounted () {
    this.request()
  },
  methods: {
    request () {
      const vm = this
      const url = '/bithumb/public/ticker/'
      this.$http.get(url + 'LTC')
        .then(res => res.data)
        .then(res => {
          vm.ltcData = JSON.stringify(res.data)

          return this.$http.get(url + 'ETC')
        })
        .then(res => res.data)
        .then(res => {
          console.log(res)
          vm.etcData = JSON.stringify(res.data)

          return this.$http.get(url + 'ETH')
        })
        .then(res => res.data)
        .then(res => {
          console.log(res)
          vm.ethData = JSON.stringify(res.data)

          return this.$http.get(url + 'BTC')
        })
        .then(res => res.data)
        .then(res => {
          console.log(res)
          vm.btcData = JSON.stringify(res.data)

          return this.$http.get(url + 'DASH')
        })
        .then(res => res.data)
        .then(res => {
          console.log(res)
          vm.dashData = JSON.stringify(res.data)

          return this.$http.get(url + 'XRP')
        })
        .then(res => res.data)
        .then(res => {
          console.log(res)
          vm.xrpData = JSON.stringify(res.data)
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
