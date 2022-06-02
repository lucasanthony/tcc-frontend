import ej from './ej'
import auth from './auth'

const actions = {
    ...ej.actions,
    ...auth.actions
}

export default actions