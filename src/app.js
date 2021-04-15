const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))


const app = express();
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('/help', (req, res) =>{
    res.render('help', {
        message: 'The past 3 months were tough! I\'m happy to have gained so many useful insights ' +
            'and techniques about Build Wireframes and ' +
            'Low-Fidelity Prototypes and to already have' +
            ' applied some of them in my work and projects. ' +
            'It\'s a course I suggest to everyone. The journey' +
            ' has just begun and I feel it\'s going to positively ' +
            'impact many aspects of my life.',
        title:'Help',
        name:'Sulaiman Danmallan',
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title:'About Me',
        name:'Slaiman Danmallan',
    })
})


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sulaiman Danmallan',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address is required'
        })

    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})
app.get('/products', ((req, res) => {
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
}))
app.get('/help/*', (req, res)=>{
    res.render('error404', {
        title:'404',
        error_msg : 'Help article not found',
        name:'Sulaiman Danmallan'
    })
})
app.get('*', (req,res)=>{
    res.render('error404', {
        title:'404',
        error_msg : 'Page not found',
        name: 'Sulaiman Danmallan'})
})

app.listen(port, () => {
    console.log('Server started on port' + port)
})