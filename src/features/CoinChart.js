import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import CoinChartCSS from './CoinChart.module.css';
import useAxios from "../hooks/useAxios";
import { getCoinChartUrl } from "../utils/getApiUrls";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
  

export default function CoinChart({ id }) {

    const url = getCoinChartUrl(id);
    const [response, isLoading, error] = useAxios(url);

    // const [response, setResponse] = useState(null);
    const [options, setOptions] = useState(null);
    const [data, setData] = useState(null);

    // useEffect(() => {
    //     const fetchPageNumber = async () => {
    //         try {
                
    //             const data = await api.getCoinChart(id);
    //             setResponse(data);
    //         } catch(e) {
    //             console.error("CoinChart.js:\n"+e);
    //         }
    //     };

    //     fetchPageNumber();
    // }, [id]);

    useEffect(() => {
        if(response) {
            const currDateInMs = new Date().getTime();
            const lastWeekInMs = currDateInMs - 604800*1000;
            const intervalLength = parseInt((currDateInMs-lastWeekInMs)/response.prices.length);

            const labels = response.prices.map((_, index) => {
                return new Date(lastWeekInMs+(index*intervalLength)).toLocaleString()
            });
            const chartData = response.prices.map(value => ({x: value[0], y: value[1].toFixed(8)}));

            setOptions({
                plugins: {
                    legend: {
                        display: false
                    },
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                responsive: true
            });
            setData({
                labels: labels,
                datasets: [
                    {
                    fill: true,
                    data: chartData.map(value => value.y),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)'
                    },
                ],
            });
        }
    }, [response]);


    // ########## Rendering ##########

    if(!response || !options || !data) return(<></>);

    return(
        <div className={CoinChartCSS.chartContainer}>
            <div className={CoinChartCSS.chartFrame}>
                <h4>Price evolution in the last week:</h4>
                <Line className={CoinChartCSS.chart} options={options} data={data} />
            </div>
        </div>
    );
}