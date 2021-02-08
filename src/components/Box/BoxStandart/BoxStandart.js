import React from 'react'

const BoxStandart = ({data , className}) => {
    return (
        <div className={`box box-standart ${className}`}>
            <h3 className="box__title">{data.title}</h3>
            <p className="box__desc">{data.body}</p>
        </div>
    )
}
export default BoxStandart
