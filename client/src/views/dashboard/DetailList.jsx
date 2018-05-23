import React from 'react'
import PropTypes from 'prop-types'
import ListAuto from '../../components/common/ListAuto'

function DetailList({ arr }) {
    const detailArr = arr.reduce((acc, cur) => {
        const currentKey = Object.keys(cur)[0]
        const templateObj = {
            label: currentKey,
            text: cur[currentKey]
        }

        acc.push(templateObj)

        return acc
    }, [])

    return <ListAuto arr={detailArr} />
}

DetailList.defaultProps = {
    arr: []
}

DetailList.propTypes = {
    arr: PropTypes.array.isRequired
}

export default DetailList
