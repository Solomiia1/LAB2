'use strict'

const cargoModel = new Cargo() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#cargo-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const cargoData = {}
    formData.forEach((value, key) => {
        cargoData[key] = value
    })

    cargoModel.Create(cargoData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#cargo-list').DataTable({
    data: cargoModel.Select(),
    columns: [
      { title: 'Name', data: 'name' },
      { title: 'Code', data: 'code' },
      { title: 'Weight', data: 'weight' },
      {data: null, defaultContent:"<button class='edit-btn'>Edit</button>"},
      {data: null, defaultContent:"<button class='delete-btn'>Delete</button>"}
    ]
  })
}

function initListEvents () {
  const dataTable = window.jQuery('#cargo-list').DataTable()
  document.addEventListener('cargoesListDataChanged', function (e) {
    

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
  $('#cargo-list tbody').on('click','.edit-btn',function(e){
    e.preventDefault()
    const data =dataTable.row($(this).parents('tr')).data();
   
    document.getElementById('name').value = data.name;
    document.getElementById('code').value = data.code;
    document.getElementById('weight').value = data.weight;

    localStorage.setItem('editedItemId',data.id)
   
    

  });

  $('#cargo-list tbody').on('click','.delete-btn',function (e) {
    e.preventDefault();

   const data =dataTable.row($(this).parents('tr')).data()
   cargoModel.Delete(data)
    
  });
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})