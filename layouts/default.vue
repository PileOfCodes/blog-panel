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
          <NuxtLink to="/" :class="{'text-teal-accent-3' : $route.path == '/'}">
            <v-list-item prepend-icon="mdi-view-dashboard" title="داشبورد" ></v-list-item>
          </NuxtLink>
          <NuxtLink to="/drafts" :class="{'text-teal-accent-3' : $route.path.includes('/drafts')}">
            <v-list-item prepend-icon="mdi-file-edit-outline" title="پیش نویس ها" ></v-list-item>
          </NuxtLink>
          <NuxtLink to="/articles" :class="{'text-teal-accent-3' : $route.path.includes('/articles')}">
            <v-list-item prepend-icon="mdi-note-text-outline" title="مقالات" ></v-list-item>
          </NuxtLink>
          <NuxtLink to="/users" :class="{'text-teal-accent-3' : $route.path.includes('/users')}">
            <v-list-item prepend-icon="mdi-account" title="کاربران"></v-list-item>
          </NuxtLink>
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