module.exports = {
  getPosts(req, res) {
    var id = req.params.id;
    if(id != null) {
      console.log("GET /posts/:id", id);
      //If id is not a number or doesn't exist - return 404 as post not found
      if(isNaN(id) || id > req.store.posts.length - 1) {
        res.sendStatus(404);
      }
      var post = req.store.posts[id];
      res.status(200).json(post);
    }
    else {
      console.log("GET /posts");
      res.status(200).json(req.store.posts);
    }
  },
  addPost(req, res) {
    console.log("POST /posts");
    var newPost = req.body;
    req.store.posts.push(newPost);
    res.status(201).json({ "id": req.store.posts.length - 1 });
  },
  updatePost(req, res) {
    var id = req.params.id;
    console.log("PUT /posts/:id", id);
    //If id is not a number or doesn't exist - return 404 as post not found
    if(isNaN(id) || id > req.store.posts.length - 1) {
      res.sendStatus(404);
    }
    else {
      var updatedPost = req.body;
      req.store.posts[id] = updatedPost;
      res.status(204).json(updatedPost);
    }
  },
  removePost(req, res) {
    var id = req.params.id;
    console.log("DELETE /posts/:id", id);
    //If id is not a number or doesn't exist - return 404 as post not found
    if(id != null || isNaN(id) || id > req.store.posts.length - 1) {
      res.sendStatus(404);
    }

    req.store.posts.splice(id, 1);
    res.sendStatus(204);
  }
}