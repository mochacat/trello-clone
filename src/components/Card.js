import React from 'react'

class Card extends React.Component {

  constructor(props){
    super(props)
    this.card = this.props.card
  }
  
  render(){
    return (
      <div>
        <p>{this.card.title}</p>
      </div>
    )
  }

}

export default Card