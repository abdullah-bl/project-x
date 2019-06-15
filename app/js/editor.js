
var doc = {}

function autoSave() {
  console.log('called')
  var text = document.querySelector('#editor').innerText.trim()
  var newDoc = Object.assign(doc, { data: editor.getData(), text })
  alert('تم الحفظ بنجاح')
  return db.update({_id: doc._id}, newDoc)
}

document.querySelector('#save').onclick = autoSave
// window.onbeforeunload = autoSave

function loadEditor() {
  var config = {
    language: 'ar',
    removePlugins: ["MediaEmbed", "Link", "ImageUpload", "ImageToolbar"],
    extraPlugins: [],
    placeholder: 'اكتب ...',
  }
  
  DecoupledEditor.create( 
    document.querySelector( '#editor' ), config 
    // {
    // removePlugins: ["MediaEmbed", "Link", "ImageUpload", "ImageToolbar"],
    // // extraPlugins: [PrintPlugin],
    // // fontFamily: {
    // //   options: [
    // //     'default',
    // //     'Arial, Helvetica, sans-serif',
    // //     'Courier New, Courier, monospace',
    // //     'Georgia, serif',
    // //     'Lucida Sans Unicode, Lucida Grande, sans-serif',
    // //     'Tahoma, Geneva, sans-serif',
    // //     'Times New Roman, Times, serif',
    // //     'Trebuchet MS, Helvetica, sans-serif',
    // //     'Verdana, Geneva, sans-serif'
    // //   ]
    // // },
    // fontSize: {
    //   options: [14,16,18,20,22,24,26,28,30]
    // },
    // language: 'ar',
    // placeholder: 'اكتب ...',
    // autoSave: {
    //   save() {
    //     return autoSave()
    //   }
    // }
  ).then( editor => {
      const toolbarContainer = document.querySelector( 'main .toolbar-container' );
      toolbarContainer.prepend( editor.ui.view.toolbar.element );
      editor.setData(doc.data)
      window.editor = editor
  }).catch( err => console.log(err))
}




(function() {

  db.findOne({ _id: location.search.slice(1) }, {}, function(err, oldDoc){
    if (err) return window.close()

    document.querySelector('title').innerText = oldDoc.title
    doc = oldDoc
    loadEditor()
  })

})()
