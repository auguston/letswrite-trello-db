const ShopList = new Vue({
  el: '#app',
  data: {
    mrt: '公館', // 站名
    cardName: '', // 卡片名稱
    shops: {}, // 店家資料
    shop: {} // 詳細資訊是哪個店家
  },
  methods: {
    // 取得店家資料
    getShops(mrt) {
      let url;
      if(mrt === '公館') {
        this.mrt = '公館';
        url = 'https://trello.com/card/5da2c8a3f11397244be7ad22/-.json'
      }
      else if(mrt === '古亭') {
        this.mrt = '古亭';
        url = 'https://trello.com/card/5da5b564ca7ce5220c35c047/-.json'
      };

      fetch(url)
        .then(res => res.json())
        .then(results => {
          
          // 存卡片名稱
          this.cardName = results.name;

          // 整理店家資料
          this.shops = {};
          Array.prototype.forEach.call(results.checklists, (list, i) => {
            this.shops[list.id] = Object.create(null, {
              id: { value: list.id },
              name: { value: list.name },
              site: { value: list.checkItems[0].name },
              tel: { value: list.checkItems[1].name }
            });
          });

        })
    }
  },
  created() {
    this.getShops('公館');
  },
})