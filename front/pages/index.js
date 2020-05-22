import React,{useState, useEffect} from 'react' ; 
import axios from 'axios';
import { Row, Col, Statistic , Timeline, Button, Card } from 'antd';
import { ArrowDownOutlined,ArrowUpOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import './index.css'
import Dashboard from '../components/Dashboard'
import CountryTable from '../components/CountryTable';

const Padding = styled(Row)`
    padding-top : 30px;
`;


const Home = ()=> {
    // const [data,setData] = useState(null);
    // axios.get('http://localhost:8080/api/country/',{
    //     params : {id:1}
    // }).then(function(res){
    //     setData(res);
    //     console.log(res);
    // }).catch(function(err){
    //     console.log(err);
    // });
    // const [data, setData] = useState([]);

    //  useEffect(()=>{
    //     const fetchData = async()=>{
    //         const allData = await axios.get('http://localhost:8080/api/cases/allCountry');
    //         setData(allData.data);
    //         console.log(allData);
          

    //     }
    //     fetchData();
    // },[]);


    return (
      <>
        <Dashboard />
        <CountryTable />
      </>
    );
}

export default Home;