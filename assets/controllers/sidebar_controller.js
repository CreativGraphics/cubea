import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    connect() {
        const title = this.element.querySelector(".sidebar__title");
        const items = this.element.querySelectorAll(".menu__link");
        const selected = this.element.querySelector(".menu__link--active");
        let timeout = null;

        Array.from(items).forEach((item) => {
            item.addEventListener("mouseenter", () => {
                title.textContent = item.textContent;
                clearTimeout(timeout);
            });
            item.addEventListener("mouseleave", () => {
                timeout = setTimeout(() => {
                    title.textContent = selected.textContent;
                }, 100);
            });
        });
    }
}
