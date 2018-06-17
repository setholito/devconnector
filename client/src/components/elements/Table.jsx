import React from 'react'

function Table({ children }) {
    const filteredHeader = React.Children.toArray(children).filter(
        child => child.props.header
    )

    const filteredBody = React.Children.toArray(children).filter(child => {
        return child.props.header === false
    })

    return (
        <table className="table is-fullwidth">
            <thead>{filteredHeader}</thead>
            <tbody>{filteredBody}</tbody>
        </table>
    )
}

export default Table
