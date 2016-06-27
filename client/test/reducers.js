import expect from 'expect'
import boards from '../src/reducers/boards'
import * as types from '../src/constants/actionTypes'

//Test that reducers update current state correctly
describe('board reducers', () => {
  it('should handle initial state', () => {
    //setup
    let action = { type: 'unknown' }
    
    //execute
    let newState = boards(undefined, {})
    
    //verify
    expect(newState).toEqual([])
  })
  
  it('should handle ADD_BOARD', () => {
    //setup
    let board = { 
      _id : 123,
      title: 'Title 123',
      description : 'title 123 description',
      pinned: true
    }
    
    let action = {
      type: types.ADD_BOARD,
      board : board
    }
    
    //starting with empty store
    expect(boards([], action)).toEqual([board])

    //now test with existing store
    let store = {
      _id: 100,
      title: 'Title Test',
      description: 'title test descrition',
      pinned: true
    }
    expect(boards([store], action)).toEqual([store, board])
  })
  
  it('should handle REMOVE_BOARD', () => {
    let store = [{
      _id: 100,
      title: 'Title Test',
      description: 'title test description',
      pinned: true
    },{
      _id: 200,
      title: 'Title Test 2',
      description: 'title test description',
      pinned: true
    }]
    
    //setup
    let action = {
      type: types.REMOVE_BOARD,
      boardId: 200
    }
    
    //execute and verify
    expect(boards(store, action)).toEqual([{
      _id: 100,
      title: 'Title Test',
      description: 'title test description',
      pinned: true
    }])
  })
  
  it('should handle TOGGLE_PIN', () => {
    let store = [{
      _id: 100,
      title: 'Title Test',
      description: 'title test description',
      pinned: true
    },{
      _id: 200,
      title: 'Title Test 2',
      description: 'title test description',
      pinned: true
    }]
    
    //setup
    let action = {
      type: types.TOGGLE_PIN,
      boardId: 100
    }
    
    //execute
    let newState = boards(store, action)
    
    //verify
    expect(newState).toEqual([{
      _id: 100,
      title: 'Title Test',
      description: 'title test description',
      pinned: false
    },{
      _id: 200,
      title: 'Title Test 2',
      description: 'title test description',
      pinned: true
    }])
  })
  
  it('should handle EDIT_BOARD', () => {
    let store = [{
      _id: 100,
      title: 'Title Test',
      description: 'title test description',
      pinned: true
    },{
      _id: 200,
      title: 'Title Test 2',
      description: 'title test description',
      pinned: true
    }]
    
    //setup
    let action = {
      type: types.EDIT_BOARD,
      board: {
        _id: 200,
        title: 'Title Test 3',
        description: 'title test 3 description'
      }
    }
    
    //execute
    let newState = boards(store, action)
    
    //verify
    expect(newState).toEqual([{
      _id: 100,
      title: 'Title Test',
      description: 'title test description',
      pinned: true
    },{
      _id: 200,
      title: 'Title Test 3',
      description: 'title test 3 description',
      pinned: true
    }])
  })
})