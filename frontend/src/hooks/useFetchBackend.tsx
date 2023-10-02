interface IUseFetchBackend {
  method: HttpMethod,
  path: string,
}

type HttpMethod = "POST" | "GET" | "PUT" | "DELETE";

const useFetchBackend = ({ method, path }: IUseFetchBackend) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = async (bodyData: any) => {
    try {
      const response = await fetch(`${apiUrl}/${path}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData ? JSON.stringify(bodyData) : undefined,
      })

      if (!response.ok)
        throw new Error("Something went wrong");

      const fetchedData = await response.json();
      
      return fetchedData;
    } catch (error) {
      return new Error("Something went wrong");
    }
  };

  return fetchData;
};

export default useFetchBackend;
