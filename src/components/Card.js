import React from 'react'

class Card extends React.Component {
  
  render(){
    this.card = this.props.card
    return (
      <div className="list-card">
        <p>{this.card.title}</p>
      </div>
    )
  }

}

export default Card