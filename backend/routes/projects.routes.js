const express = require("express");

const router = express.Router();

const supabase = require("../config/database");


/* =========================================
   GET ALL PROJECTS
========================================= */

router.get("/", async (req, res) => {

    try {

        const { data, error } = await supabase

            .from("projects")

            .select("*")

            .order(
                "order_position",
                {
                    ascending: true
                }
            );


        if (error) {

            console.error(
                "Erro ao buscar projetos:",
                error
            );

            return res.status(500).json({

                success: false,

                error: error.message

            });

        }


        res.json({

            success: true,

            projects: data

        });


    } catch (error) {

        console.error(error);


        res.status(500).json({

            success: false,

            error: "Erro interno do servidor."

        });

    }

});


/* =========================================
   POST — CREATE PROJECT
========================================= */

router.post("/", async (req, res) => {

    try {

        const {
            title,
            description,
            project_type,
            image_url,
            project_url,
            status,
            technologies
        } = req.body;


        if (!title) {

            return res.status(400).json({

                success: false,

                error: "O título do projeto é obrigatório."

            });

        }


        /* =================================
           DESCOBRIR PRÓXIMA POSIÇÃO
        ================================= */

        const {
            data: lastProject,
            error: lastError
        } = await supabase

            .from("projects")

            .select("order_position")

            .order(
                "order_position",
                {
                    ascending: false
                }
            )

            .limit(1);


        if (lastError) {

            console.error(lastError);

            return res.status(500).json({

                success: false,

                error: lastError.message

            });

        }


        const nextPosition =
            lastProject.length > 0
                ? lastProject[0].order_position + 1
                : 1;


        /* =================================
           CRIAR PROJETO
        ================================= */

        const {
            data,
            error
        } = await supabase

            .from("projects")

            .insert({

                title,

                description:
                    description || "",

                project_type:
                    project_type ||
                    "WEB APPLICATION",

                image_url:
                    image_url || "",

                project_url:
                    project_url || "",

                status:
                    status || "offline",

                technologies:
                    Array.isArray(technologies)
                        ? technologies
                        : [],

                order_position:
                    nextPosition

            })

            .select()

            .single();


        if (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                error: error.message

            });

        }


        res.status(201).json({

            success: true,

            message:
                "Projeto criado com sucesso.",

            project: data

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


/* =========================================
   PUT — REORDER PROJECTS
   IMPORTANTE:
   ESTA ROTA PRECISA VIR ANTES DE /:id
========================================= */

router.put("/reorder", async (req, res) => {

    try {

        const { projects } = req.body;


        if (!Array.isArray(projects)) {

            return res.status(400).json({

                success: false,

                error:
                    "Formato inválido."

            });

        }


        for (
            let index = 0;
            index < projects.length;
            index++
        ) {

            const project =
                projects[index];


            if (!project.id) {

                return res.status(400).json({

                    success: false,

                    error:
                        "Cada projeto precisa possuir um ID."

                });

            }


            const {
                error
            } = await supabase

                .from("projects")

                .update({

                    order_position:
                        index + 1,

                    updated_at:
                        new Date().toISOString()

                })

                .eq(
                    "id",
                    project.id
                );


            if (error) {

                console.error(
                    "Erro ao reorganizar:",
                    error
                );

                return res.status(500).json({

                    success: false,

                    error:
                        error.message

                });

            }

        }


        res.json({

            success: true,

            message:
                "Ordem dos projetos atualizada."

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


/* =========================================
   GET — SINGLE PROJECT
========================================= */

router.get("/:id", async (req, res) => {

    try {

        const { id } =
            req.params;


        const {
            data,
            error
        } = await supabase

            .from("projects")

            .select("*")

            .eq("id", id)

            .single();


        if (error) {

            return res.status(404).json({

                success: false,

                error:
                    "Projeto não encontrado."

            });

        }


        res.json({

            success: true,

            project: data

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


/* =========================================
   PUT — UPDATE PROJECT
========================================= */

router.put("/:id", async (req, res) => {

    try {

        const { id } =
            req.params;


        const {
            title,
            description,
            project_type,
            image_url,
            project_url,
            status,
            technologies
        } = req.body;


        const updateData = {};


        if (title !== undefined)
            updateData.title = title;


        if (description !== undefined)
            updateData.description =
                description;


        if (project_type !== undefined)
            updateData.project_type =
                project_type;


        if (image_url !== undefined)
            updateData.image_url =
                image_url;


        if (project_url !== undefined)
            updateData.project_url =
                project_url;


        if (status !== undefined)
            updateData.status =
                status;


        if (technologies !== undefined) {

            updateData.technologies =
                Array.isArray(
                    technologies
                )
                    ? technologies
                    : [];

        }


        updateData.updated_at =
            new Date().toISOString();


        const {
            data,
            error
        } = await supabase

            .from("projects")

            .update(updateData)

            .eq("id", id)

            .select()

            .single();


        if (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                error:
                    error.message

            });

        }


        res.json({

            success: true,

            message:
                "Projeto atualizado com sucesso.",

            project: data

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


/* =========================================
   DELETE — DELETE PROJECT
========================================= */

router.delete("/:id", async (req, res) => {

    try {

        const { id } =
            req.params;


        const {
            error
        } = await supabase

            .from("projects")

            .delete()

            .eq("id", id);


        if (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                error:
                    error.message

            });

        }


        res.json({

            success: true,

            message:
                "Projeto excluído com sucesso."

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