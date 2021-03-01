import axios from "axios";
let user = JSON.parse(localStorage.getItem("user"));
let token = "";
if (user && user.access_token) {
	// return { 'Authorization': 'Bearer ' + user.access_token };
	token = user.access_token;
} else {
	token = null;
}
export default axios.create({
	baseURL: "http://rolando.test/dpic_servidor/public/api",
	headers: {
		"Content-type": "application/json",
		Authorization: "Bearer " + token
	}
});
