const apiConnect = () => {
  const postRequest = (
    url: string,
    body: object,
    method?: string
  ): Promise<any> => {
    const token = localStorage.getItem("token");

    return fetch(
      `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api${url}`,
      {
        method: method || "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
  };

  const getRequest = (url: string, params: object): Promise<any> => {
    const token = localStorage.getItem("token");
    return fetch(
      `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api${url}?` +
        new URLSearchParams({ ...params }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return { postRequest, getRequest };
};

export const api = apiConnect();
