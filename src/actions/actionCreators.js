/*
 * Boards
 */

export function togglePin(boardId) {
  return {
    type: 'TOGGLE_PIN',
    boardId
  }
}

export function addBoard(board){
  return {
    type: 'ADD_BOARD',
    board
  }
}

export function removeBoard(boardId){
  return {
    type: 'REMOVE_BOARD',
    boardId
  }
}

export function editBoard(board){
  return {
    type: 'EDIT_BOARD',
    board
  }
}

/*
 * Lists
 */
export function addList(list){
  return {
    type: 'ADD_LIST',
    list
  }
}

export function removeList(listId){
  return {
    type: 'REMOVE_LIST',
    listId
  }
}

export function editist(list){
  return {
    type: 'EDIT_LIST',
    list
  }
}