'use strict'

const test = require('ava')

/**Yo no quiero que esto haga una configuracion real a la base de datos -- */
let db

let config = {
  logging: function () { }
}

test.beforeEach(async () => {
  const setupDataBase = require('../')
  db = await setupDataBase(config)
})


test('make it pass', t => {
  t.pass()
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service should exist')
})