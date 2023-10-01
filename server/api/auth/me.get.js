export default defineEventHandler(async (event) => {
    const {public: {apiBase}} = useRuntimeConfig()
    const token = getCookie(event, 'sustain_token')
    try {
        const data = await $fetch(`${apiBase}/auth/me`, {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        return data.data
    } catch (error) {
        if(error.statusCode == 401) {
            setCookie(event,'sustain_token', '',{
                secure: true,
                httpOnly: true,
                maxAge: new Date(0),
                path: '/'
            })
        }
        return error
    }
})