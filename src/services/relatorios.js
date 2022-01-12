import api from './api';

const lastSubmissions = async () => {
    const submissions = await api.get('report/status', {
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwcm9qZWN0LXgiLCJzdWIiOiI1ZWE2MTFiMmMwMWZmNzZlNTYxNzQ0NzgiLCJpYXQiOjE2MzAwOTk1MzMyMDd9.8R8jW5F7Cjma3Lb43nh_YlJXv_CAtJM9u8ItLm_YmFA"
        }
    })

    return submissions;
}

export { lastSubmissions }