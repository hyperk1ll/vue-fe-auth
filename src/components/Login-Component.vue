<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="flex flex-col">
          <label for="username" class="text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Username"
            class="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="password" class="text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Password"
            class="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
      <p class="mt-4 text-sm text-center text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const username = ref('')
    const password = ref('')

    const handleLogin = async () => {
      try {
        // Directly handle the login request
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
          username: username.value,
          password: password.value
        })

        const { token, name } = response.data
        localStorage.setItem('authToken', token)
        localStorage.setItem('username', name)
        store.dispatch('setUser', { username: name })
        router.push('/')
      } catch (error) {
        console.error('Login failed:', error)
        alert('Login failed. Please check your credentials and try again.')
      }
    }

    return {
      username,
      password,
      handleLogin
    }
  }
})
</script>
