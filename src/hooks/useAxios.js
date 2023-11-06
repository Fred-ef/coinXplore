import { useEffect, useState } from "react"
import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/coins/',
});

export default function useAxios({url, method = 'get', body = null, headers = null}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(url)
            .then(res => {
                if(!res.ok) {
                    throw Error('could not fetch data');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [url, method, body, headers]);  

    return [data, isLoading, error];
}