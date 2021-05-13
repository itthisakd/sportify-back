const express = require("express");
const errorMiddleware = require("./middlewares/error");
const { sequelize } = require("./models");
const accountRoutes = require("./routes/accountRoutes");
const matchRoutes = require("./routes/matchRoutes");
const sportRoutes = require("./routes/sportRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/account", accountRoutes);
app.use("/match", matchRoutes);
app.use("/sport", sportRoutes);
app.use("/match", matchRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "path not found on this server" });
});

app.use(errorMiddleware);

// sequelize.sync({ alter: true }).then(() => console.log("DB Sync"));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
