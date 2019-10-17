import axios from "axios";
const setApiKey = apiKey => {
  if (apiKey) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["x-api-key"] = apiKey;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["x-api-key"];
  }
};
export default setApiKey;
