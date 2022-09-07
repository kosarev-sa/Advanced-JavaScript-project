import './style.css';
import {API_URL, GET_GOODS_ITEMS, GET_BASKET_GOODS} from "./constants.js"
import { service } from "./service.js"
import { CustomButton } from "./components/CustomButton.js"
import { Search } from "./components/Search.js"
import { goodsItem } from "./components/GoodsItem.js"
import { basketGoods } from "./components/BasketGoods.js"
import { basketGoodsItem } from "./components/BasketGoodsItem.js"

function init() {
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