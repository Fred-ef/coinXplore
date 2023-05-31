import MarketsCSS from './Markets.module.css';
import CoinTable from "../features/CoinTable";
import { Circles } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import * as api from '../api/coinsApi';
import { Link } from 'react-router-dom';

export default function Markets() {
    document.title = 'coinXplore | Markets';
    const [coinsNumber, setCoinsNumber] = useState(0);
    const [loading, setLoading] = useState(true);
    console.log("In Markets");


    useEffect(() => {
        const fetchCoinsNumber = async () => {
            try {
                const data = await api.getCoinList();
                console.log("Num monete: "+data.length);
                setCoinsNumber(data.length);
            } catch(e) {
                console.error("CoinTable:\n"+e);
            }
            setLoading(false);
        };

        fetchCoinsNumber();
    }, []);


    // ########## Rendering ##########

    if(loading) return(
        <div className={MarketsCSS.container}>
            <Circles className="loaderContainer" type="ThreeDots" color="aliceblue" />
        </div>
    );

    if(!coinsNumber) return(
        <div className={MarketsCSS.container}>
            <div className='errorFrame'>
                <h2>Looks like there is a problem. Maybe the server is down, or the APIs are temporarily blocked. Please, try again in a few minutes.</h2>
            </div>
            <Link className='reloadLink' to='/'>Reload the page</Link>
        </div>
    );

    return(
        <div className={MarketsCSS.container}>
            <CoinTable coinsNumber={coinsNumber}/>
        </div>
    );
}