'use strict'

const user = {
  username: 'marianna.daugherty',
  firstName: 'Marianna',
  lastName: 'Daugherty',
  fullName: 'Marianna Daugherty',
  preferredCurrency: 'eur'
}

const users = [
  { ...user, id: 1 },
  {
    id: 2,
    username: 'madalyn.lowe',
    firstName: 'Madalyn',
    lastName: 'Lowe',
    fullName: 'Madalyn Lowe',
    preferredCurrency: 'usd'
  }
]

module.exports = {
  user,
  single: [...users][0],
  all: [...users],
  byId: (id) => users.filter((u) => u.id === id).shift()
}
