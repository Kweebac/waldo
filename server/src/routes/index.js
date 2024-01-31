const { getCharacters } = require("../controllers");

const router = require("express").Router();

router.get("/characters/:gameId", getCharacters);

module.exports = router;
