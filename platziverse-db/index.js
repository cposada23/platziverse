'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

const defaults = require('defaults') // Para crear la configuración por defecto

/** Al ser una función async cada vez que la utilice me devuelve una promesa */
module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000 // Si en la conección no pasa nada en 10 segundos la saca del pool de conecciones
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({force: true})
  }

  sequelize.sync()

  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
