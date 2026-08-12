const API = "https://profile-page-qid0.onrender.com/api";

/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton = document.getElementById("menuButton");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("active");

    });


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("active");

            });

        });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + window.innerHeight * 0.35;


    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

            });


            const activeLink =
                document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );


            if (activeLink) {

                activeLink.classList.add("active");

            }

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-header, .skill-card, .project-card, .service-item, .about-grid"
);


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.1
    }
);


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   PERFIL
   -----------------------------------------
   FUTURO CMS
   -----------------------------------------

   No futuro, esses dados não ficarão aqui.

   Eles virão da API:

   GET /api/profile

========================================================= */


/* =========================================================
   PREPARAÇÃO PARA CMS
========================================================= */

function loadProfile(data) {

    const elements =
        document.querySelectorAll("[data-profile]");


    elements.forEach(element => {

        const property =
            element.dataset.profile;


        if (
            data[property] !== undefined &&
            data[property] !== null
        ) {

            element.textContent =
                data[property];

        }

    });

}


/*
    Atualmente usamos os dados locais.

    Futuramente:

    fetch("/api/profile")
        .then(response => response.json())
        .then(data => loadProfile(data));
*/

async function carregarPerfil() {

    try {

        const response = await fetch(`${API}/profile`);

        if (!response.ok) {
            throw new Error("Erro ao buscar perfil");
        }

        const data = await response.json();

        console.log("Perfil recebido da API:", data);

        loadProfile(data);

    } catch (error) {

        console.error("Erro ao carregar perfil:", error);

    }

}

carregarPerfil();

