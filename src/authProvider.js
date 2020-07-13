import axios from "axios";

const apiUrl = "http://localhost:4040";

export default {
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    // accept all username/password combinations
    return new Promise((resolve, reject) => {
      axios
        .post(`${apiUrl}/auth/login`, {
          email: username,
          password,
        })
        .then((res) => {
          if (res.data.user.role === "ADMIN") {
            localStorage.setItem("token", res.data.token);
            return resolve();
          }
          return reject();
        });
    });
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
