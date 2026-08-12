const express = require("express");

const router = express.Router();

const supabase = require("../config/database");


router.get("/", async (req, res) => {

    try {

        const { data, error } = await supabase
            .from("profile")
            .select("*")
            .limit(1);


        if (error) {

            console.error("Erro Supabase:", error);

            return res.status(500).json({
                success: false,
                error: error.message
            });

        }


        res.json({
            success: true,
            message: "Conexão com Supabase funcionando!",
            data
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: "Erro interno do servidor."
        });

    }

});


module.exports = router;