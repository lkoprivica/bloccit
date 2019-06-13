const topicQueries = require("../db/queries.rules.js");


module.exports = {
  index(req, res, next){
    topicQueries.getAllRules((err, rules) => {

        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("rules/index", {rules});
        }
      })
  }
}
