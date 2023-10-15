interface IUseFetchBackend {
  method: HttpMethod,
  path: string,
}

type HttpMethod = "POST" | "GET" | "PUT" | "DELETE";

const useFetchBackend = ({ method, path }: IUseFetchBackend) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = async (bodyData: any | null) => {    
    const headerData: HeadersInit | undefined = localStorage.getItem("token")
    ? {
        "Content-Type": "application/json",
        "Authorization": String(localStorage.getItem("token")),
      }
    : {
        "Content-Type": "application/json",
      };

    try {
      const response = await fetch(`${apiUrl}${path}`, {
        method: method,
        headers: headerData,
        body: bodyData ? JSON.stringify(bodyData) : undefined,
      })

      if (!response.ok) {
        const fetchedData = await response.json();
  
        if (fetchedData.message) {
          throw new Error(fetchedData.message);
        }
  
        throw new Error("Something went wrong");
      }

      if (response.status === 204)
        return;

      const fetchedData = await response.json();
      return fetchedData;
    } catch (error) {
      return error;
    }
  };

  return fetchData;
};

export default useFetchBackend;
