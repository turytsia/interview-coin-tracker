import { useState } from "react";

export const retrieveData = async () => {
  try {
    const response = await fetch("https://api.coincap.io/v2/assets");
    return (await response.json()).data;
  } catch (error) {
    console.error(error);
  }
};

export default function useHttp(request) {
  const [isLoading, setLoading] = useState(false);

  const requestHandler = async () => {
    setLoading(true);
    const response = await request();
    setLoading(false);

    return response;
  };

  return [requestHandler, isLoading];
}
