<template>
    <div class="register-wrapper">
      <!-- Back Button -->
      <button class="back-btn" @click="goBack">←</button>
  
      <h1 class="title">General Info</h1>
  
      <label class="label">Username</label>
<ul class="guidelines">
  <li>4 Characters Minimum (24 Max)</li>
  <li>Username cannot contain spaces</li>
</ul>

<input v-model="username" type="text" class="input-field" />

<!-- Reactive validation messages -->
<p v-if="username && !validUsernameLength" class="error-text">
  Username must be 4–24 characters.
</p>

<p v-if="username && !validUsernameNoSpaces" class="error-text">
  Username cannot contain spaces.
</p>

<!-- First Name -->
<label class="label">First Name</label>
    <input
      v-model="firstName"
      type="text"
      class="input-field"
    />

    <!-- Last Name -->
    <label class="label">Last Name</label>
    <input
      v-model="lastName"
      type="text"
      class="input-field"
    />

<button
  class="next-btn"
  :disabled="!isValidUsername"
  @click="nextStep"
>
  Next
</button>
      
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  const email = route.query.email || ''

  //Form fields
  const username = ref("")
  const firstName = ref("")
  const lastName = ref("")

  //Validation
  const validUsernameLength = computed(() =>
  username.value.length >= 4 && username.value.length <= 24
)

  const validUsernameNoSpaces = computed(() =>
  !/\s/.test(username.value ?? "")    // extra safety
)

const isValidUsername = computed(() =>
  validUsernameLength.value && validUsernameNoSpaces.value
)

//Navigation

const nextStep = () => {
  if (!isValidUsername.value) return

  router.push({
    name: 'Register3',
    query: {
      email,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  })
}

const goBack = () => router.push({ name: 'Register1' })
  </script>
  
  <style scoped>
  @import '../styles/register.css';
  </style>