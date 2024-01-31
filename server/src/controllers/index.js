const Game = require("../models/Game");

async function getCharacters(req, res) {
  const { gameId } = req.params;

  const game = await Game.findOne({ name: gameId }, "characters").exec();
  const characters = game.characters.sort((a, b) => a.name.localeCompare(b.name));

  res.json(characters);
}

module.exports = {
  getCharacters,
};
