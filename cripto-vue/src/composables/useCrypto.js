import { ref, onMounted } from 'vue';

export default function useCrypto() {
  const currencies = ref([
    { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
    { codigo: 'MXN', nombre: 'Peso Mexicano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra Esterlina' },
    { codigo: 'COP', nombre: 'Peso Colombiano' }
  ]);

  const cryptos = ref([]);
  const loading = ref(false);
  const quoteData = ref({});

  onMounted(() => {
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
    fetch(url)
      .then(response => response.json())
      .then(({Data}) => cryptos.value = Data)
  })

  const getCryptoQuote = async (quote) => {
    const { currency, crypto } = quote;

    loading.value = true;
    quoteData.value = {};

    try {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`;

      const response = await fetch(url);
      const result = await response.json();

      quoteData.value = result.DISPLAY[crypto][currency];
    } catch(error) {
      console.log('Ocurrio un error');
    } finally {
      loading.value = false;
    }

    return quoteData.value;
  }

  return {
    currencies,
    quoteData,
    loading,
    cryptos,
    getCryptoQuote
  }
}