const { getCharacters, getTimes, postTime, getTimeTaken } = require("../controllers");

const router = require("express").Router();

router.get("/:gameId/characters", getCharacters);
router.get("/:gameId/times", getTimes);
router.post("/:gameId/time", postTime);

router.get("/timeTaken", getTimeTaken);

module.exports = router;
