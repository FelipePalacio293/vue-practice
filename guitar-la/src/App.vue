<script setup>
  import { ref, onMounted } from 'vue'
  import { db } from './data/guitars'
  import Guitar from './components/Guitar.vue'
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'

  const guitars = ref([])
  const cart = ref([])

  onMounted(() => {
    guitars.value = db
  })

  const addToCart = (guitar) => {
    const itemExists = cart.value.findIndex(item => item.id === guitar.id)
    if (itemExists !== -1) {
      cart.value[itemExists].quantity++
      return
    }
    guitar.quantity = 1
    cart.value.push(guitar)
  }

  const decreaseQuantity = (id) => {
    const itemExists = cart.value.findIndex(item => item.id === id)
    if (itemExists !== -1) {
      cart.value[itemExists].quantity--
      if (cart.value[itemExists].quantity === 0) {
        cart.value.splice(itemExists, 1)
      }
    }
  }

  const increaseQuantity = (id) => {
    const itemExists = cart.value.findIndex(item => id === guitar.id)
    if (itemExists !== -1) {
      cart.value[itemExists].quantity++
    }
  }
</script>

<template>
  <Header 
    :cart="cart"
    @increase-quantity="increaseQuantity"
    @decrease-quantity="decreaseQuantity"
  />

  <main class="container-xl mt-5">
    <h2 class="text-center">Nuestra Colección</h2>
    
    <div class="row mt-5">
      <Guitar 
        v-for="guitar in guitars"
        :guitar="guitar"
        @add-cart="addToCart"
      />
    </div>
  </main>

  <Footer />
</template>
