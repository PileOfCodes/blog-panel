<template>
    <div>
      <v-text-field placeholder="عنوان پیش نویس" class="w-75" label="عنوان" v-model="preTitle"></v-text-field>
        <div v-if="editor" class="menu">
            <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            h1
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            h2
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
            h3
            </button>
            <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
            paragraph
            </button>
            <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            bold
            </button>
            <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
            italic
            </button>
            <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
            strike
            </button>
            <button @click="editor.chain().focus().toggleHighlight().run()" :class="{ 'is-active': editor.isActive('highlight') }">
            highlight
            </button>
            <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
            Bullet List
            </button>
            <button @click="comeUpImage">
            SetImage
            </button>
            <input type="file" ref="articleImage" @change="addImage" hidden>
            <EditorContent :editor="editor" class="mt-4 px-2 pb-10" style="width: 1200px;" />
        </div>
    </div>
  </template>
  
  <script setup>
  import {debounce} from 'lodash'
  import { useEditor, EditorContent } from '@tiptap/vue-3'
  import Image from '@tiptap/extension-image'
  import Highlight from '@tiptap/extension-highlight'
  import StarterKit from '@tiptap/starter-kit'
  
  const route = useRoute()
  const articleImage = ref(null)
  const preTitle = ref(null)
  const articlePic = ref(null)
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    title: {
      type: String
    }
  })
  const emit = defineEmits(['update:modelValue'])
  
  function comeUpImage() {
      articleImage.value.click()
  }
  
  const editor = useEditor({
      content: props.modelValue,
      onUpdate: () => {
        emit('update:modelValue', editor.value.getHTML())
      },
      extensions: [
          StarterKit,
          Highlight,
          Image.configure({
            allowBase64: true
          }),
        ]
  })
  
  watchEffect(() => props.modelValue, (newValue, oldValue) => {
      const isSame = newValue === oldValue;
      if (isSame) {
          return;
      }
      editor.value?.commands.setContent(newValue, false)
  });
  
  function addImage(el) {
    const reader = new FileReader()
    reader.readAsDataURL(el.target.files[0])
    reader.onloadend = () => {
        articlePic.value = reader.result.toString()
        editor.value.commands.setImage({ src: articlePic.value})
    }
  }

  onMounted(() => {
    preTitle.value = props.title
  })

  onUpdated(
    debounce(async function() {
        await $fetch('/api/global', {
            method: 'PUT',
            body: {title: preTitle.value, content: props.modelValue},
            query: {uri: `/drafts/${route.params.id}`},
            headers: useRequestHeaders(['cookie'])
        })
    }, 2000)
  )
  
  onUnmounted(() => {
    editor.value.destroy()
  })
  </script>
  
  <style lang="scss">
  .tiptap {
    > * + * {
      margin-top: 0.75em;
    }
  
    img {
      max-width: 100%;
      height: auto;
  
      &.ProseMirror-selectednode {
        outline: 3px solid #68CEF8;
      }
    }
  
    ul,
    ol {
      padding: 0 1rem;
    }
  
    blockquote {
      padding-left: 1rem;
      border-left: 2px solid rgba(#0D0D0D, 0.1);
    }
  }
  
  .menu {
    display: block;
    background-color: #0D0D0D;
    padding: 0.2rem;
    border-radius: 0.5rem;
    button {
      border: none;
      background: none;
      color: #FFF;
      font-size: 0.85rem;
      font-weight: 500;
      padding: 0.5rem 0.4rem;
      opacity: 0.6;
  
      &:hover,
      &.is-active {
        opacity: 1;
      }
    }
  }
  </style>