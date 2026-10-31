
const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const menuAberto = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", menuAberto);

        menuButton.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
        );

        menuButton.textContent = menuAberto ? "✕" : "☰";
    });
}