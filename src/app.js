const express = require('express');
const morgan = require('morgan');

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extends: false }));
app.use(express.json());

//routes

//starting the server
app.listen(app.get('port'), () =>{
  console.log(`Server on port ${app.get('port')}`);
})