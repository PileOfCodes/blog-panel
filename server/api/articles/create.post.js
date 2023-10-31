import { readFiles } from 'h3-formidable'
import FormData from 'form-data';
import fs from 'fs';

export default defineEventHandler(async(event) => {
    const {public: {apiBase}} = useRuntimeConfig()
    const token = getCookie(event, 'sustain_token')
    const { fields, files } = await readFiles(event)

    const formData = new FormData()
    formData.append('title', fields.title[0])
    formData.append('categories', fields.categories[0])
    formData.append('content', fields.content[0])
    formData.append('image', fs.createReadStream(files.image[0].filepath))

    const data = await $fetch(`${apiBase}/posts`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    return data.data;
})