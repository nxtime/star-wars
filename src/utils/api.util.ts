import axios from "axios";
import { ApiStatus } from "@/models/api.model";

const SERVER_URL = "http://192.168.1.19:7979";

const baseURL = SERVER_URL;

export const api = axios.create({
  baseURL
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use((response) => {
  if ([ApiStatus.BAD_REQUEST, ApiStatus.UNAUTHORIZED].includes(response.status)) {
    return Promise.reject("Login not Authorized");
  }

  return response;
});
