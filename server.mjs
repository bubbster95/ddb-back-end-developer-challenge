import runMongoDb from "./src/endpoints/mongoService.mjs";

import "./environment.mjs";

import app from "./app.mjs"
const port = 3000;

try {

  runMongoDb().catch(console.dir)

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

} catch(e) {
  res.status(500).json({ error: 'Internal Server Error' });
}
