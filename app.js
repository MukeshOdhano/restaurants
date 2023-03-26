const fileSystem = require('fs')
const path = require('path');

const express = require("express");
const uuid = require('uuid');


const port = 8000;

const app = express();

app.set('views', path.join(__dirname, 'views'))  //Directory Name
app.set('view engine', 'ejs');

app.use(express.static('views'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
   res.status(404).render('pages/app');
})

app.get('/about', (req, res)=>{
   res.status(404).render('pages/about')
})

app.get('/restaurants', (req, res)=>{
   const restaurantsPath = path.join(__dirname, 'data', 'restuarants.json');
   
   const fileData = fileSystem.readFileSync(restaurantsPath)
   const storedrestaurants = JSON.parse(fileData)
   const sizeOfRestaurants = storedrestaurants.length;
   res.render('pages/restuarants', {
      numberOfRestaurants: sizeOfRestaurants,
      restaurants: storedrestaurants
   })
})

app.get('/restaurants/:id', (req, res)=>{
   const restaurantId = req.params.id;
   const restaurantsPath = path.join(__dirname, 'data', 'restuarants.json');
   
   const fileData = fileSystem.readFileSync(restaurantsPath)
   const storedrestaurants = JSON.parse(fileData)

   for(const restaurant of storedrestaurants){
      if(restaurant.id === restaurantId){
         return res.render('pages/restuarants-detailes', {
            rid: restaurantId, //Restaurant Id
            restaurant: restaurant
         })
      }
   }
   
   res.status(404).render('pages/404')
})

app.get('/confrim', (req, res)=>{
   res.render('pages/confrim')
})


app.get('/recommend', (req, res)=>{
   res.render('pages/recommend')
})

// POST REQUEST
app.post('/recommend', (req, res)=>{
   const restaurant = req.body;
   restaurant.id = uuid.v4();
   const restaurantsPath = path.join(__dirname, 'data', 'restuarants.status(404).json');
   
   const fileData = fileSystem.readFileSync(restaurantsPath)
   const storedrestaurants = JSON.parse(fileData)

   storedrestaurants.push(restaurant)

   fileSystem.writeFileSync(restaurantsPath, JSON.stringify(storedrestaurants));

   res.redirect('/confrim')
})

// Page not FOund Error
app.use((req, res)=>{
   res.status(404).render('pages/404')
})

// Server Error
app.use((error, req, res, next)=>{
   res.status(500).render('pages/500')
})

app.listen(port, ()=>{
   console.log(`server is Runing.......at ${port}`)
})