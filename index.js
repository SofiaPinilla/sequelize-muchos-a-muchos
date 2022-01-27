const express = require('express');
const app = express()
const PORT = 3000;

app.use(express.json())

app.use('/books',require('./routes/books'))
app.use('/genres',require('./routes/genres'))
app.use('/users',require('./routes/users'))

app.listen(PORT, ()=> console.log('servidor levantado en el puerto' +PORT))