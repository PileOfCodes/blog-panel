<template>
    <div>
        <BreadCrumbs :items="items" />
        <div class="mt-12">
            <v-file-input
            class="w-25"
              label="تصویر مقاله را انتخاب کنید"
              variant="outlined"
              prepend-icon="mdi-camera"
              @change="setArticleImage"
            ></v-file-input>
            <v-combobox
            v-model="select"
            class="w-50 mt-10"
            :items="grabedCategories"
            label="دسته بندی مقاله را انتخاب کنید"
            multiple
            chips
            variant="outlined"
            ></v-combobox>
  
            <v-card class="w-50 mt-10" title="عنوان مقاله" :subtitle="draft.title" ></v-card>
            <div class="mt-10">
              <div>محتوا بدنه مقاله</div>
              <div class="d-flex mt-2">
                <v-card class="w-75 " v-html="draft.content"></v-card>
                <v-hover>
                  <template v-slot:default="{isHovering, props}">
                    <v-btn @click="createArticle" :loading="loading" v-bind="props" :class="isHovering ? 'text-teal-accent-3' : ''" class="mr-12">ثبت نهایی مقاله</v-btn>
                  </template>
                </v-hover>
              </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useToast} from 'vue-toastification'
const route = useRoute()
const toast = useToast()
const items = [
    {
      title: ' مقاله ها',
      disabled: false,
      href: '/articles',
    },
    {
      title: 'ایجاد مقاله',
      disabled: true,
      href: `/articles/create/${route.params.id}`,
    }
]
const select = ref([])
const articleImage = ref(null)
const loading = ref(false)
function setArticleImage(el) {
  articleImage.value = el.target.files[0]
}
const categories = await $fetch('/api/global', {
  query: {uri: '/allCategories'},
  headers: useRequestHeaders(['cookie'])
})
const grabedCategories = computed(() => categories.map((c) => c.englishTitle))

const draft = await $fetch('/api/global', {
  query: {uri: `/drafts/${route.params.id}`},
  headers: useRequestHeaders(['cookie'])
})

async function createArticle() {
  try {
    if(articleImage.value == null) {
      toast.error('فیلد تصویر مقاله الزامی است')
      return
    }
    loading.value = true
    const formData = new FormData()
    formData.append('image', articleImage.value)
    formData.append('categories', select.value)
    formData.append('title', draft.title)
    formData.append('content', draft.content)
    const data = await $fetch('/api/articles/create', {
      method : 'POST',
      body: formData
    })
  } finally {
    loading.value = false
  }
}

</script>