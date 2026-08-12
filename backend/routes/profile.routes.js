const express = require("express");

const router = express.Router();

const supabase = require("../config/database");


/* =========================================================
   GET PROFILE
========================================================= */

router.get("/", async (req, res) => {

    try {

        const {
            data,
            error
        } = await supabase

            .from("profile")

            .select("*")

            .limit(1)

            .single();


        if (error) {

            console.error(
                "Erro ao buscar perfil:",
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

            profile: data

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


/* =========================================================
   PUT PROFILE
========================================================= */

router.put("/", async (req, res) => {

    try {

        const {

            name,

            age,

            role,

            short_description,

            about,

            location,

            focus,

            profile_image,

            email,

            phone,

            github,

            linkedin,

            instagram,

            website

        } = req.body;


        const updateData = {};


        if (name !== undefined)
            updateData.name = name;


        if (age !== undefined)
            updateData.age = age;


        if (role !== undefined)
            updateData.role = role;


        if (short_description !== undefined)
            updateData.short_description =
                short_description;


        if (about !== undefined)
            updateData.about = about;


        if (location !== undefined)
            updateData.location =
                location;


        if (focus !== undefined)
            updateData.focus =
                focus;


        if (profile_image !== undefined)
            updateData.profile_image =
                profile_image;


        if (email !== undefined)
            updateData.email = email;


        if (phone !== undefined)
            updateData.phone = phone;


        if (github !== undefined)
            updateData.github = github;


        if (linkedin !== undefined)
            updateData.linkedin = linkedin;


        if (instagram !== undefined)
            updateData.instagram =
                instagram;


        if (website !== undefined)
            updateData.website =
                website;


        updateData.updated_at =
            new Date().toISOString();


        const {

            data,

            error

        } = await supabase

            .from("profile")

            .update(updateData)

            .eq("id", 1)

            .select()

            .single();


        if (error) {

            console.error(
                "Erro ao atualizar perfil:",
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

            message:
                "Perfil atualizado com sucesso.",

            profile: data

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


/* =========================================================
   EXPORT
========================================================= */

module.exports = router;