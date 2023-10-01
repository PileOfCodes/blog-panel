<template>
    <div class="d-flex align-center">
    <div v-for="(item, index) in items" :key="index">
            <NuxtLink :to="item.href" :class="item.disabled ? 'text-grey-darken-2' : ''">
                <button :disabled="item.disabled">
                    {{ item.title }}
                </button>
                <button v-if="!item.disabled" class="mx-2">
                    <v-icon icon="mdi-chevron-left"></v-icon>
                </button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['items'])
</script>