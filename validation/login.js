const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    // Email Validation ====================
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid.'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required.'
    }

    // Password Validation ====================
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required.'
    }

    const minPasswordLength = 6
    const maxPasswordLength = 30

    if (
        !Validator.isLength(data.password, {
            min: minPasswordLength,
            max: maxPasswordLength
        })
    ) {
        errors.password = `Email must be greater than ${minPasswordLength} characters, less than ${maxPasswordLength}.`
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
