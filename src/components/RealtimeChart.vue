<template>
  <div class="echarts">
    <IEcharts :option="line" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.vue'

export default {
  props: ['api-data', 'title'],
  watch: {
    apiData (newValue) {
      // console.log(newValue)

      var value = JSON.parse(newValue)

      const vm = this
      this.now = new Date(parseInt(value.date))
      this.value = value.sell_price

      if (this.line.series[0].data.length > 10) {
        this.line.series[0].data.shift()
        this.line.series[1].data.shift()
      }

      this.line.series[0].data.push({
        name: vm.now.toString(),
        value: [
          // [vm.now.getFullYear(), vm.now.getMonth() + 1, vm.now.getDate()].join('/'),
          vm.now.getTime(),
          vm.value
        ]
      })

      if (this.line.yAxis.max < vm.value) {
        this.line.yAxis.max = parseInt(vm.value) + 1000
      }

      if (this.line.yAxis.min === 0 || this.line.yAxis.min > value.buy_price) {
        this.line.yAxis.min = parseInt(value.buy_price) - 1000
      }

      this.line.series[1].data.push({
        name: vm.now.toString(),
        value: [
          // [vm.now.getFullYear(), vm.now.getMonth() + 1, vm.now.getDate()].join('/'),
          vm.now.getTime(),
          value.buy_price
        ]
      })
    }
  },
  data () {
    return {
      loading: true,
      now: '',
      oneDay: 24 * 3600 * 1000,
      value: '',
      line: {
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var date = new Date(params[0].name)
            // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1]
            return date.getTime() + ':' + params[0].value[1] + ',' + params[1].value[1]
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 0
        },
        series: [
          {
            name: 'sell',
            type: 'line',
            showSymbol: true,
            hoverAnimation: false,
            data: []
          },
          {
            name: 'buy',
            type: 'line',
            showSymbol: true,
            hoverAnimation: false,
            data: [],
            lineStyle: {
              normal: {
                color: '#34495E'
              }
            }
          }
        ]
      }
    }
  },
  mounted () {

  },
  methods: {
    onReady () {
      // this.now = +new Date(1997, 9, 3)
      // this.oneDay = 24 * 3600 * 1000
      // this.value = Math.random() * 1000
      // for (let i = 0; i < 2; i++) {
      //   this.line.series[0].data.push(this.randomData())
      // }
      this.loading = false
    },
    onClick () {
      alert('click!')
    },
    randomData () {
      const vm = this
      this.now = new Date(+this.now + this.oneDay)
      this.value = this.value + Math.random() * 21 - 10
      return {
        name: vm.now.toString(),
        value: [
          [vm.now.getFullYear(), vm.now.getMonth() + 1, vm.now.getDate()].join('/'),
          Math.round(vm.value)
        ]
      }
    }
  },
  components: {
    IEcharts
  }
}
</script>

<style scoped>

.echarts {
  margin:auto;
  width:700px;
  height:250px;
  display:inline-block;
}

</style>
