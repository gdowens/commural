derby = require 'derby'

app = module.exports = derby.createApp 'commural', __filename


app.use require 'derby-router'
app.use require 'derby-debug'
app.serverUse module, 'derby-jade'
app.serverUse module, 'derby-stylus'

app.loadViews __dirname + '/views'
app.loadStyles __dirname + '/styles'

app.get 'home', '/'

