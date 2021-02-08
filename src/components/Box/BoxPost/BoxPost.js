import React from 'react'

import './BoxPost.scss'

const BoxPost = ({data , className}) => {
    return (
        <div className={`box box-post ${className}`}>
            <h3 className="box__title">{data.title}</h3>
            <p className="box__desc">{data.body}</p>
        </div>
    )
}

export default BoxPost
