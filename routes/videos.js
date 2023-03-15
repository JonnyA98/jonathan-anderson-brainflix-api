const express = require("express");
const fs = require("fs");
const router = express.Router();
const { v4: uuid } = require("uuid");

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

router.post("/", (req, res) => {
  const { title, channel, description, image, duration } = req.body;
  const newVideo = {
    id: uuid(),
    title: title,
    channel: channel,
    description: description,
    imgage: image,
    views: 0,
    likes: 0,
    duration: duration,
    timestamp: new Date().getTime(),
  };

  fs.readFile("./data/videos.json", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Could not read videos from JSON file",
      });
    }
    const videos = JSON.parse(data);
    videos.push(newVideo);

    fs.writeFile("./data/videos.json", JSON.stringify(videos), (err) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "Could not write videos to JSON file",
        });
      }
    });
  });
  res.status(201).json(newVideo);
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
