# Dungeons & Data

Thank you for taking the time to look through my api. This README should help you get started and navigate the app. I sincerely hope you like what I have built. 

What you see here is just an mvp. There is plenty to do that would make this api better.

## Future Features
* Better Error handeling/validation
* Tighten security in the DB by adding read/write rules
* Impliment a UI to make viewing/editing data better
* Better coverage on the testing suite.
* Create a more scalable file structure
* Modify the requests to use POST and pass variables in body rather than query strings

## Download and Initialize

1) CD into the folder where you want to store the app.
2) run 

        $git clone https://github.com/bubbster95/ddb-back-end-developer-challenge.git 

3) run

        $npm install

4) Create an ENV file

        touch .env

5) Add the following env variable to .env

        ATLAS_URI = mongodb+srv://guestUser:<password>@playerinfo.kumbnxf.mongodb.net/

6) "password" and the surrounding < and > symbols will need to be replaced. Will Stiles will provide the password for the sake of testing.

7) Once completed the project should be ready to run. Great work! 

## Running The API
The api runs locally on nodemon so any file chnages will trigger an auto reload of the server. This makes running the local surver super easy.

To start the app simply run

        $npm start

Once running you can go to [local Host](http://localhost:3000/), where you will see information about our test user "Clad Ironside"

## Testing The API
Testing the app can be tedious with just a url to work with. So I created a test suite to test the crud functions to ensure they work as expected. 

To use the test suite run

        $npm test

## Using The API
For simplicity sake I stuck to only GET requests for this api. 

Each endpoint uses query strings to pass parameters, the most important being id, which lets the client select the player whos' data will be edited.

### Endpoints

#### Heal
This endpoint lets the client heal a user

* Path: "/heal"
* Query Strings: 
  * id
  * healAmount
* Example: http://localhost:3000/heal?id=6603a9f7e36a813ffb594ffd&healAmount=2

#### Add Temporary Hit Points
This endpoint allows the client add temporary hit points to a player. These Hit points are used first when taking damage and can not be healed.

* Path: "/addTempHitPts"
* Query Strings: 
  * id
  * tempHPAmount
* Example: http://localhost:3000/addTempHitPts?id=6603a9f7e36a813ffb594ffd&tempHPAmount=2


#### Deal Damage
This endpoint allows the client deal damage to a player. This takes damage type into account. When a player is immune to the specified damage type they take no damage. When the player has resistance to the damage type they take half damage (rounded for odd numbers).

* Path: "/damage"
* Query Strings: 
  * id
  * dmgAmount
  * dmgType
* Example: http://localhost:3000/damage?id=6603a9f7e36a813ffb594ffd&dmgAmount=2&dmgType=slashing

Note: Damage type can be left blank

---
Bonus Endpoints

There are two other endpoints that I left in for ease of testing that would need to be disabled in production. 

The first is simply the home page (/). Included an id in the query string to view specific player data. If left blank the default data is our main man "Clad Ironside"

The second endpoint (/delete) is a little more serious. If passed an id it will permanently delete that player from the database.


## Final Remarks

Thanks again for taking the time to review my code. Though the API is far from perfect, I hope you consider me  a qualified candidate. I'm eager and ready to code and learn as part of your team! 

Thanks,

-Will Stiles