import ej from './ej'
import auth from './auth'
import member from './member'
import project from './project'
import link from './link'

const actions = {
    ...ej.actions,
    ...auth.actions,
    ...member.actions,
    ...project.actions,
    ...link.actions
}

export default actions