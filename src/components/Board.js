import React from 'react'
import { Link } from 'react-router'

class Board extends React.Component {
  
  constructor(props){
    super(props)
    this.trim = this.trim.bind(this)
  }
  
  trim(text) {
    //limit characters to 100 for now
    return text.split('').splice(0,90).join('')
  }

  render(){
    
    const {board, togglePin} = this.props
    let pinClass = board.pinned ? 'pinned' : '';
    
    return (
      <div className="board-section">
        <div className="board-section-header">
          <Link to={`/board/${board._id}`}>{this.trim(board.title)}</Link>
        </div>
        <div className="board-section-content">
          {this.trim(board.description)}
        </div>
        <span
          className={"board-section-tack " + pinClass}
          onClick={togglePin.bind(null, board._id)} >
          <i className="fa fa-thumb-tack" aria-hidden="true"></i>
        </span>
      </div>
    )
  }

}

export default Board