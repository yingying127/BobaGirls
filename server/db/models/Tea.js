const Sequelize = require('sequelize')
const db = require('../db')

const Tea = db.define('tea', {
  teaname: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://www.organicauthority.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU5MzI5NzQ1OTk2MDMxNTg0/shutterstock_239013112.jpg'
  },
  description: {
    type: Sequelize.TEXT
  },
  preparation: {
    type: Sequelize.TEXT
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  servings: {
    type: Sequelize.INTEGER
  }
})

module.exports = Tea