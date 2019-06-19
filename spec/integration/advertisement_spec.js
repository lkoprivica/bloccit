const request = require("request");
const server = require("../../src/server");
const base = "http://localhose:3000/advertisement/";

describe("routes : advertisement", () => {

  describe("GET /advertisement", () => {
    
    it("should return a status code of 200", (done) => {
      request.get(base,(err,res,body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });
});
