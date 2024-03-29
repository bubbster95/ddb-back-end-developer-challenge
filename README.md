# Dungeons & Data

### Overview
This task focuses on creating an API for managing a player character's Hit Points (HP) within our game. The API will enable clients to perform various operations related to HP, including dealing damage of different types, considering character resistances and immunities, healing, and adding temporary Hit Points. The task requires building a service that interacts with HP data provided in the `briv.json` file and persists throughout the application's lifetime.

Thank you for taking the time to look through my API. This README should help you get started and navigate the app. I sincerely hope you like what I have built. 

What you see here is just an MVP. There is plenty to do that would make this API better.

### Future Features
* Better Error handling/validation.
* Tighten security in the DB by adding read/write rules.
* Implement a UI to make viewing/editing data better.
* Better coverage on the testing suite.
* Create a more scalable file structure.
* Modify the requests to use POST and pass variables in body rather than query strings.

### Download and Initialize

1) Open your teminal and navigate to the location where your app folder will be kept using `cd`.
2) Clone the git repo onto your local machine.

        git clone https://github.com/bubbster95/ddb-back-end-developer-challenge.git 

3) Be sure to change directories into the repo you just cloned.

        cd ddb-back-end-developer-challenge

4) Install project dependencies from Node:

        npm install

5) Create an ENV file.

   <b>On Mac:<b/>

                touch .env
   

   <b>On Windows:</b> Open the project in your code editor of choice. In the root folder, create a new file and name it `.env`

7) Add the following env variable to .env.

        ATLAS_URI = mongodb+srv://<username>:<password>@playerinfo.kumbnxf.mongodb.net/

8) Replace `<username>` and `<password>` with your guest username and password. [Contact Will Stiles](maito:Stiles.billy@gmail.com) if you do not have this yet.

9) Once completed the project should be ready to run. Great work! 

### Running the API
The API runs locally on `nodemon` so any file changes will trigger an auto reload of the server. This makes running the local server super easy.

To start the app simply run.

        npm start

Once running you can go to [localhost:3000](http://localhost:3000/), where you will see information about our test user "Clad Ironside".

### Testing the API
Testing the app can be tedious with just a url to work with. So I implimented Jest to test the CRUD functions ensuring they work as expected. Before each test the user "Clad Ironside" has his HP tempHP and maxHp set to an appropriate configuration. The test is then run on the live database and the results are checked for accuracy.

To use the test suite run

        npm test

### Using the API
For the sake of simplicity, I used `GET` requests for all of the endpoints in this API. I wanted to focus on the backend and felt as if building a UI was out of scope. Adittionally I wanted to spare the Code reviewrs the trouble of setting up post requests in a software like `Postman`. 

That being said, if I were to create this for a `production ENV` I would use `POST` for all endpoints. I would then send the data thogh the body. This is a much more secure way of sending data to the API. 

Instead query strings are used to pass parameters, the most important being id, which lets the client select a player character and view/update their data.

### Endpoints

#### Heal
- Enables clients to heal a player character, increasing their HP.

        Path: "/heal"
        Query Strings: id, amount
Example: http://localhost:3000/heal?id=6603a9f7e36a813ffb594ffd&amount=2

---

#### Add Temporary Hit Points
- Implemented the functionality to add temporary Hit Points to a player character.
- Temporary Hit Points follow the rules: they are not additive, always taking the higher value, and cannot be healed.

> Imagine a player character named "Eldric" currently has 11 Hit Points (HP) and no temporary Hit Points. He finds a magical item that grants him an additional 10 HP during the next fight. When the attacker rolls a 19, Eldric will lose all 10 temporary Hit Points and 9 from his player HP.

        Path: "/addTempHP"
        Query Strings:  id, amount
Example: http://localhost:3000/addTempHP?id=6603a9f7e36a813ffb594ffd&amount=2

---

#### Deal Damage
- Implementd the ability for clients to deal damage of different types (e.g., bludgeoning, fire) to a player character.
- The API calculates damage while considering character resistances and immunities.

> Suppose a player character is hit by an attack that deals Piercing damage, and the attacker rolls a 14 on the damage's Hit Die (with a Piercing damage type). `[Character Hit Points - damage: 25 - 14 = 11]`

        Path: "/damage"
        Query Strings: id, amount, type
* Example: http://localhost:3000/damage?id=6603a9f7e36a813ffb594ffd&amount=2&type=slashing

`Note: Damage type can be left blank. The default, no damage type, guarantees damage is done regardless of immunity or resistance status`

---

#### Possible Damage Types in D&D
Here is a list of possible damage types that can occur in Dungeons & Dragons (D&D). These damage types should be considered when dealing damage or implementing character resistances and immunities:
- Bludgeoning
- Piercing
- Slashing
- Fire
- Cold
- Acid
- Thunder
- Lightning
- Poison
- Radiant
- Necrotic
- Psychic
- Force

---
Bonus Endpoints

There are two other endpoints that I left in for ease of testing. 

The first is simply the home page (/). Include an id in the query string to view a specific player character's data. If left blank the default data is our test user "Clad Ironside".

The second endpoint (/delete) is a little more serious (which is why it is commented out). If passed an id it will permanently delete that player character from the database.

### Final Remarks

Thanks again for taking the time to review my code. Though the API is far from perfect, I hope you consider me a qualified candidate. I'm eager and ready to code and learn as part of your team! 
