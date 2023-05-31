import CoinInfoCSS from './CoinInfo.module.css';
import { formatCurrency } from "../utils/currencyFormatter";
import { useEffect, useState } from "react";
import { Circles } from 'react-loader-spinner';
import * as api from '../api/coinsApi';

export default function CoinInfo({ id }) {
    
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPageNumber = async () => {
            try {
                const data = await api.getCoinDetails(id);
                setResponse(data);
            } catch(e) {
                console.error("CoinInfo.js:\n"+e);
            }
            setLoading(false)
        };

        fetchPageNumber();
    }, [id]);


    // ########## Rendering ##########

    if(loading) return(
        <Circles className="loaderContainer" type="ThreeDots" color="aliceblue" />
    );

    if(!response) return(
        <div className={CoinInfo.coinNotFound}>
            <div className='errorFrame'>
                <h2>Sorry! We couldn't find the coin you requested!</h2>
            </div>
        </div>
    );

    return(
        <div className={CoinInfoCSS.coinInfoFrame}>
            <div className={CoinInfoCSS.infoWrapper}>
                <div className={CoinInfoCSS.headInfo}>
                    <div className={CoinInfoCSS.coinName}>
                        <img src={response.image.small} alt={response.name} />
                        <h1>{response.name}</h1><h2>({response.symbol})</h2>
                    </div>
                        <div className={CoinInfoCSS.coinPrice}>
                        {response.market_data.current_price.usd && formatCurrency(response.market_data.current_price.usd)}
                    </div>
                </div>

                <div className={CoinInfoCSS.secondaryInfo}>
                    <h2>High 24h: {response.market_data.high_24h.usd && formatCurrency(response.market_data.high_24h.usd)}</h2>
                    <h2>Low&nbsp; 24h: {response.market_data.low_24h.usd && formatCurrency(response.market_data.low_24h.usd)}</h2>
                </div>
            </div>
            <div className={CoinInfoCSS.priceDetails}>
                <h2>Price changes:</h2>
                <div className={CoinInfoCSS.priceChanges}>
                    <h3 className={response.market_data.price_change_percentage_24h < 0 ? CoinInfoCSS.textRed : CoinInfoCSS.textGreen}>24h: {response.market_data.price_change_percentage_24h.toFixed(2)}%</h3>
                    <h3 className={response.market_data.price_change_percentage_7d < 0 ? CoinInfoCSS.textRed : CoinInfoCSS.textGreen}>7d: {response.market_data.price_change_percentage_7d.toFixed(2)}%</h3>
                    <h3 className={response.market_data.price_change_percentage_14d < 0 ? CoinInfoCSS.textRed : CoinInfoCSS.textGreen}>14d: {response.market_data.price_change_percentage_14d.toFixed(2)}%</h3>
                    <h3 className={response.market_data.price_change_percentage_30d < 0 ? CoinInfoCSS.textRed : CoinInfoCSS.textGreen}>1m: {response.market_data.price_change_percentage_30d.toFixed(2)}%</h3>
                    <h3 className={response.market_data.price_change_percentage_60d < 0 ? CoinInfoCSS.textRed : CoinInfoCSS.textGreen}>2m: {response.market_data.price_change_percentage_60d.toFixed(2)}%</h3>
                    <h3 className={response.market_data.price_change_percentage_200d < 0 ? CoinInfoCSS.textRed : CoinInfoCSS.textGreen}>200d: {response.market_data.price_change_percentage_200d.toFixed(2)}%</h3>
                    <h3 className={response.market_data.price_change_percentage_1y < 0 ? CoinInfoCSS.textRed : CoinInfoCSS.textGreen}>1y: {response.market_data.price_change_percentage_1y.toFixed(2)}%</h3>
                </div>
            </div>
            <p className={CoinInfoCSS.coinDescription} dangerouslySetInnerHTML={{__html: response.description.en}}></p>
        </div>
    );
}