// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const API_URL = 'http://localhost:8000';
const GET_GOODS_ITEMS = `${API_URL}/goods.json`;
const GET_BASKET_GOODS = `${API_URL}/basket_goods`;

function service(url, method = "GET", body) {
    return fetch(url, {
        headers: Object.assign({}, body ? {
            'Content-Type': 'application/json; charset=utf-8'
        } : {}),
        method,
        body: JSON.stringify(body)
    })
        .then((res) => res.json())
}

function init() {

    const CustomButton = Vue.component('custom-button', {
        template: `
            <button class="cart-button" type="button" v-on:click="$emit('click')">
                <slot></slot>
            </button>
        `
    })

    Vue.component('search-component', {
        model: {
            prop: 'value',
            event: 'input'
        },
        props: {
            value: String
        },
        template: `
          <input type="text" class="goods-search" :value="value" @input="$emit('input', $event.target.value)"/>
        `
    })

    const goodsItem = Vue.component('goods-item', {
        props: [
            'item'
        ],
        template: `
          <div class="goods-item">
          <h3>{{ item.product_name }}</h3>
          <p>{{ item.price }}</p>
          <custom-button @click="addGood">добавить</custom-button>
          </div>
        `,
        methods: {
            addGood() {
                service(GET_BASKET_GOODS, 'PUT', {
                    id: this.item.id
                })
            }
        }
    })

    const basketGoods = Vue.component('basket-goods', {
        data() {
            return {
                basketGoodsItems: []
            }
        },

        template: `
          <div class="fixed-area">
          <div class="basket-card">
            <div class="basket-card__header">
              <h1 class="basket-card__header__title">Basket card</h1>
              <div class="basket-card__header__delete-icon" v-on:click="$emit('closeclick')"></div>
            </div>
            <div class="basket-card__content">
              <basket-goods-item
                  v-for="item in basketGoodsItems" :item="item" @add="addGood" @delete="deleteBasketGood" >
              </basket-goods-item>
            </div>
          </div>
          </div>
        `,
        mounted() {
            service(GET_BASKET_GOODS).then((data) => {
                this.basketGoodsItems = data
            })
        },
        methods: {
            addGood(id) {
                service(GET_BASKET_GOODS, 'PUT', {
                    id
                }).then((data) => {
                    this.basketGoodsItems = data
                })
            },
            deleteBasketGood(id) {
                service(GET_BASKET_GOODS, 'DELETE', {
                    id
                }).then((data) => {
                    this.basketGoodsItems = data
                })
            }
        }
    })

    Vue.component('basket-goods-item', {
        props: [
            'item'
        ],
        template: `
          <div class="basket-card__content___item">
          <h3>{{ item?.data?.product_name }}</h3>
          <div>count: {{ item?.count }}</div>
          <div>total: {{ item?.total }}</div>
          <custom-button @click="$emit('add', item.data.id)">добавить | +1 |</custom-button>
          <custom-button @click="$emit('delete', item.data.id)">удалить | -1 |</custom-button>
          </div>
        `
    })

    const app = new Vue({
        el: '#app',
        data: {
            items: [],
            searchLine: '',
            isVisibleCart: false
        },
        methods: {
            setCartDisplay() {
                this.isVisibleCart = !this.isVisibleCart
            },
            fetchGoods() {
                service(GET_GOODS_ITEMS).then((data) => {
                    this.items = data;
                });
            },
            // onSearchComponentChange(value) {
            //     this.searchLine = value
            // }
        },
        computed: {
            filteredItems() {
                return this.items.filter(({product_name}) => {
                    return product_name.match(new RegExp(this.searchLine, 'ugi'))
                })
            },
            calculatePrice() {
                return this.items.reduce((total, {price}) => {
                    return total + price;
                }, 0)
            }
        },
        mounted() {
            this.fetchGoods();
        }
    })
}

window.onload = init
