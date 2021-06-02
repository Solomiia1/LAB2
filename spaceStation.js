'use strict'

const spaceStationModel = new spaceStation() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#spaceStation-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const spaceStationData = {}
    formData.forEach((value, key) => {
        spaceStationData[key] = value
    })

    spaceStationModel.Create(spaceStationData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#spaceStation-list').DataTable({
    data: spaceStationModel.Select(),
    columns: [
      { title: 'Number', data: 'number' },
      { title: 'Capacity', data: 'capacity' },
      { title: 'Need', data: 'need' },
      { title: 'Planet', data: 'planet' },
      {data: null, defaultContent:"<button class='edit-btn'>Edit</button>"},
      {data: null, defaultContent:"<button class='delete-btn'>Delete</button>"}
    ]
  })
}

function initListEvents () {
  const dataTable = window.jQuery('#spaceStation-list').DataTable()

  document.addEventListener('spaceStationsListDataChanged', function (e) {
    
    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
  $('#spaceStation-list tbody').on('click','.edit-btn',function(e){
    e.preventDefault()
    const data =dataTable.row($(this).parents('tr')).data();
    
    document.getElementById('number').value = data.number;
    document.getElementById('capacity').value = data.capacity;
    document.getElementById('need').value = data.need;
    document.getElementById('planet').value = data.planet;

    localStorage.setItem('editedItemId',data.id)
   
  });

  $('#spaceStation-list tbody').on('click','.delete-btn',function(e){
    e.preventDefault()
   const data =dataTable.row($(this).parents('tr')).data()
   spaceStationModel.Delete(data)
    
  });
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})