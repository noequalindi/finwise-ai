import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function sendQuestion(formData) {
  const response = await axios.post(`${API_URL}/ask`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
