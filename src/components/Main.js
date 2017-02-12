import React from 'react'

import NavSection from './NavSection'

//import '../assets/application.scss'
//import '../containers/assets/app.css'

export default class Main extends React.Component{
  
  render(){
    return (
      <div className="page-wrapper">
        <NavSection />
        <div id="content">
          { React.cloneElement(
              this.props.children,
              { ...this.props }
          )}
        </div>
      </div>
    )
  }
}