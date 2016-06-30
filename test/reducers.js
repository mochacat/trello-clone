import expect from 'expect'
import boards from '../src/reducers/boards'
import lists from '../src/reducers/lists'
import cards from '../src/reducers/cards'
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
  
  it('should handle ' + types.ADD_BOARD, () => {
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
  
  it('should handle ' + types.REMOVE_BOARD, () => {
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
  
  it('should handle ' + types.TOGGLE_PIN, () => {
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
  
  it('should handle ' + types.EDIT_BOARD, () => {
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

describe('list reducers', () => {
  it('should handle initial state', () => {
    //setup
    let action = { type: 'unknown' }
    
    //execute
    let newState = boards(undefined, {})
    
    //verify
    expect(newState).toEqual([])
  })
  
  it('should handle ' + types.ADD_LIST, () => {
    //setup
    let list = { 
      _id: 1,
      _board: 1,
      description: 'list description',
    }
    
    let action = {
      type: types.ADD_LIST,
      list: list
    }
    
    //starting with empty store
    expect(lists([], action)).toEqual([list])

    //now test with existing store
    let store = {
      _id: 100,
      _board: 1,
      title: 'List Test'
    }
    expect(lists([store], action)).toEqual([store, list])
  })
  
  it('should handle ' + types.REMOVE_LIST, () => {
    let store = [{
      _id: 100,
      _board: 1,
      title: 'Title Test'
    },{
      _id: 200,
      _board: 2,
      title: 'Title Test 2'
    }]
    
    //setup
    let action = {
      type: types.REMOVE_LIST,
      listId: 200
    }
    
    //execute and verify
    expect(lists(store, action)).toEqual([{
      _id: 100,
      _board: 1,
      title: 'Title Test'
    }])
  })
  
  it('should handle ' + types.EDIT_LIST, () => {
    let store = [{
      _id: 100,
      _board: 1,
      title: 'Title Test'
    },{
      _id: 200,
      _board: 2,
      title: 'Title Test 2'
    }]
    
    //setup
    let action = {
      type: types.EDIT_LIST,
      list: {
        _id: 200,
        _board: 2,
        title: 'Title Test 2 Edit',
      }
    }
    
    //execute
    let newState = lists(store, action)
    
    //verify
    expect(newState).toEqual([{
      _id: 100,
      _board: 1,
      title: 'Title Test'
    },{
      _id: 200,
      _board: 2,
      title: 'Title Test 2 Edit'
    }])
  })
})

describe('cards reducers', () => {
  it('should handle ' + types.ADD_CARD, () => {
    
    /* Start with no existing store */    
    
    //setup
    let card = { 
      _id: 123,
      _list: 2,
      title: 'Title 123',
      description: 'title 123 description',
    }
    
    let action = {
      type: types.ADD_CARD,
      card: card
    }
    
    //execute & verify
    expect(cards([], action)).toEqual([card])
    
    /* Now check with existing store */
    
    //setup
    
    let store = { 
      _id: 11,
      _list: 2,
      title: 'Title Test Existing Store',
      description: 'existing store description',
    }
    
    card = {
      _id: 12,
      _list: 3,
      title: 'Title Test New Card',
      description: 'existing store new card description'
    }
    
    action = {
      type: types.ADD_CARD,
      card: card
    }
    
    let newState = cards([store], action)
    
    //execute & verify
    expect(newState).toEqual([store, card])
    
  })
  
  it('should handle ' + types.EDIT_CARD, ()  => {
    //setup
    let store = [
      {
        _id: 14,
        _list: 1,
        title: 'Edit Card Title 1',
        description: 'edit card description 1'
      },
      {
        _id: 15,
        _list: 1,
        title: 'Edit Card Title 2',
        description: 'edit card description 2'
      }
    ]
    
    let card = {
      _id: 14,
      _list: 1,
      title: 'Edited Card Title',
      description: 'edited card description'
    }
    
    let action = {
      type: types.EDIT_CARD,
      card: card
    }
    
    //execute
    let newState = cards(store, action)
    
    //verify
    expect(newState).toEqual([
      {
        _id: 14,
        _list: 1,
        title: 'Edited Card Title',
        description: 'edited card description'
      },
      {
        _id: 15,
        _list: 1,
        title: 'Edit Card Title 2',
        description: 'edit card description 2'
      }
    ])
  })
  
  it('should handle ' + types.REMOVE_CARD, () => {
    //setup
    let store = [
      {
        _id: 14,
        _list: 1,
        title: 'Edit Card Title 1',
        description: 'edit card description 1'
      },
      {
        _id: 15,
        _list: 1,
        title: 'Edit Card Title 2',
        description: 'edit card description 2'
      }
    ]
    
    const remove_id = 15;
    
    let action = {
      type: types.REMOVE_CARD,
      cardId: remove_id
    }
    
    //execute
    let newState = cards(store, action)
    
    //verify
    expect(newState).toEqual([
      {
        _id: 14,
        _list: 1,
        title: 'Edit Card Title 1',
        description: 'edit card description 1'
      }
    ])
  })
  
  it('should handle ' + types.MOVE_CARD, () => {
    
    let store = [
      {
        _id: 1,
        _list: 1,
        title: 'Move me 1',
        description: 'Move me 1',
        position: 1
      },
      {
        _id: 2,
        _list: 1,
        title: 'Move me 2',
        description: 'Move me 2',
        position: 2
      },
      {
        _id: 3,
        _list: 1,
        title: 'Move me 3',
        description: 'Move me 3',
        position: 3
      },
      {
        _id: 4,
        _list: 2,
        title: 'Move me 4',
        description: 'Move me 4',
        position: 1
      },
      {
        _id: 5,
        _list: 2,
        title: 'Move me 5',
        description: 'Move me 5',
        position: 2
      },
      {
        _id: 6,
        _list: 2,
        title: 'Move me 6',
        description: 'Move me 6',
        position: 3
      }
    ]
    
    /* Move to new List */
    //setup
    let action = {
      type: types.MOVE_CARD,
      cardId: 6,
      listId: 1, //new list
      position: 4
    }
    
    let move_store = [
      {
        _id: 1,
        _list: 1,
        title: 'Move me 1',
        description: 'Move me 1',
        position: 1
      },
      {
        _id: 2,
        _list: 1,
        title: 'Move me 2',
        description: 'Move me 2',
        position: 2
      },
      {
        _id: 3,
        _list: 1,
        title: 'Move me 3',
        description: 'Move me 3',
        position: 3
      },
      {
        _id: 4,
        _list: 2,
        title: 'Move me 4',
        description: 'Move me 4',
        position: 1
      },
      {
        _id: 5,
        _list: 2,
        title: 'Move me 5',
        description: 'Move me 5',
        position: 2
      },
      {
        _id: 6,
        _list: 1,
        title: 'Move me 6',
        description: 'Move me 6',
        position: 4
      }
    ]
    
    //execute & verify
    expect(cards(store, action)).toEqual(move_store)
    
    /* Move position in same List */
    
    //execute & verify
    expect(cards(store, {
      type: types.MOVE_CARD,
      cardId: 6,
      listId: 2,
      position: 2 //new position
    })).toEqual([
      {
        _id: 1,
        _list: 1,
        title: 'Move me 1',
        description: 'Move me 1',
        position: 1
      },
      {
        _id: 2,
        _list: 1,
        title: 'Move me 2',
        description: 'Move me 2',
        position: 2
      },
      {
        _id: 3,
        _list: 1,
        title: 'Move me 3',
        description: 'Move me 3',
        position: 3
      },
      {
        _id: 4,
        _list: 2,
        title: 'Move me 4',
        description: 'Move me 4',
        position: 1
      },
      {
        _id: 5,
        _list: 2,
        title: 'Move me 5',
        description: 'Move me 5',
        position: 3
      },
      {
        _id: 6,
        _list: 2,
        title: 'Move me 6',
        description: 'Move me 6',
        position: 2
      }
    ])
  })

})
