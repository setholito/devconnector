import React from 'react'
import { Link } from 'react-router-dom'

import Content from '../../constants/Content'
import Url from '../../constants/Url'

import Message from '../../components/common/Message'

function NoProfile() {
    return (
        <div className="no-profile">
            <Message heading="No Profile" type="warning">
                <p>
                    {Content.NO_PROFILE}
                    <br />
                    <br />
                </p>
                <Link to={Url.CREATE_PROFILE} className="button is-primary">
                    {Content.CREATE_PROFILE_CTA}
                </Link>
            </Message>
        </div>
    )
}

export default NoProfile
