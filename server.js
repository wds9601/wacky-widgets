const express = require('express');
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts')
let db = require('./models')

const app = express();

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));


// WRITE YOUR ROUTES HERE /////////////////////
app.get('/', (req, res) => {
    db.widget.findAll()
    .then(widgets => {
        res.render('home', { widgets })
    })
})

app.post('/', (req, res) => {
    db.widget.create({
        description: req.body.description,
        quantity: req.body.quantity
    })
    .then(widgets => {
        res.redirect('/')
    })
    .catch(error => {
        console.log('ERROR', error)
    })
})

app.delete('/', (req, res) => {
    db.widget.destroy({
        where: { id: req.body.widgetId}
    })
    .then(
        res.redirect('/')
    )
    .catch(error => {
        console.log('ERROR', error)
    })
})
// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(process.env.PORT || 3000);
