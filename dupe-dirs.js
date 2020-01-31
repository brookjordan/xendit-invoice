const fs = require("fs");
const path = require("path");
const routes = [
  "items",
  "invoices",
  "payments",
  "refunds",
  "customers",
];

const buildDirectory = path.join(__dirname, "build");

fs.readFile(path.join(buildDirectory, "index.html"), (err, data) => {
  let contents = data.toString();

  routes.forEach(route => {
    let dir = path.join(buildDirectory, route);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFile(path.join(dir, "index.html"), contents, function(error, data) {
      console.log(`Done with ${route}`);
    });
  });
});
