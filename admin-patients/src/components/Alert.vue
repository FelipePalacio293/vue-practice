<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    alert: {
      type: Object,
      required: true
    }
  })

  const isError = computed(() => props.alert.type === 'error')
</script>

<template>
  <div
    :class="[isError ? 'bg-red-500' : 'bg-green-500']"
    class="text-white text-center uppercase p-3 font-bold mb-3 rounded-md"
  >
    {{ alert.message }}
  </div>
</template>
