
const morgan = require('morgan');

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));





require('./app/routes.js')(app);
app.use(express.static(path.join(__dirname, './dist')));


app.get('*', (req, res) => {
  console.log('cualquier');
  res.sendFile(path.join(__dirname, './dist', 'index.html'));


});


app.listen(app.get('port'), () => {
  console.log('este es el backend en server on port ', app.get('port'));
});
