import PaginationButtons from "../features/PaginationButtons";
import CoinTableCSS from './CoinTable.module.css';
import CoinTableItem from "./CoinTableItem";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import * as api from '../api/coinsApi';

const coinsPageCache = new Map();

export default function CoinTable({ coinsNumber }) {

    const COINS_PER_PAGE = 100;
    const PAGES_NUMBER = Math.ceil(coinsNumber/COINS_PER_PAGE);

    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    if(searchParams.get('page') && ((searchParams.get('page')<=0 || searchParams.get('page')>PAGES_NUMBER))) {
        setSearchParams(params => {
            params.set('page', '1');
            return params;
        });
    }
    const [page, setPage] = useState((searchParams.get('page') ? searchParams.get('page') : 1));
    const [marketsData, setMarketsData] = useState(null);


    useEffect(() => {

        const fetchCoins = async () => {
            if(coinsPageCache.has(page.toString())) setMarketsData(coinsPageCache.get(page.toString()));
            else {
                setLoading(true);
                try {
                    const data = await api.getMarkets(page, COINS_PER_PAGE);
                    setMarketsData(data);
                    coinsPageCache.set(page.toString(), data);
                } catch(e) {
                    console.error("CoinTable:\n"+e);
                }
                setLoading(false);
            }
        };
        
        fetchCoins();
    }, [page]);


    // ########## Utility functions ##########

    const handlePageChange = (newPage) => {
        if(page !== newPage && newPage > 0 && newPage < PAGES_NUMBER) {
            setPage(newPage);
            setSearchParams(params => {
                params.set('page', newPage.toString());
                return params;
            });
        }
    };


    // ########## Rendering ##########

    if(loading) return(
        <Circles className="loaderContainer" type="ThreeDots" color="aliceblue" />
    );

    if(!marketsData) return(
        <div className={CoinTableCSS.coinLoadError}>
            <div className='errorFrame'>
                <h2>Looks like there is a problem. Maybe the server is down, or the APIs are temporarily blocked. Please, try again in a few minutes.</h2>
            </div>
            <Link className='reloadLink' to='/'>Reload the page</Link>
        </div>
    );

    return(
        <div className={CoinTableCSS.tableFrame}>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th className={CoinTableCSS.phoneHidden}>Price</th>
                        <th className={CoinTableCSS.tabletHidden}>24h high</th>
                        <th className={CoinTableCSS.tabletHidden}>24h low</th>
                        <th>24h change</th>
                    </tr>
                </thead>
                <tbody>
                    {marketsData && marketsData.map((coin, index) => <CoinTableItem key={coin.id} coin={(coin)} index={(page-1)*100+index} />)}
                </tbody>
            </table>
            <PaginationButtons page={page} maxPage={PAGES_NUMBER} changePage={handlePageChange}/>
        </div>
    );
}