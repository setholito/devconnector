const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    // Name Validation ====================
    const minNameLength = 2
    const maxNameLength = 30

    if (
        !Validator.isLength(data.name, {
            min: minNameLength,
            max: maxNameLength
        })
    ) {
        errors.name = `Name must be between ${minNameLength} and ${maxNameLength} characters.`
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required.'
    }

    // Email Validation ====================
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required.'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid.'
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

    // Password2 Validation ====================
    if (Validator.isEmpty(data.password2)) {
        errors.password = 'Confirm password field is required.'
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password = 'Password does not match Confirm Password.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
