
const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introdução à Programação",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programação com Funções",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programação com Classes",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 130,
        title: "Fundamentos da Web",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Fundamentos Dinâmicos da Web",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Desenvolvimento Web Frontend I",
        credits: 2,
        completed: false
    }
];

const courseList = document.querySelector("#courseList");
const creditSummary = document.querySelector("#creditSummary");
const filterButtons = document.querySelectorAll(".filter");

function displayCourses(selectedFilter = "ALL") {

    if (!courseList || !creditSummary) {
        return;
    }

    let filteredCourses = courses;

    // Filtra os cursos conforme a escolha do usuário.
    if (selectedFilter !== "ALL") {

        filteredCourses = courses.filter(
            (course) => course.subject === selectedFilter
        );
    }

    // Limpa a lista antes de exibir os cursos.
    courseList.innerHTML = "";

    // Cria um cartão para cada curso.
    filteredCourses.forEach((course) => {

        const courseCard = document.createElement("article");

        courseCard.classList.add("course");

        courseCard.classList.add(
            course.completed ? "completed" : "pending"
        );

        const courseCode = `${course.subject} ${course.number}`;

        const status = course.completed
            ? "Concluído"
            : "Não concluído";

        const courseTitle = document.createElement("h3");
        courseTitle.textContent = courseCode;

        const courseName = document.createElement("p");
        courseName.textContent = course.title;

        const courseCredits = document.createElement("p");
        courseCredits.textContent = `${course.credits} créditos`;

        const courseStatus = document.createElement("span");
        courseStatus.classList.add("course-status");
        courseStatus.textContent = status;

        courseCard.append(
            courseTitle,
            courseName,
            courseCredits,
            courseStatus
        );

        courseList.appendChild(courseCard);
    });

    // Soma os créditos dos cursos que estão sendo exibidos.
    const totalCredits = filteredCourses.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditSummary.textContent =
        `Total de créditos: ${totalCredits} | Cursos exibidos: ${filteredCourses.length}`;
}

// Adiciona o evento de clique aos botões de filtro.
filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const filtroSelecionado = button.dataset.filter;

        // Atualiza a aparência e a acessibilidade dos botões.
        filterButtons.forEach((outroBotao) => {

            outroBotao.classList.remove("active");
            outroBotao.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        // Atualiza os cursos e os créditos.
        displayCourses(filtroSelecionado);
    });
});

// Exibe todos os cursos quando a página é carregada.
displayCourses();