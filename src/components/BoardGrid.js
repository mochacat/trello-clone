import React from 'react'
import { Link } from 'react-router'

import Board from './Board.js'

class BoardGrid extends React.Component {

  render(){

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
              {this.props.boards.filter( board => {
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
              <div className="create-board-section">
                <div className="create-board">
                  <a href="#">
                    <i className="fa fa-2x fa-plus" aria-hidden="true"></i>
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