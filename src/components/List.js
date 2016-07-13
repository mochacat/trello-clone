import React from 'react'
import Card from './Card.js'

class List extends React.Component {
  constructor(props){
    super(props)
    this.list = this.props.list
  }
  
  render(){
    return (
      <div>
        <p>{this.list.title}</p>
        <div>{JSON.stringify(this.props.cards)}</div>
      </div>
    )
  }

}

export default List