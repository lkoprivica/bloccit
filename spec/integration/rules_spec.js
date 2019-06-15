const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/rules/";
const sequelize = require("../../src/db/models/index").sequelize;
const Rule = require("../../src/db/models").Rule;
const Topic = require("../../src/db/models").Topic;

describe("routes : rules", () => {
  beforeEach(done => {
      this.topic;
      this.rule;
      sequelize.sync({force: true}).then(res => {

       Topic.create({
         title: "JS Frameworks",
         description: "There are many"
       })
        .then(topic => {
          this.topic = topic;
          return Rule.create({
            description: "This is a rule",
            topidId: this.topic.id
          })
          .then(rule =>  {
            this.rule = rule;
            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
      });
    });

  describe("GET /rules", () => {

    it("should return a status code 200 and all rules", (done) => {

         request.get(base, (err, res, body) => {
           expect(res.statusCode).toBe(200);
           expect(err).toBeNull();
           console.log("BODY", body);
           expect(body).toContain("Rules");

           done();
         });
       });
     });

  });
//});
