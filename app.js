const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRoute = require('./routes/index');
const vendorRoute = require('./routes/vendor');

app.use('/', indexRoute);
app.use('/vendor', vendorRoute);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
