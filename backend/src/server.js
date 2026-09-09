const app = require("./app");
const env = require("./config/env");

app.listen(env.port, () => {
  console.log(
    `KaushalVerse backend running at http://localhost:${env.port}`
  );
});