const request = require("request");
const server = require("../../src/server");
const base = "http://localhose:3000/advertisement/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisement", () => {

  beforeEach((done) => {
    this.advertisement;
    sequelize.sync({force: true}).then((res) => {

      Advertisement.create({
        title: "JS Frameworks",
        description: "List of Ads"
      })
      .then((advertisement)=> {
        this.advertisement = advertisement;
        done();
      })
      .catch((err)=>{
        console.log(err);
        done();
      });
  });
});

  describe("GET /advertisement", () => {

    it("should return a status code of 200 and all advertisements", (done) => {
      request.get(base, (err, res, body) => {
         expect(res.statusCode).toBe(200);
         expect(err).toBeNull();
         expect(body).toContain("Advertisement");
         expect(body).toContain("JS Frameworks");
         done();
       });
     });
   });
});
  //});
//});
