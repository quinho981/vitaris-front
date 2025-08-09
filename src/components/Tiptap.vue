<template>
    <div v-if="editor" class="tiptap">
        <section class="flex items-center flex-wrap gap-3 p-2 pl-4 border border-slate-200 border-b-0 rounded-t-lg">
            <button
                @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
                class="rounded-lg p-2 bg-white hover:bg-gray-100 duration-300"
            >
                <Heading1 :size="18" />
            </button>
            <button
                @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
                class="rounded-lg p-2 bg-white hover:bg-gray-100 duration-300"
            >
                <Heading2 :size="18" />
            </button>
            <button
                @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
                class="rounded-lg p-2 bg-white hover:bg-gray-100 duration-300"
            >
                <Heading3 :size="18" />
            </button>
            <button
                @click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }"
                class="rounded-lg p-2 bg-white hover:bg-gray-100 duration-300"
            >
                <Bold :size="18" />
            </button>
            <button
                @click="editor.chain().focus().toggleItalic().run()"
                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }"
                class="rounded-lg p-2 bg-white hover:bg-gray-100 duration-300"
            >
                <Italic :size="18" />
            </button>
            <button
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }"
                class="rounded-lg p-2 bg-white hover:bg-gray-100 duration-300"
            >
                <List />
            </button>
            <button
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }"
                class="rounded-lg p-2 bg-white hover:bg-gray-100 duration-300"
            >
                <ListOrdered />
            </button>
            <button 
                @click="editor.chain().focus().undo().run()" 
                :disabled="!editor.can().chain().focus().undo().run()"
                class="rounded-lg p-2 bg-white hover:bg-gray-100 duration-300"
                :class="!editor.can().chain().focus().undo().run() ? 'text-gray-400' : 'text-gray-700'"
            >
                <Undo />
            </button>
            <button 
                @click="editor.chain().focus().redo().run()" 
                :disabled="!editor.can().chain().focus().redo().run()"
                class="rounded-lg p-2 bg-white hover:bg-gray-100 duration-300"
                :class="!editor.can().chain().focus().redo().run() ? 'text-gray-400' : 'text-gray-700'"
            >
                <Redo />
            </button>
        </section>
        <EditorContent :editor="editor" />
    </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Heading1, Heading2, Heading3, Bold, Italic, List, ListOrdered, Undo, Redo } from 'lucide-vue-next';

const editor = useEditor({
    editorProps: {
        attributes: {
            class: 'border border-slate-200 rounded-b-lg p-4 min-h-[21rem] max-h-[30rem] overflow-y-auto outline-none',
        },
    },
    content: "<p>I'm running Tiptap with <b>Vue.js</b>. 🎉</p>",
    extensions: [StarterKit],
})
</script>

<style >
.is-active {
    @apply bg-blue-500;
    color: white;
}
.is-active:hover {
    @apply bg-blue-600;
}

.tiptap:first-child {
    margin-top: 0;
}

/* List styles */
.tiptap ul,
.tiptap ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;
}

.tiptap ul li p,
.tiptap ol li p {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
}

.tiptap ul {
    list-style-type: disc;   /* bolinha padrão */
    list-style-position: initial; /* para alinhar com o texto */
}

.tiptap ol {
    list-style-type: decimal; /* numérica padrão */
    list-style-position: initial;
}

/* Heading styles */
.tiptap h1,
.tiptap h2,
.tiptap h3 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
}

.tiptap h1,
.tiptap h2 {
    margin-top: 3.5rem !important;
    margin-bottom: 1.5rem !important;
}

.tiptap h1 {
    font-size: 1.6rem;
}

.tiptap h2 {
  font-size: 1.4rem;
}

.tiptap h3 {
    font-size: 1.2rem;
}

</style>