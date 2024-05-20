const express = require("express");
const morgan = require("morgan");
const bookRouter = require("./infrastructure/api/routes/bookRoutes");
const borrowHistoryRouter = require("./infrastructure/api/routes/borrowHistoryRoutes");
const memberRouter = require("./infrastructure/api/routes/memberRoutes");
const swagger = require("./infrastructure/api/docs/swagger");

const { sequelize } = require("./infrastructure/database/models");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    return res.status(200).json("Server is ready");
});

app.use(swagger);
app.use(bookRouter);
app.use(borrowHistoryRouter);
app.use(memberRouter);

//! errror handler
app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({
        status: 500,
        error: "Internal Server Error",
    });
});

app.use((req, res) => {
    res.status(404).json({
        status: 404,
        error: "METHODE AND ENDPOINT NOT FOUND!",
    });
});

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Connection to the database is successful.");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the databasae", error);
    }
}

startServer();
