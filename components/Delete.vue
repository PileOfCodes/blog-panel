<template>
    <v-hover>
        <template v-slot:default="{isHovering, props}">
            <v-btn v-bind="props" 
            :ripple="false"
            :loading="loading"
            :class="isHovering ? 'text-teal-accent-3' : ''" 
            @click="deleteDraft(draftId)" prepend-icon="mdi-delete">حذف پیش نویس</v-btn>
        </template>
    </v-hover>
</template>

<script setup>
import {useToast} from 'vue-toastification'
const props = defineProps(['draftId'])
const toast = useToast()
const loading = ref(false)
async function deleteDraft(id) {
    try {
        loading.value = true
        await $fetch(`/api/global`, {
            method: 'DELETE',
            query: {uri: `/drafts/${id}`},
            headers: useRequestHeaders(['cookie'])
        })
        toast.success('پیش نویس با موفقیت حذف شد')
        return navigateTo('/drafts')
    } finally {
        loading.value = false
    }
}
</script>