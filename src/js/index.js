import '../scss/index.scss'
import '@babel/polyfill';

// API 來源
// https://opendata.epa.gov.tw/Data/Contents/AQI/
// 跨域設定 https://cors-anywhere.herokuapp.com/ + api

const app = new Vue({
  el: '#app',
  data: {
    data: [],
    location: [],
    stared: [],
    filter: '',
    staredLocalStor: JSON.parse(localStorage.getItem('staredData')) || []
  },
  methods: {
    async fetchAsync() {
      const vm = this
      const api = 'https://cors-anywhere.herokuapp.com/http://opendata2.epa.gov.tw/AQI.json'
      let res = await fetch(api)
      let data = await res.json()
      vm.data = data

      // 取出所有城市
      let allCity = []
      vm.data.forEach(item => allCity.push(item.County))

      // console.log(allCity);

      // 參考 https://guahsu.io/2017/06/JavaScript-Duplicates-Array/
      // 取出不重複的城市
      vm.location = allCity.filter((e, i, a) => a.indexOf(e) === i )

      // console.log(vm.location);
      
      vm.staredLocalStor.forEach(stared => {
        vm.data.forEach(data => {
          if(stared === data.SiteName) vm.stared.push(data)
        })
      })

    },
    setStared(item) {
      const vm = this
      if(vm.stared.indexOf(item) === -1) vm.stared.push(item)
      else vm.stared.splice(vm.stared.indexOf(item), 1)

      vm.staredLocalStor = vm.stared.map(item => item.SiteName)

      localStorage.setItem('staredData', JSON.stringify(vm.staredLocalStor))
    }
  },
  computed: {
    filterArray() {
      const vm = this
      if (vm.filter === '') return vm.data
      else return vm.data.filter(e => e.County === vm.filter)
    }
  },
  created() {
    this.fetchAsync()
  }
})

Vue.component('card-component', {
  template: '#cardComponentTemplate',
  props: ['cardData', 'stared'],
  computed: {
    cardColor() {
      switch(this.cardData.Status) {
        case '普通':
          return 'status-aqi2'
          break

        case '對敏感族群不健康':
          return 'status-aqi3'
          break
        
        case '對所有族群不健康':
          return 'status-aqi4'
          break

        case '非常不健康':
          return 'status-aqi5'
          break

        case '危害':
          return 'status-aqi6'
          break

        default:
          return ''
      }
    },
    starColor() {
      if(this.stared.indexOf(this.cardData) === -1) return 'far'
      else return 'fas'
    }
  },
  methods: {
    clickStar() {
      this.$emit('change-star', this.cardData)
    }
  }
})