import moment from 'moment'

const formatDate = (value, format = 'DD/MM/YYYY') => {
    return moment(value).format(format)
}

const formatEmptyRow = (row, column, prop) => prop || '-'

export default {
    formatDate,
    formatEmptyRow
}