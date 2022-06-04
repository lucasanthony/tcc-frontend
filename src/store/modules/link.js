import axios from '@/utils/axios'

const actions = {
    async findAllLinks({ commit }) {
        const result = await axios({
            method: 'GET',
            url: 'link'
        })
        return result.data
    },
    async createLink({ commit }, link) {
        const result = await axios({
            method: 'POST',
            url: 'link',
            data: link
        })
        return result.data
    },
    async updateLink({ commit }, dados) {
        const result = await axios({
            method: 'PATCH',
            url: `link/${dados.id}`,
            data: dados.link
        })
        return result.data
    },
    async deleteLink({ commit }, id) {
        const result = await axios({
            method: 'DELETE',
            url: `link/${id}`
        })
        return result.data
    }
}

export default {
    actions
}