import React from 'react'
import PropTypes from 'prop-types'

function Message({ children, dismissable, heading, type }) {
    const isDismissable = dismissable ? (
        <button className="delete" aria-label="delete" />
    ) : null

    return (
        <article className={`message is-${type}`}>
            <div className="message-header">
                <p>{heading}</p>
                {isDismissable}
            </div>
            <div className="message-body">{children}</div>
        </article>
    )
}

Message.defaultProps = {
    dismissable: false,
    heading: 'Heading',
    type: 'primary'
}

Message.propTypes = {
    dismissable: PropTypes.bool,
    heading: PropTypes.string.isRequired,
    type: PropTypes.string
}

export default Message
