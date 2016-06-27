import React from 'react'

import NavSection from './NavSection'

import '../assets/application.scss'

export default class Main extends React.Component{
  
  render(){
    return (
      <div className="page-wrapper">
        <NavSection />
        <div className="content">
          { React.cloneElement(
              this.props.children,
              { ...this.props }
          )}
        </div>
      </div>
    )
  }
}