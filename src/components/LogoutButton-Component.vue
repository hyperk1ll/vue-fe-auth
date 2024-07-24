<template>
  <button @click="handleLogout" class="bg-red-500 text-white p-2 rounded">Logout</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { logout } from '../service/authService'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()

    const handleLogout = async () => {
      try {
        await logout()
        store.dispatch('clearUser')
        router.push('/login')
      } catch (error) {
        console.error('Logout failed:', error)
      }
    }

    return {
      handleLogout
    }
  }
})
</script>
