import { useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { getLoginToken } from "../utils/authToken";
import { toast } from "react-toastify";

const useHttp = () => {
  const api = axios.create({ baseURL: "http://localhost:3001" });

  api.interceptors.request.use((config) => {
    const token = getLoginToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  const request = useCallback(async (fetchFunc: () => Promise<any>) => {
    try {
      return await fetchFunc();
    } catch (err: any) {
      toast.error(`${err.response.data.message}`);
    }
  }, []);

  const get = useCallback(
    (url: string) => request(() => api.get(url)),
    [request, api]
  );

  const post = useCallback(
    (url: string, requestData: any, contentType?: string) =>
      request(() => {
        const headers: AxiosRequestConfig["headers"] = {};
        if (contentType) {
          headers["Content-Type"] = contentType;
        }
        return api.post(url, requestData, { headers });
      }),
    [request, api]
  );

  const put = useCallback(
    (url: string, requestData: any, contentType?: string) =>
      request(() => {
        const headers: AxiosRequestConfig["headers"] = {};
        if (contentType) {
          headers["Content-Type"] = contentType;
        }
        return api.put(url, requestData, { headers });
      }),
    [request, api]
  );

  const del = useCallback(
    (url: string, requestData?: any) =>
      request(() => api.delete(url, { data: requestData })),
    [request, api]
  );

  return {
    get,
    post,
    put,
    del
  };
};

export { useHttp };
