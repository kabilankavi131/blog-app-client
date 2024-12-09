import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const prdUrl = "https://blogspace-app-server.vercel.app/getuserblogs";
const localUrl = "http://localhost:5000/getuserblogs";
const client = async (): Promise<any> => {
  const blogConfiguration: AxiosRequestConfig = {
    method: "POST",
    url: prdUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      author_id: 91,
    },
  };

  try {
    const response: AxiosResponse = await axios(blogConfiguration);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return 500;
  } catch (error) {
    console.error("Error making request:", error);
    return 500;
  }
};

export default client;
