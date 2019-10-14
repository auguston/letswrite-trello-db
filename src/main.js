const ShopList = new Vue({
  el: '#app',
  data: {
    cardName: '', // 卡片名稱
    shops: {}, // 店家資料
    shop: {} // 詳細資訊是哪個店家
  },
  created() {

    // 取得店家資料
    function getShops(url) {
      return new Promise((resolve, reject) => {

        fetch(url)
          .then(res => res.json())
          .then(results => {
            
            // 存卡片名稱
            const cardName = results.name;

            // 整理店家資料
            let shops = {};
            Array.prototype.forEach.call(results.checklists, (list, i) => {
              shops[list.id] = Object.create(null, {
                id: { value: list.id },
                name: { value: list.name },
                site: { value: list.checkItems[0].name },
                tel: { value: list.checkItems[1].name }
              });
            });

            resolve([cardName, shops]);

          })
          .catch(err => reject(err));

      });
    }

    getShops('https://trello.com/card/5da2c8a3f11397244be7ad22/-.json')
      .then(result => {
        this.cardName = result[0];
        this.shops = result[1];
        console.log(this.shops)
      });

    

  },
})