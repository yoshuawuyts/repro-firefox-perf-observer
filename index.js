var css = require('sheetify')
var choo = require('choo')
var onperformance = require('on-performance')

console.log('wait a bit, then call performance.mark()')

onperformance((entry) => console.log('entry', entry.name))

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(require('./stores/clicks'))

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app
