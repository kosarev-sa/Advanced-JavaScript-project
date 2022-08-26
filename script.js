//const goods = [
//    {
//        title: 'Basket',
//        price: 1500,
//        img_url: 'https://static.insales-cdn.com/images/products/1/7243/525401163/_11_.jpg'
//    },
//    {
//        title: 'Vase',
//        price: 500,
//        matter: 'bast',
//        img_url: 'https://cdn1.ozone.ru/s3/multimedia-p/wc1200/6007760221.jpg'
//    },
//    {
//        title: 'Pots',
//        price: 350,
//        img_url: 'https://cs1.livemaster.ru/storage/13/a0/d6a03049b3af96d7c6178894f9rc.jpg'
//    },
//    {
//        title: 'Rocking chair',
//        price: 10000,
//        img_url: 'https://l-dacha.ru/upload/iblock/c37/c378b597409b96786afdf5b169dd50ae.png'
//    },
//];

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${API_URL}catalogData.json`

function service(url) {
    return fetch(url)
        .then((res) => res.json())
}

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
            calculatePrice() {
                return this.items.reduce((total, { price }) => {
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


//
// //function makeGETRequest(url, callback) {
// //    var xhr;
// //    if(window.XMLHttpRequest) {
// //        xhr =new XMLHttpRequest();
// //        }
// //    else if(window.ActiveXObject) {
// //        xhr = new ActiveXObject("Microsoft.XMLHTTP");
// //        }
// //    xhr.onreadystatechange = function() {
// //    if(xhr.readyState === 4) {
// //        callback(xhr.responseText);
// //        }
// //    }
// //    xhr.open('GET', url, true);
// //    xhr.send();
// //}
//
// function makeGETRequest(url) {
//     return new Promise((resolve, reject) => {
//         var xhr;
//         if (window.XMLHttpRequest) {
//             xhr =new XMLHttpRequest();
//             }
//         else if (window.ActiveXObject) {
//             xhr = new ActiveXObject("Microsoft.XMLHTTP");
//             }
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4) {
//                 if (xhr.status === 200) {
//                     resolve(xhr.responseText);
//                 } else {
//                     reject(`'Error, xhr.status = ${xhr.status}'`);
//                 }
//             }
//         };
//         xhr.onerror = function (error) {
//             reject(err);
//         };
//         xhr.open('GET', url, true);
//         xhr.send();
//     });
//     }
//
// class GoodsItem {
//     constructor({product_name = 'wickerwork', price = 0, matter = 'withe', img_url}) {
//         this.title = product_name;
//         this.price = price;
//         this.matter = matter;
//         this.image_style = "background-image: url(\'" + img_url + "\'); background-size: 100%"
//     }
//
//     render() {
//         return `
//     <div class="goods-item" style="${this.image_style}">
//       <h3>${this.title}</h3>
//       <h4>${this.matter}</h4>
//       <p>${this.price}</p>
//     </div>
//   `;
//     }
// }
//
// class GoodsList {
//     items = [];
//
// //    fetchGoods() {
// //        this.items = goods;
// //    }
//
// //    fetchGoods(cb) {
// //        makeGETRequest(`${API_URL}/catalogData.json`).then(
// //        (goods) => {
// //            this.items = JSON.parse(goods);
// //            cb()
// //        },
// //        (error) => {
// //            console.log(error)
// //        });
// //    }
//
//         fetchGoods() {
//         return makeGETRequest(`${API_URL}/catalogData.json`).then(
//         (goods) => {
//             this.items = JSON.parse(goods);
//         },
//         (error) => {
//             console.log(error)
//         });
//     }
//
//     render() {
//         const goods = this.items.map(item => {
//             const goodItem = new GoodsItem(item);
//             return goodItem.render()
//         }).join('');
//         document.querySelector('.goods-list').innerHTML = goods;
//     }
//
//     calculateTotalPrice() {
//         return this.items.reduce((total, amount) => {return total + amount.price;}, 0)
//     }
// }
//
// const goodsList = new GoodsList();
// //goodsList.fetchGoods(() => {
// //    goodsList.render();
// //});
// goodsList.fetchGoods().then(() => {
//     goodsList.render();
// });
