module.exports = {
  getComments(req, res) {
    var postId = req.params.postId;
    var commentId = req.params.commentId;

    if(postId == null || isNaN(postId) || postId > req.store.posts.length - 1) {
      res.sendStatus(404);
    }
    else {
      if(commentId != null) {
        if(isNaN(commentId) || commentId > req.store.posts[postId].comments.length -1) {
          console.log("GET /posts/:postId/comments/:commentId", postId, commentId);  
          res.sendStatus(404);
        }
        else {
          console.log("GET /posts/:postId/comments/:commentId", postId, commentId);
          var comments = req.store.posts[postId].comments[commentId];
          res.status(200).json(comments);  
        }
      }
      else {
        console.log("GET /posts/:postId/comments", postId);
        var comments = req.store.posts[postId].comments;
        res.status(200).json(comments);
      }
    }
  }, 
  addComment(req, res) {
    var postId = req.params.postId;

    if(postId == null || isNaN(postId) || postId > req.store.posts.length - 1) {
      res.sendStatus(404);
    }
    else {
      var newComment = req.body;
      if(req.store.posts[postId].comments == null) {
        req.store.posts[postId].comments = [];
      }
      req.store.posts[postId].comments.push(newComment);
      res.status(201).json({ "id": req.store.posts[postId].comments.length - 1 });
    }
  },
  updateComment(req, res) {
    var postId = req.params.postId;
    var commentId = req.params.commentId;

    if(postId == null || isNaN(postId) || postId > req.store.posts.length - 1) {
      res.sendStatus(404);
    }
    else {
      if(commentId != null) {
        if(isNaN(commentId) || commentId > req.store.posts[postId].comments.length -1) {
          console.log("PUT /posts/:postId/comments/:commentId", postId, commentId);  
          res.sendStatus(404);
        }
        else {
          var updatedComment = req.body;
          req.store.posts[postId].comments[commentId] = updatedComment;
          res.status(204).json(updatedComment);
        }
      }
    }
  },
  removeComment(req, res) {
    var postId = req.params.postId;
    var commentId = req.params.commentId;

    if(postId == null || isNaN(postId) || postId > req.store.posts.length - 1) {
      res.sendStatus(404);
    }
    else {
      if(commentId != null) {
        if(isNaN(commentId) || commentId > req.store.posts[postId].comments.length -1) {
          console.log("PUT /posts/:postId/comments/:commentId", postId, commentId);  
          res.sendStatus(404);
        }
        else {
          req.store.posts[postId].comments.splice(commentId, 1);
          res.sendStatus(204);
        }
      }
    }
  }  
}