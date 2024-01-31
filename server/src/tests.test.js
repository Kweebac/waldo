const indexRouter = require("./routes/index");
const express = require("express");
const app = express();
const request = require("supertest");
const mongoose = require("mongoose");
const Game = require("./models/Game");

app.use(express.urlencoded({ extended: false }));
app.use("/api", indexRouter);

describe("get characters", () => {
  beforeAll(async () => {
    require("../mongooseConfigTesting");

    await Game.create({
      name: "track",
      characters: [
        { name: "Odlaw" },
        { name: "Waldo" },
        { name: "Wilma" },
        { name: "Wizard" },
        { name: "Woof" },
      ],
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test("track", async () => {
    const res = await request(app).get("/api/characters/track");

    expect(res.body[0].name).toMatchInlineSnapshot(`"Odlaw"`);
    expect(res.body[1].name).toMatchInlineSnapshot(`"Waldo"`);
    expect(res.body[2].name).toMatchInlineSnapshot(`"Wilma"`);
    expect(res.body[3].name).toMatchInlineSnapshot(`"Wizard"`);
    expect(res.body[4].name).toMatchInlineSnapshot(`"Woof"`);
  });
});
