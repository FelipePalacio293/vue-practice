<script setup>
  defineProps({
    quoteData: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <div class="contenedor-resultado">
    <h2>Cotizacion</h2>
    <div class="resultado">
      <img :src="'https://cryptocompare.com/' + quoteData.IMAGEURL" alt="Imagen cripto">
      <div>
        <p>El precio es de: <span>{{ quoteData.PRICE }}</span></p>
        <p>Precio mas alto del dia: <span>{{ quoteData.HIGHDAY }}</span></p>
        <p>Precio mas bajo del dia: <span>{{ quoteData.LOWDAY }}</span></p>
        <p>Variacion ultimas 24 horas: <span>{{ quoteData.CHANGEPCT24HOUR }}%</span></p>
        <p>Ultima actualizacion: <span>{{ quoteData.LASTUPDATE }}</span></p>
      </div>
    </div>
  </div>
</template>
