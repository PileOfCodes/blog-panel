export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const token = getCookie(event, 'sustain_token')
    const {public: {apiBase}} = useRuntimeConfig()

    const data = await $fetch(`${apiBase}/drafts`, {
        method: 'POST',
        body,
        headers: {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    return data;
})