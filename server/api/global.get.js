export default defineEventHandler(async (event) => {
    const {public: {apiBase}} = useRuntimeConfig()
    const token = getCookie(event, 'sustain_token')
    const query = getQuery(event)

    const data = await $fetch(`${apiBase}${query.uri}`, {
        headers: {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    return data.data;
})