import React from 'react'
import { Link } from 'react-router'
import List from './List'

class BoardPage extends React.Component {
  constructor(props){
    super(props)
    this.board = this.props.boards.find( board => board._id == this.props.params.id)
  }
  
  render(){
    
    return (
      <div className="container">
        <section>
          {this.props.lists.filter( list => list._board == this.board._id).map( (list, i) => { 
            return <List {...this.props} key={i} list={list} />
          })}
        </section>
      </div>
    )
  }

}

export default BoardPage