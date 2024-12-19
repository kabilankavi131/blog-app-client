import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const client = async (
  endpoint: string,
  method: string,
  payload: Record<string, any> // Specify payload as a record of key-value pairs
): Promise<any> => {
  const blogConfiguration: AxiosRequestConfig = {
    method: method,
    url: endpoint,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: payload,
  };

  try {
    const response: AxiosResponse = await axios(blogConfiguration);
    if (response.status >= 200 && response.status < 300) {
      return response.data; // Returns the response data on success
    }
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error: any) {
    console.error("Error making request:", error);
    // Optionally return a more descriptive error object
    return { error: error.message || "An unknown error occurred." };
  }
};

export default client;
