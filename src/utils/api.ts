const apiConnect = (token: string) => {
  const postRequest = (
    url: string,
    body: object,
    method?: string
  ): Promise<any> => {
    return fetch(
      `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api${url}`,
      {
        method: "POST" || method,
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

const token = localStorage.token;
export const api = apiConnect(token);
