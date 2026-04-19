const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    helpers: {
      eq: (left, right) => left === right,
      gt: (left, right) => Number(left) > Number(right),
      join: (items, separator = ", ") =>
        Array.isArray(items) ? items.join(separator) : "",
      formatDate: (value) =>
        value
          ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
              new Date(value)
            )
          : "",
      truncate: (value = "", limit = 140) =>
        value.length > limit ? `${value.slice(0, limit).trim()}...` : value,
      badgeClass: (status = "") => {
        const styles = {
          Completed: "text-bg-success",
          "In Progress": "text-bg-warning",
          Draft: "text-bg-secondary"
        };

        return styles[status] || "text-bg-primary";
      },
      isActive: (currentPath, targetPath) =>
        currentPath === targetPath ? "active" : "",
      checked: (value) => (value ? "checked" : ""),
      selected: (currentValue, optionValue) =>
        currentValue === optionValue ? "selected" : "",
      stringify: (value) => JSON.stringify(value, null, 2)
    }
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "src")));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.flashMessage = req.query.message || "";
  res.locals.flashType = req.query.type || "success";
  res.locals.currentYear = new Date().getFullYear();
  next();
});

app.use(router);

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).render("error", {
    title: "Server Error",
    currentPage: "error",
    message: "The server hit an unexpected error while processing your request."
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});