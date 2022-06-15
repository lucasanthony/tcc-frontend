import axios from '@/utils/axios'

const actions = {
    async findAllUsers({ commit }) {
        const result = await axios({
            method: 'GET',
            url: 'user'
        })
        return result.data
    },
    async createUser({ commit }, user) {
        const result = await axios({
            method: 'POST',
            url: 'user',
            data: user
        })
        return result.data
    },
    async updateUser({ commit }, dados) {
        const result = await axios({
            method: 'PATCH',
            url: `user/${dados.id}`,
            data: dados.membro
        })
        return result.data
    },
    async deleteUser({ commit }, id) {
        const result = await axios({
            method: 'DELETE',
            url: `user/${id}`
        })
        return result.data
    }
}

export default {
    actions
}