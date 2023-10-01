export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const {public: {apiBase}} = useRuntimeConfig()
    const data = await $fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        body,
        headers: {
            'Accept' : 'application/json'
        }
    })
    if(data.status == 200) {
        setCookie(event, 'sustain_token', data.data.login_token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60,
            secure: true,
            path: '/'
        })
        return data;
    }else {
        return data;
    }
})