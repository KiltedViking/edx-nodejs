var express = require("express");
var bodyParser = require("body-parser");
// const routes = require("./routes"); 
const {posts, comments} = require("./routes"); 
const port = 3000;
// console.log(posts);
//Initialise "database"
let store = {
  posts: [
    {
      name: "Top 10 ES6 Features every Web Developer must know",
      url: "https://webapplog.com/es6",
      text: "This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.",
      comments: [
        { text: "Cruel…..var { house, mouse} = No type optimization at all" },
        { text: "I think you’re undervaluing the benefit of ‘let’ and ‘const’." },
        { text: "(p1,p2)=>{ … } ,i understand this ,thank you !" }
      ]
    }
  ]
}

/*** Configure and set up server **********************************************/
var app = express();
app.use(bodyParser.json());


/*** Middleware ***************************************************************/
//Add store to request, so that available in route files
app.use((req, res, next) => {
  req.store = store;
  next();
})

/*** Routes *******************************************************************/
app.get("/posts", posts.getPosts);
app.get("/posts/:id", posts.getPosts);
app.post("/posts", posts.addPost);
app.put("/posts/:id", posts.updatePost);
app.delete("/posts/:id", posts.removePost);

app.get("/posts/:postId/comments", comments.getComments);
app.get("/posts/:postId/comments/:commentId", comments.getComments);
app.post("/posts/:postId/comments/", comments.addComment);
app.put("/posts/:postId/comments/:commentId", comments.updateComment);
app.delete("/posts/:postId/comments/:commentId", comments.removeComment);

/*** Launch server ************************************************************/
app.listen(port);
console.log(`Server listening to http://localhost:${port}/`)