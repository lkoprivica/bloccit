const postQueries = require("../db/queries.posts.js");
const Authorizer = require("../policies/post");

module.exports = {

  new(req, res, next){
 // #2
     const topicId = req.params.topicId;
     const authorized = new Authorizer(req.user).new();

     if(authorized) {
        res.render("posts/new", {topicId});
     } else {
        req.flash("notice", "You are not authorized to do that.");
        res.redirect(`/topics/${topicId}/posts`);
     }
   },

   create(req, res, next){

    // #1
    const authorized = new Authorizer(req.user).create();

    const topicId = req.params.topicId;
        if(authorized) {
          let newPost = {
            title: req.body.title,
            body: req.body.body,
            topicId: topicId,
            userId: req.user.id
          };
          postQueries.addPost(newPost, (err, post) => {
            if(err){
              res.redirect(500, "posts/new");
            } else {
              res.redirect(303, `/topics/${topicId}/posts/${post.id}`);
            }
          });
        } else {
            req.flash("notice", "You are not authorized to do that.");
            res.redirect(`/topics/${topicId}/posts`);
        }
      },

 show(req, res, next){
    postQueries.getPost(req.params.id, (err, post) => {
      if(err || post == null){
        res.redirect(404, "/");
      } else {
        res.render("posts/show", {post});
      }
    });
  },

  destroy(req, res, next){

     const topicId = req.params.topicId;
     postQueries.deletePost(req, (err, post) => {
       if(err){
         res.redirect(500, `/posts/${req.params.id}`);
       } else {
         res.redirect(303, `/topics/${topicId}/posts`);
       }
     });
   },

   edit(req, res, next){

     const topicId = req.params.topicId;

     postQueries.getPost(req.params.id, (err, post) => {
       if(err || post == null){
         res.redirect(404, "/");
       } else {

 // #2
         const authorized = new Authorizer(req.user, post).edit();

 // #3
         if(authorized){
           res.render("posts/edit", {post});
         } else {
           req.flash("You are not authorized to do that.")
           res.redirect(`/topics/${topicId}/posts/${req.params.id}`)
         }
       }
     });
   },

   update(req, res, next){
     const topicId = req.params.topicId;
     postQueries.updatePost(req, req.body, (err, post) => {
       if(err || post == null){
         res.redirect(401, `/topics/${topicId}/posts/${req.params.id}/edit`);
       } else {
         res.redirect(302,`/topics/${topicId}/posts/${req.params.id}`);
       }
     });
   }

}
