<template>
    <div class="">
        <BreadCrumbs :items="items" />
        <div class="d-flex justify-end mt-4">
            <NuxtLink to="/drafts/create">
                <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                        <v-btn 
                        v-bind="props"
                        :class="isHovering ? 'text-teal-accent-3' : ''"
                        :ripple="false" 
                        density="compact"
                        size="large" 
                        variant="flat">ایجاد پیش نویس</v-btn >
                    </template>
                </v-hover>
            </NuxtLink>
        </div>
        <div class="mt-12">
            <v-table density="compact">
                <thead>
                    <tr>
                        <th class="text-right">
                        id
                        </th>
                        <th class="text-right">
                        عنوان
                        </th>
                        <th class="text-right">
                        محتوا
                        </th>
                        <th class="text-right">
                        لینک
                        </th>
                        <th class="text-right">
                        عملیات
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                    v-for="draft in data.drafts" :key="draft.id"
                    >
                        <td>{{ draft.id }}</td>
                        <td>{{ draft.title }}</td>
                        <td>
                        <div class="wrapIt"> 
                            {{ draft.content }}
                        </div>
                        </td>
                        <td>{{ draft.link }}</td>
                        <td>
                            <NuxtLink :to="`/drafts/edit/${draft.id}`">
                                <v-icon icon="mdi-pencil"></v-icon>
                            </NuxtLink>
                            <NuxtLink :to="`/articles/create/${draft.id}`">
                                <v-hover>
                                    <template v-slot:default="{isHovering, props}">
                                        <v-btn v-bind="props" :class="isHovering ? 'text-teal-accent-3' : ''" class="ma-2"> ایجاد پست</v-btn>
                                    </template>
                                </v-hover>
                            </NuxtLink>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <div v-if="data.meta.last_page > 1" class="d-flex justify-center mt-12" style="direction: ltr;">
                <div v-for="link in data.meta.links.slice(1,-1)" :key="link.label">
                    <v-btn class="mr-2" :class="{'bg-teal-accent-3' : link.active}" @click="paginate(link.label)"> {{ link.label }}</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const items = [
    {
      title: 'پیش نویس ها',
      disabled: true,
      href: '/drafts',
    }
]
const page = ref(0)

const {data, refresh} = await useFetch('/api/global', {
    query: {uri: '/drafts', page},
    headers: useRequestHeaders(['cookie'])
})

function paginate(number) {
    page.value = number
    refresh()
}

definePageMeta({
    middleware: 'auth'
})
</script>

<style>
.wrapIt {
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 140px;
}
</style>