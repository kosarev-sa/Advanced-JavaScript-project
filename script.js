const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${API_URL}catalogData.json`

function service(url) {
    return fetch(url)
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
          </div>
        `
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
              basket info
            </div>
          </div>
          </div>
        `,
        mounted() {

        }
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
