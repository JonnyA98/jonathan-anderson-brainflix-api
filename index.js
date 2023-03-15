const express = require("express");
const app = express();
const videos = require("./routes/videos");
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use("/videos", videos);

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
