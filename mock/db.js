// db.js
var Mock = require('mockjs');

module.exports = {
  getComment: Mock.mock({
    "status": 0,
    "message": "success",
    "data|40": [{
      "author": "@name",
      "comment": "@cparagraph",
      "date": "@datetime"
    }]
  }),
  getList: Mock.mock({
    "status": 0,
    "message": "success",
    "list|10": [{
      "id|+1": 20,
      "name": "@name",
      "age|1-100": 100,
      "comment": "@cparagraph",
      "date": "@datetime"
    }]
  }),
  addComment: Mock.mock({
    "status": 0,
    "message": "success",
    "data": [
      {"id":110, "name" : "lily1", "age" : 21},
      {"id":111, "name" : "lily2", "age" : 22},
      {"id":111, "name" : "lily3", "age" : 23}
    ]
  })
};