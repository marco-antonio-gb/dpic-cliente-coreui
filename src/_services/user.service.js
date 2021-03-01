import { authHeader } from "../_helpers";
import CONFIG from "../config/index";
export const userService = {
	login,
	logout,
	getAll
};
function login(email, password) {
	const requestOptions = {
		method: "POST",
		headers: authHeader(),
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password })
	};
	// console.log(authHeader().Authorization);
	return fetch(`${CONFIG.URL_API_AUTH}/auth/login`, requestOptions)
		.then(handleResponse)
		.then(user => {
			if (user.access_token) {
				localStorage.setItem("user", JSON.stringify(user));
			}
			return user;
		});
}
function logout() {
	localStorage.removeItem("user");
	localStorage.removeItem("currentEvent");
}
function getAll() {
	const userId = JSON.parse(localStorage.getItem("user"));
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	};
	return axios
		.get(
			`${CONFIG.URL_API}/usuarios/${userId.user["idUsuario"]}`,
			requestOptions
		)
		.then(response => {
			return response.data;
		});
}
function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				logout();
			}
			const error = data.error;
			return Promise.reject(error);
		}
		return data;
	});
}
