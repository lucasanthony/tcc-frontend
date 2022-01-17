import api from './api';

const findAll = async () => {
    const membros = await api.get('user', {
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwcm9qZWN0LXgiLCJzdWIiOiI1ZWE2MTFiMmMwMWZmNzZlNTYxNzQ0NzgiLCJpYXQiOjE2MzAwOTk1MzMyMDd9.8R8jW5F7Cjma3Lb43nh_YlJXv_CAtJM9u8ItLm_YmFA"
        }
    })

    return membros;
}

export { findAll }