import React from 'react'
import { Header } from './Header'

export const Layout = ({children}) => {
  return (
    <div>
        {/* header */}
        <Header/>

        {/* main body */}
        <div className="main">{children}</div>

        {/* footer */}
        <footer className="mt-3 bg-dark text-light text-center p-3">
          &copy; Copy right all rights reserved 2023
        </footer>
        
    </div>
  )
}
