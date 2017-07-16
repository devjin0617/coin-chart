<template>
  <div>
    <div v-for="item in list">
      {{item.rank}} | {{item.name}}({{item.symbol}})<br>
      {{price(item.market_cap_krw)}} | {{item.price_krw}}원
    </div>
  </div>
</template>

<script>
export default {
  name: 'market-cap',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    const vm = this
    this.$http.get('https://api.coinmarketcap.com/v1/ticker/?convert=KRW&limit=10')
      .then(res => {
        vm.list = res.data
      })
  },
  methods: {
    price (krw) {
      let strPrice = krw + '원'
      if (krw >= 1000000000000) {
        // 조
        strPrice = (krw / 1000000000000).toFixed(2) + '조원'
      } else if (krw >= 100000000) {
        // 억
        strPrice = (krw / 100000000).toFixed(2) + '억원'
      } else if (krw >= 10000) {
        // 만
        strPrice = (krw / 10000).toFixed(2) + '만원'
      }
      return strPrice
    }
  }
}
</script>

<style>

</style>
