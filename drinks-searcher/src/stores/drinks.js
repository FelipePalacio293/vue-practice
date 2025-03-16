import { ref, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import APIService from '@/services/APIService';
import { useModalStore } from './modal';

export const useDrinkStore = defineStore('drinks', () => {
  const modalStore = useModalStore()
  const categories = ref([]);
  const recipes = ref([]);
  const recipe = ref([]);

  const searchParams = reactive({
    name: '',
    category: '',
  })

  onMounted(async () => {
    const { data: { drinks } } = await APIService.fetchCategories();
    categories.value = drinks;
  })

  async function fetchDrinks() {
    const { data: { drinks } } = await APIService.fetchDrinks(searchParams);
    recipes.value = drinks;
  }

  async function fetchRecipeById(id) {
    const { data: { drinks }} = await APIService.fetchDrinkById(id);
    modalStore.handleClickModal()
    recipe.value = drinks[0];
  }

  return {
    categories,
    searchParams,
    fetchDrinks,
    recipes,
    fetchRecipeById,
    recipe,
  }
})
