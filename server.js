const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
  response.render('pages/index', { title: 'Home' })
})
app.get('/planet', function (request, response) {
  response.render('pages/planet', { title: 'Planet' })
})
app.get('/cargo', function (request, response) {
  response.render('pages/cargo', { title: 'Cargo' })
})
app.get('/spaceStation', function (request, response) {
  response.render('pages/spaceStation', { title: 'SpaceStation' })
})
app.get('/deliveredCargo', function (request, response) {
  response.render('pages/deliveredCargo', { title: 'DeliveredCargo' })
})

// запускаємо аплікацію
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
  console.log('Server started on port '+app.get('port'));
});