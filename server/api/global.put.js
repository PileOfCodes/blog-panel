export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const token = getCookie(event, 'sustain_token')
    const {public: {apiBase}} = useRuntimeConfig()
    const query = getQuery(event)

    const data = await $fetch(`${apiBase}${query.uri}`, {
        method: 'PUT',
        body,
        headers: {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    return data;
})