const express = require("express");
const Container = require("./services/container");
const { connectToDB } = require("./config/sequelize");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

connectToDB();
const container = new Container();

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(9050, () => {
  console.log("Servidor escuchando en el puerto 9050");
});
