'use strict'

const deliveredCargoModel = new deliveredCargo() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#deliveredCargo-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const deliveredCargoData = {}
    formData.forEach((value, key) => {
        deliveredCargoData[key] = value
    })

    deliveredCargoModel.Create(deliveredCargoData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#deliveredCargo-list').DataTable({
    data: deliveredCargoModel.Select(),
    columns: [
      { title: 'Id', data: 'id'},
      { title: 'Cargo', data: 'cargo' },
      { title: 'SpaceStation', data: 'spaceStation' },
      {data: null, defaultContent:"<button class='edit-btn'>Edit</button>"},
      {data: null, defaultContent:"<button class='delete-btn'>Delete</button>"}
    ]
  })
}

function initListEvents () {
  const dataTable = window.jQuery('#deliveredCargo-list').DataTable()
  document.addEventListener('deliveredCargoesListDataChanged', function (e) {
    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
  $('#deliveredCargo-list tbody').on('click','.edit-btn',function(e){
    e.preventDefault()
    const data =dataTable.row($(this).parents('tr')).data();   
    localStorage.setItem('editedItemId',data.id)
    document.getElementById('cargo').value = data.cargo;
    document.getElementById('spaceStation').value = data.spaceStation;

  });

  $('#deliveredCargo-list tbody').on('click','.delete-btn',function(e){
   e.preventDefault()
   const data =dataTable.row($(this).parents('tr')).data()
   deliveredCargoModel.Delete(data)
    
  });
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})