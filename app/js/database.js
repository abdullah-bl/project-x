

var DataStore = require('nedb')
var { getPath } = require('electron').remote.require('electron').app

const path =  getPath('appData') + '/docs-app/database/data.db'

var db = new DataStore({ filename: path, autoload: true, timestampData: true })

