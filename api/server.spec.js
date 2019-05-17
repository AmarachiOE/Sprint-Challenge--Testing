const request = require("supertest");
const server = require("./server.js");
const db = require("../database/dbConfig.js");

describe("SERVER", () => {
  // resets database when re-running ALL tests
  beforeAll(async () => {
    await db("games").truncate();
  });

  it("should set the environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("should return 200 OK", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
    });

    it("should return json object", async () => {
      const response = await request(server).get("/");
      expect(response.type).toBe("application/json");
    });

    it("should return { api: 'up and running' }", async () => {
      const expectedBody = { api: "up and running" };
      const response = await request(server).get("/");
      expect(response.body).toEqual(expectedBody);
    });
  });

  describe("GET /games", () => {
    it("should return 200 OK", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });

    it("should return json object", async () => {
      const response = await request(server).get("/games");
      expect(response.type).toBe("application/json");
    });

    it("should return content in an array", async () => {
      const expectedBody = [];
      const response = await request(server).get("/games");
      expect(response.body).toEqual(expect.arrayContaining(expectedBody));
    });
  });

  describe("POST /games", () => {
    it("should return 201 OK", async () => {
      const newGame = {
        title: "Hunger Games",
        genre: "Adventure",
        releaseYear: 2012
      };

      const response = await request(server)
        .post("/games")
        .send(newGame);
      expect(response.body.id).toBe(1);
      expect(response.status).toBe(201);
    });

    it("should return 422 ERROR", async () => {
      // using movieTitle instead of title to get error
      const newGame = {
        movieTitle: "Monopoly",
        genre: "Board Game",
        releaseYear: 1935
      };

      const response = await request(server)
        .post("/games")
        .send(newGame);
      expect(response.status).toBe(422);
    });

    it("should return json object", async () => {
      const response = await request(server).post("/games");
      expect(response.type).toBe("application/json");
    });

    it("return defined content", async () => {
      const newGame = { title: "Uno", genre: "Cards" };
      const response = await request(server)
        .post("/games")
        .send(newGame);
      expect(response.body).toBeDefined();
    });
  });

  // ==== STRETCH
  describe("GET /games/:id", () => {
    it("should return 200 OK (id: 1)", async () => {
      const response = await request(server).get("/games/1");
      expect(response.status).toBe(200);
    });

    it("should return 404 NOT FOUND (id: 400)", async () => {
      const response = await request(server).get("/games/400");
      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /games/:id", () => {
    it("should return 204 OK (id: 2)", async () => {
      const response = await request(server).delete("/games/2");
      expect(response.status).toBe(204);
    });

    it("should return 404 NOT FOUND (id:33)", async () => {
      const response = await request(server).delete("/games/33");
      expect(response.status).toBe(404);
    });
  });
});
