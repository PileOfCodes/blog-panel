<template>
    <div>
        <BreadCrumbs :items="items" />
        <div class="mt-4">
            <UpdateEditor v-model="draft.content" :title="draft.title" />
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const {data: draft} = await useFetch('/api/global', {
    query: {uri: `/drafts/${route.params.id}`},
    headers: useRequestHeaders(['cookie'])
})
const items = [
    {
      title: 'پیش نویس ها',
      disabled: false,
      href: '/drafts',
    },
    {
      title: 'ویرایش پیش نویس',
      disabled: true,
      href: `/drafts/edit/${route.params.id}`,
    }
]
</script>