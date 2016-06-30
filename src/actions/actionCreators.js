import * as types from '../src/constants/actionTypes'

/*
 * Boards
 */

export function togglePin(boardId) {
  return {
    type: types.TOGGLE_PIN,
    boardId
  }
}

export function addBoard(board){
  return {
    type: types.ADD_BOARD,
    board
  }
}

export function removeBoard(boardId){
  return {
    type: types.REMOVE_BOARD,
    boardId
  }
}

export function editBoard(board){
  return {
    type: types.EDIT_BOARD,
    board
  }
}

/*
 * Lists
 */
export function addList(list){
  return {
    type: types.ADD_LIST,
    list
  }
}

export function removeList(listId){
  return {
    type: types.REMOVE_LIST,
    listId
  }
}

export function editist(list){
  return {
    type: types.EDIT_LIST,
    list
  }
}

/*
 * Cards
 */
export function addCard(card){
  return {
    type: types.ADD_CARD,
    card
  }
}

export function removeCard(cardId){
  return {
    type: types.REMOVE_CARD,
    cardId
  }
}

export function editCard(card){
  return {
    type: types.EDIT_CARD,
    card
  }
}

export function moveCard(card){
  return {
    type: types.MOVE_CARD,
    cardId,
    listId,
    position
  }
}
