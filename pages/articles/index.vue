<template>
    <div class="">
        <BreadCrumbs :items="items" />
        <div class="d-flex justify-end mt-4">
            <NuxtLink to="/articles/create">
                <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                        <v-btn class="text-h6" 
                        v-bind="props"
                        :class="isHovering ? 'text-teal-accent-3' : ''"
                        :ripple="false" 
                        density="compact"
                        size="large" 
                        variant="flat">ایجاد مقاله</v-btn>
                    </template>
                </v-hover>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const items = [
    {
      title: 'مقالات',
      disabled: true,
      href: '/articles',
    },
]
</script>