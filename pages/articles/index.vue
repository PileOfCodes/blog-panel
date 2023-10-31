<template>
    <div class="">
        <BreadCrumbs :items="items" />
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