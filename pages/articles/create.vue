<template>
    <div class="w-100">
        <BreadCrumbs :items="items" />
        <div class="mt-4">
            <ArticleEditor v-model="content" />
        </div>
    </div>
</template>

<script setup>
const content = ref('this is a test')
const items = [
    {
      title: 'مقالات',
      disabled: false,
      href: '/articles',
    },
    {
      title: 'ایجاد مقاله',
      disabled: true,
      href: '/articles/create',
    }
]
</script>