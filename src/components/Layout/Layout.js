import React from 'react'

import "./Layout.scss"

const Layout = ({children}) => {
    return (
        <div className="content-main">
            {children}
        </div>
    )
}

export default Layout
