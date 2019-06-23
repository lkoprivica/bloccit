const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
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

  describe("GET /advertisements", () => {

    it("should return a status code of 200 and all advertisements", (done) => {
      request.get(base, (err, res, body) => {
         expect(res.statusCode).toBe(200);
         expect(err).toBeNull();
         expect(body).toContain("Advertisements");
         expect(body).toContain("JS Frameworks");
         done();
       });
     });
   });

   describe("GET /advertisements/new", () => {

    it("should render a new advertisement form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advertisement");
        done();
      });
    });
  });

  describe("POST /advertisements/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "Music Advertisements",
          description: "What's your favorite song?"
        }
      };

      it("should create a new advertisement and redirect", (done) => {
        request.post(options,
          (err, res, body) => {
            Advertisement.findOne({where: {title: "Music Advertisements"}})
            .then((advertisement) => {
              expect(res.statusCode).toBe(303);
              expect(advertisement.title).toBe("Music Advertisements");
              expect(advertisement.description).toBe("What's your favorite song?");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

    describe("GET /advertisements/:id", () => {

     it("should render a view with the selected advertisement", (done) => {
       request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("JS Frameworks");
         done();
       });
     });

   });

});
