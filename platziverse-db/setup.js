'use strict'
const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

// createPromptModule
const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt({
    type: 'confirm',
    name: 'setup',
    message: 'Esto va a borrar la base de datos ¿está seguro?'
  })

  if (!answer.setup) {
    return console.log('No se borró la base de datos XD')
  }
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'root',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }
  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`{$chalk.red([fatal error])} {$err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
