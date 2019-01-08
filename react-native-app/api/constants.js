const HOSTNAME = "";

const PROTOCOL = "http";
const API_V1 = PROTOCOL + "://" + HOSTNAME + "/v1";

export default {
	"HOSTNAME": API_V1,
	"AUTH_ENDPOINT": API_V1 + "/auth",
	"INSTITUTIONS_ENDPOINT": API_V1 + "/institutions",
	"USERS_ENDPOINT": API_V1 + "/users",
	"EARTHQUAKES_ENDPOINT": API_V1 + "/earthquakes",
	"HEADERS": {
		"Accept": "application/json",
		"Content-Type": "application/json"
	}
};