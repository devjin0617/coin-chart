<template>
  <div>
    {{ text }}
    <realtime-chart title="라이트코인" :api-data="ltcData"></realtime-chart>
    <realtime-chart title="이더리움클래식" :api-data="etcData"></realtime-chart>
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
      etcData: {}
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
          console.log(res)
          vm.ltcData = JSON.stringify(res.data)

          return this.$http.get(url + 'ETC')
        })
        .then(res => res.data)
        .then(res => {
          console.log(res)
          vm.etcData = JSON.stringify(res.data)
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
