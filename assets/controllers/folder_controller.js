import { Controller } from "@hotwired/stimulus";
import Cookies from "js-cookie";

export default class extends Controller {
    connect() {
        const folders = this.element.querySelectorAll(".folders__item");
        const expanded = Cookies.get("folders-expanded");
        const active = Cookies.get("folders-active");

        this.element.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            let folder = null;
            if (e.target.classList.contains("folders__link")) {
                folder = e.target.parentElement.dataset.id;
            }
            this.openMenu(folder, e.clientX, e.clientY);
        });

        document.addEventListener("click", (e) => {
            if (
                !e.target.classList.contains("contextmenu") &&
                !e.target.classList.contains("contextmenu__link")
            ) {
                const menus = document.querySelectorAll(".contextmenu");
                Array.from(menus).forEach((menu) => {
                    menu.classList.remove("contextmenu--open");
                });
            }
        });

        Array.from(folders).forEach((folder) => {
            const label = folder.querySelector(".folders__link");
            const expand = folder.querySelector(".folders__expand");
            const { id } = folder.dataset;

            if (expanded && expanded.split(";").includes(id)) {
                folder.classList.add("folders__item--expanded");
            }

            if (active && active == id) {
                folder.classList.add("folders__item--active");
            }

            label.addEventListener("click", (e) => {
                e.preventDefault();
                Array.from(folders).forEach((f) => {
                    f.classList.remove("folders__item--active");
                });
                folder.classList.add("folders__item--active");

                Cookies.set("folders-active", id, {
                    path: "/",
                    expires: 2147483647,
                });

                this.getSiteController().load(id);
            });

            expand.addEventListener("click", (e) => {
                e.preventDefault();
                folder.classList.toggle("folders__item--expanded");
                this.updateExpanded(folders);
            });
        });
    }

    getSiteController() {
        return this.application.getControllerForElementAndIdentifier(
            document.querySelector("[data-controller='site-table']"),
            "site-table"
        );
    }

    updateExpanded(folders) {
        const value = Array.from(folders)
            .filter((folder) =>
                folder.classList.contains("folders__item--expanded")
                    ? folder
                    : null
            )
            .map((folder) => folder.dataset.id)
            .join(";");

        Cookies.set("folders-expanded", value, {
            path: "/",
            expires: 2147483647,
        });
    }

    openMenu(folder, x, y) {
        const menu = document.querySelector(".contextmenu-folders");
        menu.classList.add("contextmenu--open");
        menu.style.transform = `translateX(${x}px) translatey(${y}px)`;
    }
}
