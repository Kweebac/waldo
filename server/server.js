const express = require("express");
const app = express();
const cors = require("cors");
const indexRouter = require("./src/routes/index");

require("./mongoose.config");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
app.use("/api", indexRouter);

app.listen(process.env.PORT || 3000, "0.0.0.0");
