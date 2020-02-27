import '../scss/index.scss'
import '@babel/polyfill';
import "@fortawesome/fontawesome-free";
import "@fortawesome/fontawesome-free-solid";
import "@fortawesome/fontawesome-free-regular";

// API 來源
// https://opendata.epa.gov.tw/Data/Contents/AQI/

const app = new Vue({
  el: '#app',
  data: {
    data: [],
    location: [],
    stared: [],
    filter: ''
  },
  methods: {
    async fetchAsync() {
      const vm = this
      const api = 'http://opendata2.epa.gov.tw/AQI.json'
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

    }
  },
  created() {
    this.fetchAsync()
  }
})

Vue.component('card-component', {
  template: '#cardComponentTemplate'
})