<template>
    <v-sheet class="h-screen pa-12" rounded>
        <div class="mx-auto w-50 text-center" v-for="(error, index) in errors" :key="index">
            <div class="text-red">{{ error }}</div>
        </div>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="ایمیل"
          ></v-text-field>
  
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="پسورد"
            placeholder="پسورد را وارد کنید"
          ></v-text-field>
  
          <br>
  
          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            ورود
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
</template>

<script setup>
import {useToast} from 'vue-toastification'
const toast = useToast()
const form = ref(false)
const email = ref(null)
const password = ref(null)
const loading = ref(false)
const errors = ref([])
const {authUser} = useAuth()
async function onSubmit() {
    if(!form.value) return
    try {
        errors.value = []
        loading.value = true
        const data = await $fetch('/api/auth/login', {
            method: 'POST',
            body: {email: email.value, password: password.value}
        })
        if(data.status == 200) {
            authUser.value = data.data
            toast.success('کاربر با موفقیت وارد شد')
            return navigateTo('/')
        }else {
            errors.value = Object.values(data.message).flat()
        }
    }finally {
        loading.value = false
    }
}

function required (v) {
    return !!v || 'فیلد الزامی است'
}

definePageMeta({
    layout: false,
    middleware: 'guest'
})
</script>