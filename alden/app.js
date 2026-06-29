const express = require('express');
const path = require('node:path');
const vendorRoutes = require('./routes/vendor');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', vendorRoutes);
app.get('/', (req, res) => res.redirect('/vendor-dashboard'));

const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Vendor dashboard listening on port ${port}`);
  });
}

module.exports = { app };
