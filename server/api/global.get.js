export default defineEventHandler(async (event) => {
    const {public: {apiBase}} = useRuntimeConfig()
    const token = getCookie(event, 'sustain_token')
    const query = getQuery(event)
    const page = query.hasOwnProperty('page') ? `?page=${query.page}` : '';

    const data = await $fetch(`${apiBase}${query.uri}${page}`, {
        headers: {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    return data.data;
})