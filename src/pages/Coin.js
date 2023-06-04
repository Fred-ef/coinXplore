import { useParams } from "react-router-dom";

import CoinInfo from "../features/CoinInfo";
import CoinChart from "../features/CoinChart";

import CoinCSS from './Coin.module.css';    
import { useEffect, useState } from "react";

let counter = 0;

export default function Coin() {
    const { id } = useParams();

    useEffect(() => {
        document.title = 'coinXplore | bella zi x'+counter;
    }, []);

    return(
        <div className={CoinCSS.container}>
            <CoinInfo id={id}/>
            <CoinChart id={id}/>
        </div>
    );
}