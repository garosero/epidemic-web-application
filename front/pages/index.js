import React,{useState} from 'react' ; 
import axios from 'axios';
import { Row, Col, Statistic , Timeline, Button, Card } from 'antd';
import { ArrowDownOutlined,ArrowUpOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import './index.css'
import Dashboard from '../components/Dashboard'

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



    return (
      <Dashboard />
    );
}

export default Home;