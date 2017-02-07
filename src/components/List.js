import React from 'react'
import Card from './Card.js'

class List extends React.Component {

  renderCards(){
    return (this.props.cards.filter( card => card._list == this.list._id).map( (card, i) => { 
      return <Card {...this.props} key={i} card={card} />
    }))
  }
  
  render(){
    this.list = this.props.list
    let newList = this.list == undefined ? true : false

    return (
      <div className="list-wrapper">
        <div className="list">
          <div className="list-header">
            {
              !newList ? this.props.list.title : <input placeholder="Title" type="text" />
            }
          </div>
          <div className="list-cards">
            { !newList ? this.renderCards() : <input placeholder="Card" type="text" />}
          </div>
        </div>
      </div>
    )
  }

}

export default List