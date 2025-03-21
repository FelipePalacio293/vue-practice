<script setup>
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

  import { useModalStore } from '../stores/modal'
  import { useDrinkStore } from '../stores/drinks'

  const modalStore = useModalStore()
  const drinkStore = useDrinkStore()

  const formatIngredients = () => {
    const ingredientsDiv = document.createElement('div')
    for (let i = 1; i <= 15; i++) {
      const ingredient = drinkStore.recipe[`strIngredient${i}`];
      const measure = drinkStore.recipe[`strMeasure${i}`];

      if (ingredient) {
        const ingredientParagraph = document.createElement('p');

        ingredientParagraph.textContent = `${ingredient} - ${measure}`;
        ingredientParagraph.classList.add('text-lg', 'text-gray-500');

        ingredientsDiv.appendChild(ingredientParagraph);
      }
    }

    return ingredientsDiv;
  }
</script>

<template>
  <TransitionRoot as="template" :show="modalStore.showModal">
    <Dialog as="div" class="relative z-10" @close="modalStore.handleClickModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
              <div>
                <div class="mt-3">
                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    {{ drinkStore.recipe.strDrink }}
                  </DialogTitle>

                  <img
                    :src="drinkStore.recipe.strDrinkThumb"
                    :alt="'Imagen de ' + drinkStore.recipe.strDrink"
                    class="mx-auto w-96"
                  >

                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    Ingredientes y cantidades
                  </DialogTitle> 
                  
                  <div
                    v-html="formatIngredients().outerHTML"
                  >
                  </div>

                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    Instrucciones
                  </DialogTitle>

                  <p class="text-lg text-gray-500">
                    {{ drinkStore.recipe.strInstructions }}
                  </p>

                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button
                  type="button"
                  class="w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500"
                  @click="modalStore.handleClickModal"
                >
                  Cerrar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>