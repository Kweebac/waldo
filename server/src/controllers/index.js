const { body } = require("express-validator");
const Game = require("../models/Game");

let startTime;

async function getCharacters(req, res) {
  const { gameId } = req.params;

  const game = await Game.findOne({ name: gameId }, "characters").exec();
  const characters = game.characters.sort((a, b) => a.name.localeCompare(b.name));

  startTime = Date.now();
  res.json(characters);
}

function getTimeTaken(req, res) {
  res.json(Date.now() - startTime);
}

async function getTimes(req, res) {
  const { gameId } = req.params;

  const track = await Game.findOne({ name: gameId }, "times").exec();
  if (track === null) res.json(undefined);

  const limitedTimes = [];
  for (let i = 0; i < track.times.length && i < 10; i++) {
    limitedTimes.push(track.times[i]);
  }
  const sortedLimitedTimes = limitedTimes.sort((a, b) => a.time - b.time);

  res.json(sortedLimitedTimes);
}

const postTime = [
  body("username").escape().trim(),
  async (req, res) => {
    const { gameId } = req.params;
    const { username, time } = req.body;

    const track = await Game.findOne({ name: gameId }, "times").exec();
    track.times.push({
      username,
      time,
    });
    await track.save();

    res.end();
  },
];

module.exports = {
  getCharacters,
  getTimes,
  postTime,
  getTimeTaken,
};
