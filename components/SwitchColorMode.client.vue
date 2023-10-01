<template>
    <div>
        <v-btn @click="toggleTheme" icon="mdi-theme-light-dark"></v-btn>
    </div>
</template>

<script setup>
import {useTheme} from 'vuetify'
const theme = useTheme()
function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value === 'dark' ? localStorage.setItem('isDark',1) : localStorage.removeItem('isDark')
}
</script>