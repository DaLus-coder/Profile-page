const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;


/* =========================================
   MIDDLEWARE
========================================= */

app.use(cors());

app.use(express.json());


/* =========================================
   ROUTES
========================================= */

const testRoutes =
    require("./routes/test.routes");


app.use(
    "/api/test",
    testRoutes
);

const projectsRoutes =
    require("./routes/projects.routes");
    app.use(
    "/api/projects",
    projectsRoutes
);


/* =========================================
   HEALTH CHECK
========================================= */

app.get("/api/health", (req, res) => {

    res.json({
        status: "online",
        message: "Thiago Portfolio API funcionando!"
    });

});


/* =========================================
   SERVER
========================================= */

app.listen(PORT, () => {

    console.log(`
╔════════════════════════════════════╗
║       THIAGO PORTFOLIO API        ║
╠════════════════════════════════════╣
║ Server: http://localhost:${PORT}   ║
║ Status: ONLINE                     ║
╚════════════════════════════════════╝
    `);

});