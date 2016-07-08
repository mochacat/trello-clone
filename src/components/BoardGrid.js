import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import Board from './Board.js'

class BoardGrid extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      newBoard: false,
      title: '',
      description: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    
  }
  
  handleClick(e){
    e.preventDefault()
    this.toggleNewBoard()
  }
  
  async handleSubmit(e){
    e.preventDefault()
    
    const { addBoard } = this.props
    
    const formData = {
      title: this.state.title,
      description: this.state.description
    }
    
    try {
      const response = await fetch(`/board/`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: this.state.title,
            description: this.state.description
          })
        })
    
      const boardData = await response.json()
      if (response.status == 200){
        //handle success by dispatching action
        addBoard(boardData.board)
        this.setState({
          newBoard: false,
          title: '',
          description: ''
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
  
  handleTitleChange(e){
    this.setState({title: e.target.value})
  }
  
  handleDescriptionChange(e){
    this.setState({description: e.target.value})
  }
  
  toggleNewBoard(){
    this.setState({newBoard: !this.state.newBoard})
  }
  
  render(){
    
    const { addBoard, boards } = this.props
    
    return (
      <div className="container">
        <section>
          <div className="section-header">
            <h3>
              <span className="section-icon">
                <i className="fa fa-fw fa-thumb-tack" aria-hidden="true"></i>
              </span>
              <Link to="/">Pinned Boards</Link>
            </h3>
          </div>
          <div className="section-content">
            <div className="board-columns">
              {boards.filter( board => {
                return board.pinned == true;
              }).map((board, i) => {
                return <Board {...this.props} key={i} board={board} />
              })}
            </div>
          </div>
        </section>
        <section>
          <div className="section-header">
            <h3>
              <span className="section-icon">
                <i className="fa fa-fw fa-columns" aria-hidden="true"></i>
              </span>
              <Link to="/">My Boards</Link>
            </h3>
          </div>
          <div className="section-content">
            <div className="board-columns">
              {this.props.boards.map( (board, i) => {
                return <Board {...this.props} key={i} board={board} />
              })}
              {this.state.newBoard ?
                <Board
                  {...this.props}
                  handleSubmit={this.handleSubmit}
                  handleTitleChange={this.handleTitleChange}
                  handleDescriptionChange={this.handleDescriptionChange}
                  key="newBoard"/> :
                null
              } 
              <div className="create-board-section">
                <div className="create-board">
                  <a onClick={this.handleClick}>
                    <i className="fa fa-2x fa-plus plus" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

}

export default BoardGrid