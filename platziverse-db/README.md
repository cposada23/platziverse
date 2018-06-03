# platziverse-db


## Usage

``` js
const setupDatabase = require('platziverse-db')

setupDatabase(config).then(db => {
    const {Agent, Metric} = db
}).cathc(err => console.error(err))




```