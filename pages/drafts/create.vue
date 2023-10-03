<template>
    <div>
        <BreadCrumbs :items="items" />
        <div class="mt-4">
            <DraftEditor v-model="content" />
        </div>
    </div>
</template>

<script setup>
const content = ref('this is a test')
const items = [
    {
      title: 'پیش نویس ها',
      disabled: false,
      href: '/drafts',
    },
    {
      title: 'ایجاد پیش نویس',
      disabled: true,
      href: '/drafts/create',
    }
]
</script>