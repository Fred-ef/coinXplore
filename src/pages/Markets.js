import MarketsCSS from './Markets.module.css';
import CoinTable from "../features/CoinTable";
import { Circles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { getCoinListUrl } from '../utils/getApiUrls';

export default function Markets() {
    const url = getCoinListUrl();
    const [coinsNumber, isLoading, error] = useAxios(url);
    // const [coinsNumber, setCoinsNumber] = useState(0);


    // useEffect(() => {
    //     document.title = 'coinXplore | Markets';
    //     const fetchCoinsNumber = async () => {
    //         try {
    //             const data = await api.getCoinList();
    //             setCoinsNumber(data.length);
    //         } catch(e) {
    //             console.error("CoinTable:\n"+e);
    //         }
    //         setLoading(false);
    //     };

    //     fetchCoinsNumber();
    // }, []);


    // ########## Rendering ##########

    if(isLoading) return(
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