import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const client = async (endpoint: any, method: any, data: any): Promise<any> => {
  const blogConfiguration: AxiosRequestConfig = {
    method: method,
    url: endpoint,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
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
