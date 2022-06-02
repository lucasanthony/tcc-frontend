import axios from '@/utils/axios'

const actions = {
    async findAllMembers({ commit }) {
        const result = await axios({
            method: 'GET',
            url: 'member'
        })
        return result.data
    }
}

export default {
    actions
}