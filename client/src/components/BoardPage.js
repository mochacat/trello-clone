import React from 'react'

class BoardPage extends React.Component {

  render(){
    //id of the board
    const id = this.props.boards.findIndex(board => board._id === this.props.params.id)
    return (
      <div className="container">
        <section>
          <p>Boardpaaagge</p>
        </section>
      </div>
    )
  }

}

export default BoardPage