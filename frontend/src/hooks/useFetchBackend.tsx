interface IPropsUseFetchBackend {
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

export const useFetchBackend = ({ method, path, body }: IPropsUseFetchBackend) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/${path}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      if (!response.ok)
        throw new Error("Something went wrong");

      const fetchedData = await response.json();
      
      return fetchedData;
    } catch (error) {
      return "Something went wrong";
    }
  };

  return fetchData;
};
