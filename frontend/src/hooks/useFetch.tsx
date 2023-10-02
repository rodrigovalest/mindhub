interface IPropsUseFetch {
  method: string,
  path: string,
  body?: Object,
}

export enum HTTPMethodEnum {
  "POST",
  "GET",
  "PUT",
  "DELETE",
}

export const useFetch = ({ method, path, body }: IPropsUseFetch) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    const response = await fetch(`${apiUrl}/${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    return data;
  };
  
  return fetchData;
};
