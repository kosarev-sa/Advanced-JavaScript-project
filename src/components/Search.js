export const Search = Vue.component('search-component', {
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