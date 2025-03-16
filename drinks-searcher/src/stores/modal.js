import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const showModal = ref(false)

  function handleClickModal() {
    showModal.value = !showModal.value
  }

  return {
    showModal,
    handleClickModal,
  }
})