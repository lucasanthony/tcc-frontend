import axios from '@/utils/axios'

const actions = {
    async createEj({ commit }, dados) {
        const data = await axios({
            method: 'POST',
            data: dados,
            url: 'ej'
        })
        return data
    }
}

export default {
    actions
}