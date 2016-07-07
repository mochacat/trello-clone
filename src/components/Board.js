import React from 'react'
import { Link } from 'react-router'

class Board extends React.Component {
  
  constructor(props){
    super(props)
    this.trim = this.trim.bind(this)
  }
  
  trim(text) {
    //limit characters to 100 for now
    return text.split('').splice(0,40).join('')
  }

  render(){
    
    const { board, togglePin } = this.props
    const { handleTitleChange, handleDescriptionChange, handleSubmit } = this.props
    
    let pinClass = '', newBoard = false
    if (board == undefined) {
      newBoard = true 
    } else {
      if (board.pinned){
        pinClass = 'pinned'
      }
    }
    
    return (
      <div className="board-section">
        <form onSubmit={handleSubmit}>
          <div className="board-section-header">
            { !newBoard ?
              <Link to={`/board/${board._id}`}>{this.trim(board.title)}</Link> :
              <input placeholder="Title" type="text" onChange={handleTitleChange} required/> }
          </div>
          <div className="board-section-content">
            { !newBoard ?
              this.trim(board.description) :
              <div>
                <input placeholder="description" type="text" onChange={handleDescriptionChange} />
              </div> }
          </div>
          { !newBoard ? null : <button>Enter</button> }
        </form>
        <span
          className={"board-section-tack " + pinClass}
          onClick={!newBoard ? togglePin.bind(null, board._id) : false} >
          <i className="fa fa-thumb-tack" aria-hidden="true"></i>
        </span>
      </div>
    )
  }

}

export default Board