const fs = require("fs");
const path = require("path");
const routes = [
  "items",
  "invoices",
  "payments",
  "refunds",
  "customers",
];

fs.readFile(path.join(__dirname, "build", "index.html"), (err, data) => {
  let contents = data.toString();

  routes.forEach(route => {
    let dir = path.join(__dirname, "build", route);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFile(path.join(dir, "index.html"), contents, function(error, data) {
      console.log(`Done with ${route}`);
    });
  });
});
