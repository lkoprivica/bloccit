module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const topicRoutes = require("../routes/topics");
    const postRoutes = require("../routes/topics");

    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(postRoutes);
  }
}
