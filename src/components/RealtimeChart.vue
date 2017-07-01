<template>
  <div class="echarts">
    <IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.vue'

export default {
  props: ['api-data'],
  data () {
    return {
      loading: true,
      now: '',
      oneDay: 24 * 3600 * 1000,
      value: '',
      bar: {
        title: {
          text: '动态数据 + 时间坐标轴'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0]
            var date = new Date(params.name)
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1]
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
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: []
        }]
      }
    }
  },
  mounted () {

  },
  methods: {
    onReady () {
      this.now = +new Date(1997, 9, 3)
      this.oneDay = 24 * 3600 * 1000
      this.value = Math.random() * 1000
      for (let i = 0; i < 2; i++) {
        this.bar.series[0].data.push(this.randomData())
      }
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
  height:300px;
}

</style>
