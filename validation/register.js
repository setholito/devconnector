const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.firstName = !isEmpty(data.firstName) ? data.firstName : ''
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    // First Name Validation ====================
    const minNameLength = 2
    const maxNameLength = 30

    if (
        !Validator.isLength(data.firstName, {
            min: minNameLength,
            max: maxNameLength
        })
    ) {
        errors.firstName = `First name must be between ${minNameLength} and ${maxNameLength} characters.`
    }

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name field is required.'
    }

    // Last Name Validation ====================
    if (
        !Validator.isLength(data.lastName, {
            min: minNameLength,
            max: maxNameLength
        })
    ) {
        errors.lastName = `Last name must be between ${minNameLength} and ${maxNameLength} characters.`
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name field is required.'
    }

    // Email Validation ====================
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required.'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid.'
    }

    // Password Validation ====================
    const minPasswordLength = 6
    const maxPasswordLength = 30

    if (
        !Validator.isLength(data.password, {
            min: minPasswordLength,
            max: maxPasswordLength
        })
    ) {
        errors.password = `Password must be greater than ${minPasswordLength} characters, less than ${maxPasswordLength}.`
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required.'
    }

    // Password2 Validation ====================
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required.'
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Confirm password does not match Password.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
