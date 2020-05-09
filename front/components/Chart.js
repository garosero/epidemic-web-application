import React, {useEffect} from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';


// const Chart = () => {
//     const LineChart = ({data}) => {
//         <C3Chart data={{ json : data}} />;
//     }

//     const chartData ={
//         line : {
//             data1: [30,20,50,40,60,50],
//             data2: [200,100,120,100,50,80]
//         }
//     }

//     return (
//         <div>
//             <LineChart data={chartData.line}/>
//         </div>
//     );
// };


const Chart = () => {
    
    const data = {
        columns : [
            ['data1',30,100,200,400,150],
            ['data2',50,100,40,350,120]
        ]
    };

    return (
        <div>
            <C3Chart data={data} />
        </div>
    );
}

export default Chart;