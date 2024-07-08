import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

const register = async (username, email, phone, role, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    phone,
    role,
    password,
  });
};

const login = async (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = async () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
