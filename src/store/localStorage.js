import utils from '@/utils/utils'

const KEYS = {
    LOGIN: {
        usuario: 'usuario',
        token: 'token',
        jwt: '@jwt'
    }
}

const getItem = (key) => {
    let item = localStorage.getItem(key)
    if (utils.isJson(item)) {
        item = JSON.parse(item)
    }
    return item
}

const setItem = (key, value) => {
    if (value instanceof Object) {
        localStorage.setItem(key, JSON.stringify(value))
    } else {
        localStorage.setItem(key, value)
    }
}

export default localStorage
export { KEYS, getItem, setItem }
