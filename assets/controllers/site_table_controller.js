import { Controller } from "@hotwired/stimulus";
import Cookies from "js-cookie";

export default class extends Controller {
    connect() {
        this.element.textContent = "Sites";
        this.timeout = null;

        const activeFolder = Cookies.get("folders-active");

        if (activeFolder) this.load(activeFolder);
    }

    load(id) {
        clearTimeout(this.timeout);
        this.element.textContent = `Loading sites for directory id ${id}`;

        this.timeout = setTimeout(() => {
            this.element.textContent = `Loaded ${id}`;
        }, 2000);
    }
}
