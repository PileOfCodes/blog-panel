<template>
    <div v-if="editor">
        <button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        bold
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        italic
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        strike
        </button>
        <button @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        code
        </button>
        <EditorContent :editor="editor" style="width: 400px;" />
    </div>
</template>


<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
    content: `<p>I’m running Tiptap with Vue.js. 🎉</p>`,
    extensions: [
        StarterKit,
    ]
})
</script>