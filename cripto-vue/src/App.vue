<script setup>
  import { ref, reactive, onMounted, computed } from 'vue';
  import Alert from './components/Alert.vue';
  import Spinner from './components/Spinner.vue';
  import useCrypto from './composables/useCrypto';
  import Quote from './components/Quote.vue';

  const { currencies, cryptos, getCryptoQuote, loading, quoteData } = useCrypto();

  const error = ref('');

  const queryValues = reactive({
    currency: '',
    crypto: ''
  });

  const quote = () => {
    if (Object.values(queryValues).includes('')) {
      error.value = 'Todos los campos son obligatorios';
      return;
    }

    error.value = '';
    getCryptoQuote(queryValues);
  }
  const showData = computed(() => Object.keys(quoteData.value).length !== 0);
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <Alert
        v-if="error"
      >
        {{ error }}
      </Alert>
      <form 
        class="formulario"
        @submit.prevent="quote"
      >
        <div class="campo">
          <label for="currency">Moneda:</label>
          <select 
            id="currency"
            v-model="queryValues.currency"
          >
            <option>Selecciona una moneda</option>
            <option 
              v-for="currency in currencies"
              :value="currency.codigo"
            >
              {{ currency.nombre }}
            </option>
          </select>
        </div>
        <div class="campo">
          <label for="crypto">Criptomoneda:</label>
          <select 
            id="crypto"
            v-model="queryValues.crypto"
          >
            <option>Selecciona una Criptomoneda</option>
            <option 
              v-for="crypto in cryptos"
              :value="crypto.CoinInfo.Name"
            >
              {{ crypto.CoinInfo.FullName }}
            </option>
          </select>
          <input 
            type="submit" 
            value="Cotizar" 
            class="boton"
          >
        </div>
      </form>

      <Spinner 
        v-if="loading"
      />
      
      <Quote 
        v-if="showData"
        :quoteData="quoteData"
      />
    </div>
  </div>
</template>
