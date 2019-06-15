
let data = []
var list = document.querySelector('#list')

document.getElementById('search').onkeyup = function search(e) { 
  list.innerHTML = ''
  var txt = new RegExp(e.target.value)
  // db.find({ $or: [{ data: /e.target.value/ }, { title: /e.target.value/ }] }, function (err, docs) {
  db.find({ $or: [ { title: txt }, { text: txt } ] }).sort({ 'updatedAt': -1 }).exec(function (err, docs) {
    // docs contains Earth and Mars
    docs.map(doc => loadDoc(doc))
   return data = docs
  });
}


function sort(args) {
  document.querySelector('#list').classList = args + '-items'
}

 function remove(_id) {
  db.remove({_id})
  return renderFiles()
}

function addItem(e) {
  db.insert({ title: 'ملف جديد', data: "" }, function(err, doc) { 
   return renderFiles()
  })
}

function changeFileName(e) {
  var selector = '#title-'+e
  var title = document.querySelector(selector)
  title.contentEditable = true // title 
  title.onkeypress = function(key) {
    if (key.code === 'Enter' && title.innerText.trim() !== '') {
      title.innerHTML = title.innerText.trim()
      title.contentEditable = false
      update(e, { title: title.innerText.trim() })
    }
  }
}

function update(_id, args) {
  db.findOne({_id}, function (err, oldDoc) {
    var newDoc = Object.assign(oldDoc, args)
    db.update({ _id }, newDoc)
  })
}

function loadDoc(doc) {
  var item = document.createElement('div')
    item.classList = 'content item'
    item.id = doc._id
    item.innerHTML = `
        <a href='./editor.html?${doc._id}' target="_blank">
          <div class="file-icon file-icon-lg" data-type="ملف"></div>
        </a>
        <div class="item-content">
          <div class='item-title' id='title-${doc._id}' ondblclick="changeFileName('${doc._id}')">${doc.title}</div>
          <div class="content-hidden" hidden>${doc.data}</div>
          <small> اخر تعديل  ${moment(doc.updatedAt).fromNow()}</small>
          <i class="icon ion-md-trash item-icon" onclick="remove('${doc._id}')"></i>
        </div>
      `
      list.append(item)
      // document.getElementById(doc._id).scrollIntoView()
}


function renderFiles() {
  list.innerHTML = ''
  db.find({}).sort({ 'updatedAt': -1 }).exec(function (err, docs) {
    docs.map(doc => loadDoc(doc))
   return data = docs
  })
}

(function(){
  // on loadded
  renderFiles()
})()