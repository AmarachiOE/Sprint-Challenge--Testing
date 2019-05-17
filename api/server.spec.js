const request = require("supertest");
const server = require("./server.js");

describe("SERVER", () => {
    it("should set the environment to testing", () => {
        expect(process.env.DB_ENV).toBe("testing");
    });
});