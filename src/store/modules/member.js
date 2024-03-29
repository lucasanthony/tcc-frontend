import axios from '@/utils/axios'

const actions = {
    async findAllMembers({ commit }) {
        const result = await axios({
            method: 'GET',
            url: 'member'
        })
        return result.data
    },
    async createMember({ commit }, member) {
        const result = await axios({
            method: 'POST',
            url: 'member',
            data: member
        })
        return result.data
    },
    async updateMember({ commit }, dados) {
        const result = await axios({
            method: 'PATCH',
            url: `member/${dados.id}`,
            data: dados.membro
        })
        return result.data
    },
    async deleteMember({ commit }, id) {
        const result = await axios({
            method: 'DELETE',
            url: `member/${id}`
        })
        return result.data
    }
}

export default {
    actions
}