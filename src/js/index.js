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
    }
  },
  created() {
    this.fetchAsync()
  }
})