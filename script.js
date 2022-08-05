const goods = [
    {title: 'Basket', price: 1500},
    {title: 'Vase', price: 500},
    {title: 'Pots', price: 350},
    {title: 'Rocking chair', price: 10000},
];

const renderGoodsItem = (title, price, matter = 'withe') => {
    return `
    <div class="goods-item">
      <h3>${title}</h3>
      <h4>${matter}</h4>
      <p>${price}</p>
    </div>
  `;
};

const renderGoodsList = (list) => {

    let goodsList = list.map(item => {
        let {title, price} = item;
        return renderGoodsItem(title, price)
    }).join('');

    document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);
