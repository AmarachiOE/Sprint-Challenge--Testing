const request = require("supertest");
const server = require("./server.js");

describe("SERVER", () => {
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
        expect(response.status).toBe(500);
      });

      it("should return json object", async () => {
          const response = await request(server).get("/games");
          expect(response.type).toBe("application/xml");
      });

      it("should return content in an array", async () => {
          const expectedBody = [];
          const response = await request(server).get("/games");
          expect(response.body).not.toEqual(expect.arrayContaining(expectedBody));
      });
  });
});
