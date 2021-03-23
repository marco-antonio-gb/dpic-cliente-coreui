import { defineAbility } from "@casl/ability";
let permisos = JSON.parse(localStorage.getItem("permissions"));

export default defineAbility((can, cannot) => {
	can("read", "all");
	can("update", "Post");
	can("read", "Comment");
	can("update", "Comment");
});
