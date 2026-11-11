const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("mock-api/db.json");

server.use(jsonServer.defaults());
server.use(jsonServer.rewriter(require("./routes.json")));

router.render = (req, res) => {
  res.json({
    success: true,
    message: "Request completed successfully",
    data: res.locals.data,
  });
};

server.use(router);

server.listen(4000, () => {
  console.log("Mock API running on http://localhost:4000");
});