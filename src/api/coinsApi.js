import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/coins/',
});

export const getCoinList = async () => {
    const res = await api.get('/list?include_platform=false');
    return res.data
}

export const getMarkets = async (page, coinsPerPage) => {
    const res = await api.get('/markets?vs_currency=usd&order=market_cap_desc&per_page='+coinsPerPage+'&page='+page+'&sparkline=false&locale=en');
    return res.data;
}

export const getCoinDetails = async (id) => {
    const res = await api.get(id+'?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false');
    return res.data;
}

export const getCoinChart = async (id) => {
    const res = await api.get(id+'/market_chart?vs_currency=usd&days=7');
    return res.data;
}