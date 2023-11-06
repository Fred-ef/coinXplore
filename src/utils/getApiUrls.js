export const getCoinListUrl = async () => {
    return '/list?include_platform=false';
}

export const getMarketsUrl = async (page, coinsPerPage) => {
    return '/markets?vs_currency=usd&order=market_cap_desc&per_page='+coinsPerPage+'&page='+page+'&sparkline=false&locale=en';
}

export const getCoinDetailsUrl = async (id) => {
    return id+'?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false';
}

export const getCoinChartUrl = async (id) => {
    return id+'/market_chart?vs_currency=usd&days=7';
}