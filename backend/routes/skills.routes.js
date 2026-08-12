const express = require("express");

const router = express.Router();

const supabase = require("../config/database");


/* =========================================================
   GET ALL SKILLS
========================================================= */

router.get("/", async (req, res) => {

    try {

        const {
            data,
            error
        } = await supabase

            .from("skills")

            .select("*")

            .order(
                "order_position",
                {
                    ascending: true
                }
            );


        if (error) {

            console.error(
                "Erro ao buscar skills:",
                error
            );

            return res.status(500).json({

                success: false,

                error:
                    error.message

            });

        }


        res.json({

            success: true,

            skills: data

        });


    } catch (error) {

        console.error(error);


        res.status(500).json({

            success: false,

            error:
                "Erro interno do servidor."

        });

    }

});


module.exports = router;