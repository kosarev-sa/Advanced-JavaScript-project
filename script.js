const goods = [
    {
        title: 'Basket',
        price: 1500,
        img_url: 'https://static.insales-cdn.com/images/products/1/7243/525401163/_11_.jpg'
    },
    {
        title: 'Vase',
        price: 500,
        matter: 'bast',
        img_url: 'https://cdn1.ozone.ru/s3/multimedia-p/wc1200/6007760221.jpg'
    },
    {
        title: 'Pots',
        price: 350,
        img_url: 'https://cs1.livemaster.ru/storage/13/a0/d6a03049b3af96d7c6178894f9rc.jpg'
    },
    {
        title: 'Rocking chair',
        price: 10000,
        img_url: 'https://l-dacha.ru/upload/iblock/c37/c378b597409b96786afdf5b169dd50ae.png'
    },
];

class GoodsItem {
    constructor({title = 'wickerwork', price = 0, matter = 'withe', img_url}) {
        this.title = title;
        this.price = price;
        this.matter = matter;
        this.image_style = "background-image: url(\'" + img_url + "\'); background-size: 100%"
    }

    render() {
        return `
    <div class="goods-item" style="${this.image_style}">
      <h3>${this.title}</h3>
      <h4>${this.matter}</h4>
      <p>${this.price}</p>
    </div>
  `;
    }
}

class GoodsList {
    items = [];

    fetchGoods() {
        this.items = goods;
    }

    render() {
        const goods = this.items.map(item => {
            const goodItem = new GoodsItem(item);
            return goodItem.render()
        }).join('');
        debugger
        document.querySelector('.goods-list').innerHTML = goods;
    }

    calculateTotalPrice() {
        return this.items.reduce((total, amount) => {return total + amount.price;}, 0)
    }
}

const goodsList = new GoodsList();
goodsList.fetchGoods();
goodsList.render();
