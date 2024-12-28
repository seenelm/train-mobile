import axios from "axios";
import { apiUrl } from "../common/config";

export const api = axios.create({
  baseURL: `${apiUrl}/api`,
});