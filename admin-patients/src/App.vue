<script setup>
  import { ref, reactive, watch, onMounted } from 'vue'
  import { uid } from 'uid'
  import Header from './components/Header.vue'
  import Form from './components/Form.vue'
  import Patient from './components/Patient.vue'

  const patient = reactive({
    id: null,
    name: '',
    owner: '',
    email: '',
    dischargeDate: '',
    symptoms: ''
  })

  const patients = ref([])

  onMounted(() => {
    const patientsLocalStorage = JSON.parse(localStorage.getItem('patients'))
    if (patientsLocalStorage) {
      patients.value = patientsLocalStorage
    }
  })

  watch(
    patients,
    () => {
      localStorage.setItem('patients', JSON.stringify(patients.value))
    },
    { deep: true }
  )

  const savePatient = () => {
    if (patient.id) {
      const { id } = patient
      const index = patients.value.findIndex(patientState => patientState.id === id)
      patients.value[index] = { ...patient }
    } else {
      patients.value.push({
        ...patient,
        id: uid()
      })
    }

    Object.assign(patient, {
      name: '',
      owner: '',
      email: '',
      dischargeDate: '',
      symptoms: '',
      id: null
    })
  }

  const updatePatient = (id) => {
    const patientToUpdate = patients.value.find(patient => patient.id === id)
    Object.assign(patient, patientToUpdate)
  }

  const deletePatient = (id) => {
    patients.value = patients.value.filter(patient => patient.id !== id)
  }
</script>

<template>
  <div class="container mx-auto mt-20">
    <Header />

    <div class="mt-12 md:flex">
      <Form 
        v-model:name="patient.name"
        v-model:owner="patient.owner"
        v-model:email="patient.email"
        v-model:discharge-date="patient.dischargeDate"
        v-model:symptoms="patient.symptoms"
        @save-patient="savePatient"
        :id="patient.id"
      />

      <div class="md:w-1/2 md:h-screen overflow-y-scroll">
        <h3 class="font-black text-3xl text-center">Administra tus pacientes</h3>

        <div v-if="patients.length > 0">
          <p class="text-lg mt-5 text-center mb-10">
            Detalles de
            <span class="text-indigo-600 font-bold">pacientes</span>
          </p>
          <Patient 
            v-for="patient in patients"
            :patient="patient"
            @update-patient="updatePatient"
            @delete-patient="deletePatient"
          />
        </div>

        <div v-else>
          <p class="text-2xl text-center mt-10">No hay pacientes registrados</p>
        </div>
      </div>
    </div>
  </div>
</template>
