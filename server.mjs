import express from "express";

import pkg from "./Services/mongo_service.js";

const app = express();
const port = 3000;

const { getPlayerData } = pkg

app.get('/', (req, res) => {
  let result = getPlayerData("Clad Ironside")
  res.send(result);

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});