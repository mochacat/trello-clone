import React from 'react'
import { Link } from 'react-router'
import List from './List'

class BoardPage extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      newList: false,
    }
  }
  
  handleClick(e){
    e.preventDefault()
    this.toggleNewList()
  }
  
  handleTitleChange(e){
    //this.setState()
  }
  
  handleCards(e){
    //this.setState()
  }
  
  toggleNewList(){
    this.setState({newList: !this.state.newList})
  }
  
  render(){
    this.board = this.props.boards.find( board => board._id == this.props.params.id)
    
    return (
      <div className="board-wrapper">
        <div className="board-title">{this.board.title}</div>
        <div className="board-content">
          {this.props.lists.filter( list => list._board == this.board._id).map( (list, i) => { 
            return <List {...this.props} key={i} list={list} />
          })}
          {this.state.newList ?
            <List
              {...this.props}
              handleSubmit={this.handleSubmit}
              handleTitleKeyDown={this.handleTitleKeyDown}
              handleTitleChange={this.handleTitleChange}
              handleCards={this.handleCards}
              key="newList"/> : 
            null
          }
          <div className="create-list list-wrapper">
            <div className="list">
              <a onClick={this.handleClick.bind(this)}>
                <i className="fa fa-2x fa-plus plus" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default BoardPage