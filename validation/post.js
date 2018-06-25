const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
    let errors = {}

    data.text = !isEmpty(data.text) ? data.text : ''

    // Text Validation ====================
    const postMinChars = 2
    const postMaxChars = 280

    if (
        !Validator.isLength(data.text, { min: postMinChars, max: postMaxChars })
    ) {
        errors.text = `Post must be between ${postMinChars} and ${postMaxChars} characters.`
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
