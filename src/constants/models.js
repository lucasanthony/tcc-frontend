const emptyMember = {
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    entryDate: '',
    habilities: [],
    department: '',
    obervations: ''
}

const emptyProject = {
    name: '',
    description: '',
    tags: [],
    team: [],
    startDate: '',
    finishDate: '',
    contractLink: '',
    customer: {
        name: '',
        email: '',
        contact: ''
    }
}

const emptyLink = {
    name: '',
    url: '',
    tags: [],
    departments: [],
    observations: ''
}

const emptyUser = {
    name: '',
    email: '',
    role: '',
    birthDate: '',
    password: '',
    confirmPassword: ''
}

export default {
    emptyMember,
    emptyProject,
    emptyLink,
    emptyUser
}