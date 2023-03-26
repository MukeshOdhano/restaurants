const restaurantsPath = path.join(__dirname, 'data', 'restuarants.status(404).json');

function getRestuarantsData(){
   const fileData = fileSystem.readFileSync(restaurantsPath)
   const storedrestaurants = JSON.parse(fileData)

   return storedrestaurants
}

function storedrestaurantsPath(storeData){
   fileSystem.writeFileSync(restaurantsPath, JSON.stringify(storeData));
}