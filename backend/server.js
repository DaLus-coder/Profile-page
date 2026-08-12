const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;


/* =========================================================
   MIDDLEWARE
========================================================= */

// Permite requisições do frontend
app.use(cors());

// Permite receber JSON no body das requisições
app.use(express.json());


/* =========================================================
   ROUTES
========================================================= */

// ---------------------------------------------------------
// TEST
// ---------------------------------------------------------

const testRoutes =
    require("./routes/test.routes");

app.use(
    "/api/test",
    testRoutes
);


// ---------------------------------------------------------
// PROJECTS
// ---------------------------------------------------------

const projectsRoutes =
    require("./routes/projects.routes");

app.use(
    "/api/projects",
    projectsRoutes
);


// ---------------------------------------------------------
// PROFILE
// ---------------------------------------------------------

const profileRoutes =
    require("./routes/profile.routes");

app.use(
    "/api/profile",
    profileRoutes
);

// ---------------------------------------------------------
// SKILLS
// ---------------------------------------------------------

const skillsRoutes =
    require("./routes/skills.routes");

app.use(
    "/api/skills",
    skillsRoutes
);


/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/api/health", (req, res) => {

    res.json({

        status: "online",

        message:
            "Thiago Portfolio API funcionando!"

    });

});


/* =========================================================
   404 — ROUTE NOT FOUND
========================================================= */

app.use((req, res) => {

    res.status(404).json({

        success: false,

        error:
            "Rota não encontrada."

    });

});


/* =========================================================
   SERVER
========================================================= */

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