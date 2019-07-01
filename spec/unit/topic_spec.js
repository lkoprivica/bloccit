const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("#create()", () => {
  it("Should create a Topic object", (done) => {
    const title = "This is the title";
    const body = "This is the body";
    const topicId = this.topic.id;

    Topic.create({
      title,
      body,
      topicId
    })
    .then((topic) => {
      expect(topic.title).toBe(title);
      expect(topic.body).tobe(body);

        done();
    })
    .catch(err => {
      console.log(err);
      done();
    });
  });
});

  describe("#getPosts()", () => {

    it("should return the associated post", (done) => {

      this.topic.getPosts()

        .then((associatedPost) => {
        expect(associatedT.title).toBe("Post One");
          done();
      });

    });

  });
//});
