import axios from "axios";

const baseURL = (
  import.meta.env.VITE_API_URL || "http://localhost:3002/api"
).replace(/\/$/, "");

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@AgnusGestao:token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const message = error.response?.data?.mensagem;

    if (error.code === "ECONNABORTED") {
      error.userMessage =
        "A API demorou para responder. Tente novamente.";
    } else if (!error.response) {
      error.userMessage =
        "Não foi possível conectar à API. Verifique se o backend está em execução.";
    } else if (message) {
      error.userMessage = message;
    } else {
      error.userMessage =
        "Ocorreu um erro ao comunicar com o servidor.";
    }

    return Promise.reject(error);
  }
);