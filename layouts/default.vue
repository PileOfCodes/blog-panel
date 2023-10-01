<template>
    <v-locale-provider rtl>
        <v-layout class="rounded rounded-md">
            <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          :prepend-avatar="authUser.image || '/thumbs.png'"
          :title="authUser.name"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-right"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-note-text-outline" title="articles" value="articles"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    
            <v-locale-provider>
                <v-app-bar>
                  <template v-slot:prepend>
                      <v-btn @click="logout">خروج</v-btn>
                      <SwitchColorMode />
                    </template>
                  </v-app-bar>
            </v-locale-provider>
    
            <v-main class="mt-16 mx-12">
            <slot></slot>
            </v-main>
        </v-layout>
    </v-locale-provider>
</template>

<script setup>
import { useToast } from 'vue-toastification';

const {authUser} = useAuth()
const toast = useToast()
const drawer = ref(true)
const rail = ref(true)

async function logout() {
  await $fetch('/api/auth/logout', {
  method: 'POST'
  })
  authUser.value = null
  toast.success('از سیستم خارج شدید')
  return navigateTo('/auth/login')
}
</script>