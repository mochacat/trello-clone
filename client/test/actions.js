import expect from 'expect'
import * as actions from '../src/actions/actionCreators'
import * as types from '../src/constants/actionTypes'

//Tests to make sure right action creator was called & actions returned
describe('redux actions', () => {
  it('should create an action to toggle pin for board', () => {
    const boardId = 1
    const expectedAction = {
      type: types.TOGGLE_PIN,
      boardId
    }
    expect(actions.togglePin(boardId)).toEqual(expectedAction)
  })
  
  it('should create an action to add a new board', () => {
    const board = {
      _id : 1,
      title: 'Title 1',
      description : 'title 1 description',
      pinned: true
    }
    const expectedAction = {
      type: types.ADD_BOARD,
      board: board 
    }
    expect(actions.addBoard(board)).toEqual(expectedAction)
  })
  
  it('should create an action to remove a board', () => {
    const boardId = 1
    const expectedAction = {
      type: types.REMOVE_BOARD,
      boardId
    }
    expect(actions.removeBoard(boardId)).toEqual(expectedAction)
  })
  
})