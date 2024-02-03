const indexRouter = require("./routes/index");
const express = require("express");
const app = express();
const request = require("supertest");
const mongoose = require("mongoose");
const Game = require("./models/Game");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", indexRouter);

describe("track", () => {
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
      times: [
        { username: "A1yssa", time: 44 },
        { username: "Kweebac", time: 23 },
      ],
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test("get characters", async () => {
    const res = await request(app).get("/api/track/characters");

    expect(res.body[0].name).toMatchInlineSnapshot(`"Odlaw"`);
    expect(res.body[1].name).toMatchInlineSnapshot(`"Waldo"`);
    expect(res.body[2].name).toMatchInlineSnapshot(`"Wilma"`);
    expect(res.body[3].name).toMatchInlineSnapshot(`"Wizard"`);
    expect(res.body[4].name).toMatchInlineSnapshot(`"Woof"`);
  });

  test("get top 10 times from best to worst", async () => {
    const res = await request(app).get("/api/track/times");

    expect(res.body[0].username).toMatchInlineSnapshot(`"Kweebac"`);
    expect(res.body[0].time).toMatchInlineSnapshot(`23`);
    expect(res.body.length).toBeLessThanOrEqual(10);
  });

  test("post time", async () => {
    await request(app).post("/api/track/time").send({ username: "Beanie", time: 55 });

    const res = await request(app).get("/api/track/times");

    expect(res.body[2].username).toMatchInlineSnapshot(`"Beanie"`);
    expect(res.body[2].time).toMatchInlineSnapshot(`55`);
  });

  // test("time taken should be 1 second", async () => {
  //   jest.useFakeTimers();

  //   request(app).get("/api/track/characters");

  //   setTimeout(async () => {
  //     console.log("hi");

  //     // const res = await request(app).get("/api/endgame");
  //     // console.log(res.body);
  //     // expect(res.body).toBe(1000);
  //   }, 1000);

  //   jest.runAllTimers();

  //   jest.useRealTimers();
  // });
});
