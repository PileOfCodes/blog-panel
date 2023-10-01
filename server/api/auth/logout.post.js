export default defineEventHandler(async(event) => {
    const {public: {apiBase}} = useRuntimeConfig()
    const token = getCookie(event,'sustain_token')

    const data = await $fetch(`${apiBase}/auth/logout`, {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    setCookie(event, 'sustain_token', '', {
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        path: '/'
    })
    return data;
})