const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("#create()", () => {

  beforeEach ((done) => {

    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

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
});

  describe("#getPosts()", () => {

    beforeEach((done) => {

      this.topic;
      this.post;
      sequelize.sync({force: true}).then((res) => {

        Post.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system."
        })
        .then((post) => {
          this.post = post;

          Topic.create({
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",

            postId: this.post.id
          })
          .then((topic) => {
            this.topic = topic;
            done();
          });
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });

    });

  });
//});
