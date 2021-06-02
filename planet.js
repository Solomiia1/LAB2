'use strict'

const planetModel = new Planet() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#planet-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const planetData = {}
    formData.forEach((value, key) => {
        planetData[key] = value
    })

    planetModel.Create(planetData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#planet-list').DataTable({
    data: planetModel.Select(),
    columns: [
      { title: 'Name', data: 'name' },
      { title: 'Capacity', data: 'capacity' },
      { title: 'Mass', data: 'mass' },
      {data: null, defaultContent:"<button class='edit-btn'>Edit</button>"},
      {data: null, defaultContent:"<button class='delete-btn'>Delete</button>"}
    ]
  })
  
}

function initListEvents () {
  const dataTable = window.jQuery('#planet-list').DataTable();
  document.addEventListener('planetsListDataChanged', function (e) {
   
    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
  
  
  $('#planet-list tbody').on('click','.edit-btn',function(e){
    e.preventDefault()
    const data =dataTable.row($(this).parents('tr')).data();
   
    document.getElementById('name').value = data.name;
    document.getElementById('capacity').value = data.capacity;
    document.getElementById('mass').value = data.mass;

    localStorage.setItem('editedItemId',data.id)
   
    

  });

  $('#planet-list tbody').on('click','.delete-btn',function(e){
    e.preventDefault()
   const data =dataTable.row($(this).parents('tr')).data()
    planetModel.Delete(data)
    
  });
}


window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})