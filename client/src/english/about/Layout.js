import React from 'react'
// import Header from '../header/Header'


const Layout = ({title = 'Title', description = 'Description', className, children}) => {
    return (
        <div>
           
            <div className='jumbotron'>
                <h2 style={{fontWeight: 'bold'}}>
                    {title}
                </h2>

                <p className='lead'>
                    {description}
                </p>
            </div>

            <div className={className}>
                {children}
            </div>
        </div>
    )
}

export default Layout