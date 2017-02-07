import React from 'react'
import Card from './Card.js'

class List extends React.Component {
  
  render(){
    return (
      <div className="list">
        <div className="list-header">{this.props.list.title}</div>
        <section>
        </section>
      </div>
    )
  }

}

export default List