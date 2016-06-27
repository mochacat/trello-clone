import React from 'react'

import { Link } from 'react-router'

class NavSection extends React.Component {

  render(){
    return (
      <nav>
        <div className="nav-inner">
          <Link to="/" className="nohover"><h1>Trello Redux</h1></Link>
        </div>
      </nav>
    )
  }

}

export default NavSection