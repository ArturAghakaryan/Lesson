import React from 'react'
import PropTypes from "prop-types";

import './BoxPost.scss'

const BoxPost = ({data , className}) => {
    return (
        <div className={`box box-post ${className}`}>
            <h3 className="box__title">{data.title}</h3>
            <p className="box__desc">{data.body}</p>
        </div>
    )
}

BoxPost.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
}

export default BoxPost
