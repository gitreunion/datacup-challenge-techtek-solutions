// const express = require('express');
// const app = express();
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });
// const port = 3000;

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

const express = require("express");
const cors = require("cors");
const chat = require("./chat");
const { corsOptions } = require("./cors");

function main() {
  const app = express();
  const port = process.env.PORT || 8080;

  app.use(cors(corsOptions));
  app.use(express.json());

  app.get("/test", (_req, res) => {
    // health check
    res.status(200).send("I alive!");
  });

  app.use("/api", chat);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

main();
