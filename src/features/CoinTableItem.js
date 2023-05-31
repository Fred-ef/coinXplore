import { Link } from "react-router-dom";

import CoinTableItemCSS from './CoinTableItem.module.css';
import { formatCurrency } from "../utils/currencyFormatter";

export default function CoinTableItem({ coin, index }) {

    return(coin &&
        <tr>
            <td>
                <p>{index+1}</p>
            </td>
            <td>
                <Link to={'/coins/'+coin.id}>
                    <div className={CoinTableItemCSS.nameBlock}>
                        <img src={coin.image} alt={coin.name} />
                        <p>{coin.name}</p>
                        <p>({coin.symbol})</p>
                    </div>
                </Link>
            </td>
            <td className={CoinTableItemCSS.phoneHidden}>
                <p>{coin.current_price ? formatCurrency(coin.current_price) : '-'}</p>
            </td>
            <td className={CoinTableItemCSS.tabletHidden}>
                <p className={coin.high_24h && CoinTableItemCSS.item_green}>{coin.high_24h ? formatCurrency(coin.high_24h) : '-'}</p>   
            </td>
            <td className={CoinTableItemCSS.tabletHidden}>
                <p className={coin.low_24h && CoinTableItemCSS.item_red}>{coin.low_24h ? formatCurrency(coin.low_24h) : '-'}</p>
            </td>
            <td>
                <p className={coin.price_change_percentage_24h && (coin.price_change_percentage_24h < 0 ? CoinTableItemCSS.item_red : CoinTableItemCSS.item_green)}>{coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2)+'%' : '-'}</p>
            </td>
        </tr>
    )
}