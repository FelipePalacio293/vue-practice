<script setup>
  import { computed, reactive } from 'vue'
  import Alert from './Alert.vue'

  const alert = reactive({
    message: '',
    type: ''
  })

  const emit = defineEmits(['update:name', 'update:owner', 'update:email', 'update:discharge-date', 'update:symptoms', 'save-patient'])

  const props = defineProps({
    id: {
      type: [String, null],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    dischargeDate: {
      type: String,
      required: true
    },
    symptoms: {
      type: String,
      required: true
    }
  })

  const validateForm = () => {
    if (Object.values(props).some(value => value === '')) {
      alert.message = 'Todos los campos son obligatorios'
      alert.type = 'error'
      return
    }

    alert.message = 'Paciente registrado correctamente'
    alert.type = 'success'

    setTimeout(() => {
      Object.assign(alert, {
        message: '',
        type: ''
      })
    }, 3000)

    emit('save-patient')
  }

  const editing = computed(() => {
    return props.id
  })
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
          :value="name"
          @input="$emit('update:name', $event.target.value)"
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
          :value="owner"
          @input="$emit('update:owner', $event.target.value)"
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
          :value="email"
          @input="$emit('update:email', $event.target.value)"
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
          :value="dischargeDate"
          @input="$emit('update:discharge-date', $event.target.value)"
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
          :value="symptoms"
          @input="$emit('update:symptoms', $event.target.value)"
        />
      </div>

      <input
        type="submit"
        :value="[editing ? 'Guardar cambios' : 'Registrar paciente']"
        class="bg-indigo-600 w-full p-2 text-white uppercase font-bold rounded-md hover:bg-indigo-700 cursor-pointer transition-colors"
      />
    </form>
  </div>
</template>
