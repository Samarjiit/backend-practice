const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); //app.use(bodyParser.urlencoded({ extended: false })); sets up the Express application to use the body-parser middleware to parse incoming URL-encoded form data using Node.js's built-in querystring library.
app.use(express.static(path.join(__dirname, "public"))); //attaching static files from outside into the view html page

// app.use("/add-product", (req, res, next) => {
//   res.send(
//     '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Send</button></form>'
//   );
// });

// app.post("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
app.use("/", (req, res, next) => {
  res.send("<h1>hello from middleware!</h1>");
});

app.listen(3000);
