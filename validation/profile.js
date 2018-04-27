const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
    let errors = {}

    data.handle = !isEmpty(data.handle) ? data.handle : ''
    data.status = !isEmpty(data.status) ? data.status : ''
    data.skills = !isEmpty(data.skills) ? data.skills : ''

    // Handle Validation ====================
    const handleMinLength = 2
    const handleMaxLength = 40

    if (
        !Validator.isLength(data.handle, {
            min: handleMinLength,
            max: handleMaxLength
        })
    ) {
        errors.handle = `Handle must be between ${handleMinLength} and ${handleMaxLength} characters.`
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required.'
    }

    // Status Validation ====================
    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required.'
    }

    // Skills Validation ====================
    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required.'
    }

    // Website Validation ====================
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL.'
        }
    }

    // Social Media Validation ====================
    const socialMediaError = 'Not a valid URL.'

    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = socialMediaError
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = socialMediaError
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = socialMediaError
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = socialMediaError
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = socialMediaError
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
