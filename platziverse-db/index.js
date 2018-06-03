'use strict'

/** Al ser una función async cada vez que la utilice me devuelve una promesa */
module.exports = async function (config) {
  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
