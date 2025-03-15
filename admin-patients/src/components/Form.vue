<script setup>
  import { ref, reactive } from 'vue'
  import Alert from './Alert.vue'

  const patient = reactive({
    name: '',
    owner: '',
    email: '',
    dischargeDate: '',
    symptoms: ''
  })

  const alert = reactive({
    message: '',
    type: ''
  })

  const validateForm = () => {
    if (Object.values(patient).some(value => value === '')) {
      alert.message = 'Todos los campos son obligatorios'
      alert.type = 'error'
      return
    }

    alert.message = 'Paciente registrado correctamente'
    alert.type = 'success'
  }
</script>

<template>
  <div class="md:w-1/2">
    <h2 class="font-black text-3xl text-center">Seguimiento pacientes</h2>
    <p class="text-lg mt-5 text-center mb-10">
      Agrega pacientes y
      <span class="text-indigo-600 font-bold">Administralos</span>
    </p>

    <Alert 
      v-if="alert.message"
      :alert="alert" 
    />

    <form 
      class="bg-white shadow-md rounded py-10 px-5 mb-10"
      @submit.prevent="validateForm"
    >
      <div class="mb-5">
        <label 
          for="pet-name" 
          class="block text-gray-700 uppercase font-bold"
        >
          Nombre mascota
        </label>
        <input
          id="pet-name"
          type="text"
          placeholder="Nombre mascota"
          class="w-full mt-2 p-2 border-2 placeholder-gray-400 rounded-md"
          v-model="patient.name"
        />
      </div>

      <div class="mb-5">
        <label 
          for="owner-name" 
          class="block text-gray-700 uppercase font-bold"
        >
          Nombre dueño
        </label>
        <input
          id="owner-name"
          type="text"
          placeholder="Nombre dueño"
          class="w-full mt-2 p-2 border-2 placeholder-gray-400 rounded-md"
          v-model="patient.owner"
        />
      </div>

      <div class="mb-5">
        <label 
          for="email" 
          class="block text-gray-700 uppercase font-bold"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email dueño"
          class="w-full mt-2 p-2 border-2 placeholder-gray-400 rounded-md"
          v-model="patient.email"
        />
      </div>

      <div class="mb-5">
        <label 
          for="discharge-date" 
          class="block text-gray-700 uppercase font-bold"
        >
          Fecha de alta
        </label>
        <input
          id="discharge-date"
          type="date"
          placeholder="Fecha de alta"
          class="w-full mt-2 p-2 border-2 placeholder-gray-400 rounded-md"
          v-model="patient.dischargeDate"
        />
      </div>

      <div class="mb-5">
        <label 
          for="symptoms" 
          class="block text-gray-700 uppercase font-bold"
        >
          Sintomas
        </label>
        <textarea
          id="symptoms"
          placeholder="Describa los sintomas"
          class="w-full mt-2 p-2 border-2 placeholder-gray-400 h-40 rounded-md"
          v-model="patient.symptoms"
        />
      </div>

      <input
        type="submit"
        value="Registrar paciente"
        class="bg-indigo-600 w-full p-2 text-white uppercase font-bold rounded-md hover:bg-indigo-700 cursor-pointer transition-colors"
      />
    </form>
  </div>
</template>
