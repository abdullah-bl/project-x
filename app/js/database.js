var DataStore = require('nedb')
var { getPath } = require('electron').remote.require('electron').app

const path =  getPath('documents') + '/docs-app/database/data.db'

var db = new DataStore({ filename: path, autoload: true, timestampData: true })
var data = []

function search(args) {
  db.find(args)
  .sort({ 'updatedAt': -1 })
  .exec(function (err, docs) {
   return data = docs
  })
}

function get() {
  db.find({})
    .sort({ 'updatedAt': -1 })
    .exec(function (err, docs) {
    return data = docs
  })
}

function save(args) {

}

function update(_id, args) {
  db.findOne({_id}, function (err, oldDoc) {
    var newDoc = Object.assign(oldDoc, args)
    db.update({ _id }, newDoc)
  })
  return get()
}

function remove() {

}


(function() {
  get()
})()