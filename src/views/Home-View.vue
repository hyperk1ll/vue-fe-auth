<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-4">Home</h1>
      <p v-if="user" class="text-xl text-gray-800 mb-4">
        Halo, <span class="font-semibold">{{ user.username }}</span
        >!
      </p>
      <p v-else class="text-lg text-gray-600">
        Please <router-link to="/login" class="text-blue-500 hover:underline">login</router-link> or
        <router-link to="/register" class="text-blue-500 hover:underline">register</router-link>.
      </p>
      <button
        v-if="user"
        @click="handleLogout"
        class="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { logout } from '../service/authService'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = ref(store.getters.getUser)

    const handleLogout = async () => {
      try {
        await logout()
        store.dispatch('clearUser')
        user.value = null
        router.push('/login')
      } catch (error) {
        console.error('Logout failed:', error)
      }
    }

    return {
      user,
      handleLogout
    }
  }
})
</script>
