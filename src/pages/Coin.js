import { useParams } from "react-router-dom";

import CoinInfo from "../features/CoinInfo";
import CoinChart from "../features/CoinChart";

import CoinCSS from './Coin.module.css';    

export default function Coin() {
    const { id } = useParams();
    document.title = 'coinXplore | '+id;
    return(
        <div className={CoinCSS.container}>
            <CoinInfo id={id}/>
            <CoinChart id={id}/>
        </div>
    );
}