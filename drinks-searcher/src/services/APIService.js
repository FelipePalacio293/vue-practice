import api from '../lib/axios'

export default {
    async fetchCategories() {
        return api.get('/list.php?c=list')
    },
    async fetchDrinks(params) {
        const { category, name } = params
        return api.get(`/filter.php?c=${category}&i=${name}`)
    },
    async fetchDrinkById(id) {
        return api.get(`/lookup.php?i=${id}`)
    }
}