import React from 'react'

import "./style.scss"
export const Loading = ({ isLoading }) => {

    return (
        <React.Fragment>
            {isLoading && (
                <div className="overlay">
                    <div className="wrapper">
                        <div className="loader"></div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}
