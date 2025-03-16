<script setup>
  import { useDrinkStore } from '../stores/drinks';

  const drinksStore = useDrinkStore();

  defineProps({
    recipe: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <div class="rounded-lg shadow-lg">
    <div class="overflow-hidden">
      <img
        :src="recipe.strDrinkThumb"
        :alt="recipe.strDrink"
        class="hover:scale-125 transition-transform hover:rotate-2"
      >
    </div>
    
    <div class="p-5">
      <h2 class="text-2xl truncate font-extrabold">{{ recipe.strDrink }}</h2>
      <button
        type="button"
        class="bg-orange-400 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer"
        @click="drinksStore.fetchRecipeById(recipe.idDrink)"
      >
        Ver receta
      </button>
    </div>
  </div>
</template>
