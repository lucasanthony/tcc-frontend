import ej from './ej'
import auth from './auth'
import member from './member'

const actions = {
    ...ej.actions,
    ...auth.actions,
    ...member.actions
}

export default actions