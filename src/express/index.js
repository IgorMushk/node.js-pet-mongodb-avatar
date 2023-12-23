const express = require("express");
var cookieParser = require('cookie-parser')

const assignRequestId = require("./middlewares/assignRequestId");
const getLogger = require("./middlewares/logger");
const handleError = require("./middlewares/handleerror");

const routers = require("./routes");
const setupMongoConnection = require("../modules/common/utils/setupMongoConnection");

const app = express();
app.use(express.json());
// x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(assignRequestId);

app.use(getLogger());

//app.use('/animals',  router);
app.use(routers);
//app.use('/api/v1',routers);

app.get("/health", (req, res) => {
  res.setHeader("x-request-id", req.id);
  res.json({ status: 200, message: "Server is running" });
});

app.use(handleError);

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// - 1 - 
// const PORT = 3000;
// app.listen(PORT, async () => {
//   await setupMongoConnection();
//   console.log(`Server is running on port ${PORT}`);
// });
// - 2 - 
const PORT = 3000;
setupMongoConnection().then(() =>
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}),
);

