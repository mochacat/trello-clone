export const boards = [
  {
    _id : 1,
    title: 'Trello Project',
    description : 'keeping track of redux',
    pinned: true
  },
  {
    _id: 2,
    title: 'Social Good',
    description : 'problems I need to solve',
    pinned: false
  },
  {
    _id: 3,
    title: 'Chores',
    description : 'weekly chore list',
    pinned: false
  },
  {
    _id: 4,
    title: 'Meetings',
    description : 'meetings I have or will attend',
    pinned: false
  }
]

export const lists = [
  {
    _id: 1,
    _board: 1,
    title: 'Todo'
  },
  {
    _id: 2,
    _board: 1,
    title: 'Doing'
  },
  {
    _id: 3,
    _board: 1,
    title: 'Done'
  },
  {
    _id: 4,
    _board: 2,
    title: 'Disability Advocacy'
  },
  {
    _id: 5,
    _board: 2,
    title: 'Volunteering'
  }
]

export const cards = [
  {
    _id: 1,
    _list: 1,
    title: 'CSS styling',
    description: 'making style decisins'
  },
  {
    _id: 2,
    _list: 1,
    title: 'Build API for calls to db',
    description: 'should I use hackable or kube'
  },
  {
    _id: 3,
    _list: 1,
    title: 'Build React Components',
    description: 'build lists, boards, '
  },
  {
    _id: 4,
    _list: 1,
    title: 'Build Login page',
    description: 'make sure user is authenticated, otherwise create account'
  },
  {
    _id: 5,
    _list: 2,
    title: 'Writing the Actions and Reducers',
    description: 'Taking care of the state before React Components'
  }
]
