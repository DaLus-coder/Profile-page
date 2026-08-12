const API = "http://localhost:3000/api";


/* =========================================================
   ELEMENTOS
========================================================= */

const menuItems =
    document.querySelectorAll(".menu-item");

const sections =
    document.querySelectorAll(".cms-section");

const pageTitle =
    document.getElementById("pageTitle");

const currentSection =
    document.getElementById("currentSection");


/* =========================================================
   NAVEGAÇÃO
========================================================= */

menuItems.forEach((button) => {

    button.addEventListener("click", () => {

        const section =
            button.dataset.section;


        menuItems.forEach((item) => {

            item.classList.remove("active");

        });


        button.classList.add("active");


        sections.forEach((item) => {

            item.classList.remove("active");

        });


        const target =
            document.getElementById(
                `section-${section}`
            );


        if (target) {

            target.classList.add("active");

        }


        const title =
            button
                .querySelector("span:last-child")
                ?.textContent
                .trim();


        pageTitle.textContent =
            title || "Dashboard";


        currentSection.textContent =
            (
                title ||
                "Dashboard"
            ).toUpperCase();


        if (section === "dashboard") {

            carregarDashboard();

        }


        if (section === "profile") {

            carregarPerfil();

        }


        if (section === "projects") {

            carregarProjetos();

        }


        if (section === "skills") {

            carregarSkills();

        }

    });

});


/* =========================================================
   TOAST
========================================================= */

function mostrarToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================================
   DASHBOARD
========================================================= */

async function carregarDashboard() {

    try {

        const projectsResponse =
            await fetch(
                `${API}/projects`
            );


        const projects =
            await projectsResponse.json();


        document.getElementById(
            "statProjects"
        ).textContent =

            projects.success
                ? projects.projects.length
                : "--";


    } catch (error) {

        console.error(
            "Erro no dashboard:",
            error
        );

    }

}


/* =========================================================
   PROFILE
========================================================= */

async function carregarPerfil() {

    try {

        const response =
            await fetch(
                `${API}/profile`
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.error
            );

        }


        const profile =
            result.profile;


        document.getElementById(
            "profileName"
        ).value =
            profile.name || "";


        document.getElementById(
            "profileAge"
        ).value =
            profile.age || "";


        document.getElementById(
            "profileRole"
        ).value =
            profile.role || "";


        document.getElementById(
            "profileLocation"
        ).value =
            profile.location || "";


        document.getElementById(
            "profileShortDescription"
        ).value =
            profile.short_description || "";


        document.getElementById(
            "profileAbout"
        ).value =
            profile.about || "";


        document.getElementById(
            "profileFocus"
        ).value =
            profile.focus || "";


        document.getElementById(
            "profileEmail"
        ).value =
            profile.email || "";


        document.getElementById(
            "profilePhone"
        ).value =
            profile.phone || "";


        document.getElementById(
            "profileGithub"
        ).value =
            profile.github || "";


        document.getElementById(
            "profileLinkedin"
        ).value =
            profile.linkedin || "";


        document.getElementById(
            "profileInstagram"
        ).value =
            profile.instagram || "";


        document.getElementById(
            "profileWebsite"
        ).value =
            profile.website || "";


    } catch (error) {

        console.error(
            "Erro ao carregar perfil:",
            error
        );

        mostrarToast(
            "ERRO AO CARREGAR PERFIL"
        );

    }

}


/* =========================================================
   SALVAR PROFILE
========================================================= */

document
    .getElementById("profileForm")
    .addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const data = {

                name:
                    document.getElementById(
                        "profileName"
                    ).value,

                age:
                    Number(
                        document.getElementById(
                            "profileAge"
                        ).value
                    ),

                role:
                    document.getElementById(
                        "profileRole"
                    ).value,

                location:
                    document.getElementById(
                        "profileLocation"
                    ).value,

                short_description:
                    document.getElementById(
                        "profileShortDescription"
                    ).value,

                about:
                    document.getElementById(
                        "profileAbout"
                    ).value,

                focus:
                    document.getElementById(
                        "profileFocus"
                    ).value,

                email:
                    document.getElementById(
                        "profileEmail"
                    ).value,

                phone:
                    document.getElementById(
                        "profilePhone"
                    ).value,

                github:
                    document.getElementById(
                        "profileGithub"
                    ).value,

                linkedin:
                    document.getElementById(
                        "profileLinkedin"
                    ).value,

                instagram:
                    document.getElementById(
                        "profileInstagram"
                    ).value,

                website:
                    document.getElementById(
                        "profileWebsite"
                    ).value

            };


            try {

                const response =
                    await fetch(
                        `${API}/profile`,
                        {

                            method:
                                "PUT",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    data
                                )

                        }
                    );


                const result =
                    await response.json();


                if (!result.success) {

                    throw new Error(
                        result.error
                    );

                }


                mostrarToast(
                    "PERFIL ATUALIZADO COM SUCESSO"
                );


            } catch (error) {

                console.error(error);

                mostrarToast(
                    "ERRO AO SALVAR PERFIL"
                );

            }

        }
    );


/* =========================================================
   PROJECTS
========================================================= */

async function carregarProjetos() {

    const container =
        document.getElementById(
            "projectsContainer"
        );


    container.innerHTML = `

        <div class="loading">
            CARREGANDO PROJETOS...
        </div>

    `;


    try {

        const response =
            await fetch(
                `${API}/projects`
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.error
            );

        }


        if (
            !result.projects ||
            result.projects.length === 0
        ) {

            container.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">
                        ▣
                    </div>

                    <h3>
                        Nenhum projeto encontrado
                    </h3>

                    <p>
                        Crie seu primeiro projeto.
                    </p>

                </div>

            `;

            return;

        }


        container.innerHTML =
            result.projects
                .map((project) => {

                    return `

                        <div
                            class="project-admin-card"
                            data-project-id="${project.id}"
                        >

                            <div class="project-drag">
                                ⋮⋮
                            </div>


                            ${
                                project.image_url
                                    ? `
                                        <img
                                            src="${escapeHTML(
                                                project.image_url
                                            )}"
                                            class="project-admin-image"
                                            alt=""
                                        >
                                    `
                                    : `
                                        <div
                                            class="project-admin-image"
                                        ></div>
                                    `
                            }


                            <div class="project-admin-info">

                                <h3>
                                    ${escapeHTML(
                                        project.title
                                    )}
                                </h3>


                                <p>
                                    ${escapeHTML(
                                        project.description ||
                                        "Sem descrição."
                                    )}
                                </p>


                                <div class="project-admin-meta">

                                    <span class="project-status">

                                        ${escapeHTML(
                                            (
                                                project.status ||
                                                "offline"
                                            ).toUpperCase()
                                        )}

                                    </span>

                                    <span class="project-status">

                                        #${project.order_position}

                                    </span>

                                </div>

                            </div>


                            <div class="project-actions">

                                <button
                                    type="button"
                                    class="project-action"
                                    onclick="editarProjeto('${project.id}')"
                                >
                                    EDITAR
                                </button>


                                <button
                                    type="button"
                                    class="project-action delete"
                                    onclick="excluirProjeto('${project.id}')"
                                >
                                    EXCLUIR
                                </button>

                            </div>

                        </div>

                    `;

                })
                .join("");


    } catch (error) {

        console.error(error);


        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    Erro ao carregar projetos
                </h3>

                <p>
                    ${escapeHTML(
                        error.message
                    )}
                </p>

            </div>

        `;

    }

}


/* =========================================================
   MODAL DE PROJETO
========================================================= */

const projectModal =
    document.getElementById(
        "projectModal"
    );

const projectForm =
    document.getElementById(
        "projectForm"
    );


document
    .getElementById("newProjectButton")
    .addEventListener(
        "click",
        () => {

            abrirNovoProjeto();

        }
    );


document
    .getElementById("closeProjectModal")
    .addEventListener(
        "click",
        fecharProjetoModal
    );


document
    .getElementById("cancelProjectButton")
    .addEventListener(
        "click",
        fecharProjetoModal
    );


function abrirNovoProjeto() {

    projectForm.reset();


    document.getElementById(
        "projectId"
    ).value = "";


    document.getElementById(
        "projectModalTitle"
    ).textContent =
        "Novo Projeto";


    projectModal.classList.add(
        "active"
    );

}


function fecharProjetoModal() {

    projectModal.classList.remove(
        "active"
    );

}


/* =========================================================
   EDITAR PROJETO
========================================================= */

async function editarProjeto(id) {

    try {

        const response =
            await fetch(
                `${API}/projects/${id}`
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.error
            );

        }


        const project =
            result.project;


        document.getElementById(
            "projectId"
        ).value =
            project.id;


        document.getElementById(
            "projectTitle"
        ).value =
            project.title || "";


        document.getElementById(
            "projectDescription"
        ).value =
            project.description || "";


        document.getElementById(
            "projectType"
        ).value =
            project.project_type || "";


        document.getElementById(
            "projectStatus"
        ).value =
            project.status || "offline";


        document.getElementById(
            "projectImage"
        ).value =
            project.image_url || "";


        document.getElementById(
            "projectUrl"
        ).value =
            project.project_url || "";


        document.getElementById(
            "projectTechnologies"
        ).value =
            Array.isArray(
                project.technologies
            )
                ? project.technologies.join(", ")
                : "";


        document.getElementById(
            "projectModalTitle"
        ).textContent =
            "Editar Projeto";


        projectModal.classList.add(
            "active"
        );


    } catch (error) {

        console.error(error);

        mostrarToast(
            "ERRO AO CARREGAR PROJETO"
        );

    }

}


/* =========================================================
   SALVAR PROJETO
========================================================= */

projectForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const id =
            document.getElementById(
                "projectId"
            ).value;


        const technologies =
            document.getElementById(
                "projectTechnologies"
            ).value
                .split(",")
                .map(
                    item =>
                        item.trim()
                )
                .filter(Boolean);


        const data = {

            title:
                document.getElementById(
                    "projectTitle"
                ).value.trim(),

            description:
                document.getElementById(
                    "projectDescription"
                ).value.trim(),

            project_type:
                document.getElementById(
                    "projectType"
                ).value.trim(),

            status:
                document.getElementById(
                    "projectStatus"
                ).value,

            image_url:
                document.getElementById(
                    "projectImage"
                ).value.trim(),

            project_url:
                document.getElementById(
                    "projectUrl"
                ).value.trim(),

            technologies

        };


        try {

            const response =
                await fetch(

                    id
                        ? `${API}/projects/${id}`
                        : `${API}/projects`,

                    {

                        method:
                            id
                                ? "PUT"
                                : "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                data
                            )

                    }

                );


            const result =
                await response.json();


            if (!result.success) {

                throw new Error(
                    result.error
                );

            }


            fecharProjetoModal();


            await carregarProjetos();


            await carregarDashboard();


            mostrarToast(

                id
                    ? "PROJETO ATUALIZADO"
                    : "PROJETO CRIADO COM SUCESSO"

            );


        } catch (error) {

            console.error(error);

            mostrarToast(
                "ERRO AO SALVAR PROJETO"
            );

        }

    }
);


/* =========================================================
   EXCLUIR PROJETO
========================================================= */

async function excluirProjeto(id) {

    const confirmar =
        confirm(
            "Tem certeza que deseja excluir este projeto?"
        );


    if (!confirmar) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API}/projects/${id}`,
                {

                    method:
                        "DELETE"

                }
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.error
            );

        }


        await carregarProjetos();


        await carregarDashboard();


        mostrarToast(
            "PROJETO EXCLUÍDO COM SUCESSO"
        );


    } catch (error) {

        console.error(error);

        mostrarToast(
            "ERRO AO EXCLUIR PROJETO"
        );

    }

}


/* =========================================================
   SKILLS
========================================================= */

async function carregarSkills() {

    const container =
        document.getElementById(
            "skillsContainer"
        );


    container.innerHTML = `

        <div class="loading">
            CARREGANDO SKILLS...
        </div>

    `;


    try {

        const response =
            await fetch(
                `${API}/skills`
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.error
            );

        }


        if (
            !result.skills ||
            result.skills.length === 0
        ) {

            container.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">
                        ◇
                    </div>

                    <h3>
                        Nenhuma skill encontrada
                    </h3>

                </div>

            `;

            return;

        }


        container.innerHTML =
            result.skills
                .map((skill) => {

                    return `

                        <div class="dashboard-panel">

                            <div class="stat-icon">
                                ${escapeHTML(
                                    skill.icon || "◇"
                                )}
                            </div>

                            <h3>
                                ${escapeHTML(
                                    skill.name
                                )}
                            </h3>

                            <div class="stat-label">

                                ${escapeHTML(
                                    skill.category || ""
                                )}

                            </div>

                            <div class="info-row">

                                <span>
                                    LEVEL
                                </span>

                                <strong>
                                    ${skill.level || 0}%
                                </strong>

                            </div>

                        </div>

                    `;

                })
                .join("");


    } catch (error) {

        console.error(error);


        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    Erro ao carregar skills
                </h3>

                <p>
                    ${escapeHTML(
                        error.message
                    )}
                </p>

            </div>

        `;

    }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   INIT
========================================================= */

carregarDashboard();