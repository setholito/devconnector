import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

import { LIKE_BUTTON_TEXT, LIKED_BUTTON_TEXT } from '../../constants/Content'

function ButtonLike({ hasLike, id, onClick, numLikes }) {
    console.log('hasLike in button like', hasLike)
    const dynamicText = hasLike ? LIKED_BUTTON_TEXT : LIKE_BUTTON_TEXT
    const dynamicClassName = hasLike ? '' : 'is-outlined'
    const showLikes = numLikes > 0 ? numLikes : ''

    return (
        <Button
            className={`is-info ${dynamicClassName}`}
            id={id}
            text={`${dynamicText} ${showLikes}`}
            onClick={onClick}
        />
    )
}

ButtonLike.defaultProps = {
    hasLike: false
}

ButtonLike.propTypes = {
    hasLike: PropTypes.bool,
    numLikes: PropTypes.number
}

export default ButtonLike
