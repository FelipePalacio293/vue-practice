<script setup>
  import { computed } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';
  import { useDrinkStore } from '../stores/drinks';

  const route = useRoute();
  const drinksStore = useDrinkStore();

  const homePage = computed(() => route.name === 'home');

  const handleSubmit = () => {
    drinksStore.fetchDrinks();
  };
</script>

<template>
  <header
    class="bg-slate-800"
    :class="{header : homePage}"
  >
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink 
            :to="{ name: 'home' }" 
          >
            <img class="w-32" src="/img/logo.svg" alt="Logo" />
          </RouterLink>
        </div>

        <nav class="flex gap-4">
          <RouterLink
            :to="{ name: 'home' }"
            class="text-white font-bold uppercase"
            active-class="text-orange-500"
          >
            Inicio
          </RouterLink>

          <RouterLink
            :to="{ name: 'favorites' }"
            class="text-white font-bold uppercase"
            active-class="text-orange-500"
          >
            Favoritos
          </RouterLink>
        </nav>
      </div>

      <form 
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        @submit.prevent="handleSubmit"
        v-if="homePage"
      >
        <div class="space-y-4">
          <label for="ingredient" class="block text-white uppercase font-extrabold text-lg">
            Nombre o ingredientes
          </label>
          <input 
            id="ingredient"
            type="text"
            class="p-3 w-full rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Eg. Vodka, Whisky, etc."
            v-model="drinksStore.searchParams.name"
          />
        </div>
        <div class="space-y-4">
          <label for="category" class="block text-white uppercase font-extrabold text-lg">
            Categoria
          </label>
          <select 
            id="category"
            class="p-3 w-full rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            v-model="drinksStore.searchParams.category"
          >
            <option>Seleccione</option>
            <option 
              v-for="category in drinksStore.categories" 
              :key="category.strCategory"
              :value="category.strCategory"
            > 
              {{ category.strCategory }}
            </option>
          </select>
        </div>
        <input
          type="submit"
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold p-2 rounded-lg w-full uppercase"
          value="Buscar recetas"
        />
      </form>
    </div>
  </header>
</template>

<style>
  .header {
    background-image: url('/img/bg.jpg');
    background-size: cover;
    background-position: center;
  }
</style>