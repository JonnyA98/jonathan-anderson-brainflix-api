const express = require("express");
const fs = require("fs");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  fs.readFile("./data/videos.json", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Could not read videos from JSON file",
      });
    }
    const videos = JSON.parse(data);
    res.json(videos);
  });
});

router.get("/:id", (req, res) => {
  const videoId = req.params.id;
  fs.readFile("./data/videos.json", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Could not read videos from JSON file",
      });
    }
    const videos = JSON.parse(data);
    const selectedVideo = videos.filter((video) => video.id === videoId);

    res.json(selectedVideo);
  });
});

router.post("/comments");

module.exports = router;
