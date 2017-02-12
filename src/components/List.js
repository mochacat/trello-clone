import React from 'react'
import Card from './Card.js'

class List extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      newCard : false,
    }
    
    this.createNewList = this.createNewList.bind(this)
    this.handleTitleKeyDown = this.handleTitleKeyDown.bind(this)
  }
  
  async createNewList(title){
    const { addList } = this.props
    
    const listData = {
      title: title,
      description: '',
      _board: this.props.params.id
    }
    
    try {
      const response = await fetch(`/list/`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(listData)
        })
    
      const listRes = await response.json()
      
      if (response.status == 200){
        //handle success by dispatching action
        addList(listRes.list)
        this.setState({
          newList: false
        })
        //hide edited
      } else if (response.status == 400) {
        //handle validation error
      } else {
        //general error messages
      }
    } catch (e){
      console.log(e)
    }
  }
  
  handleTitleKeyDown(e){
    let listName = e.target.value
    if (e.keyCode == 13 && listName.length > 0){
      this.createNewList(listName)
    }
  }

  renderCards(list){
    return (this.props.cards.filter( card => card._list == list._id).map( (card, i) => { 
      return <Card {...this.props} key={i} card={card} />
    }))
  }
  
  render() {
    const { list } = this.props

    const { handleTitleChange } = this.props
    
    let newList = list == undefined ? true : false

    return (
      <div className="list-wrapper">
        <div className="list">
          <div className="list-header">
            {
              !newList ? 
                this.props.list.title :
                <input
                  placeholder="Title"
                  type="text"
                  autoFocus={true}
                  onKeyDown={this.handleTitleKeyDown}
                  required/>
            }
          </div>
          <div className="list-cards">
            {
              !newList ?
                this.renderCards(list) :
                <input
                  placeholder="Card"
                  type="text"
                />
            }
          </div>
        </div>
      </div>
    )
  }

}

export default List