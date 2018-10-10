const { PORT } = require("./.env");
const server = require("./config/server");
const routes = require("./config/routes");
require("./config/database");
routes(server);

server.listen(PORT, () => {
  console.log("running on port " + PORT);
});
