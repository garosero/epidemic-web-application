import React,{useState, useEffect} from 'react' ; 
import axios from 'axios';
import styled from 'styled-components'
import web from '../web_config';
import { Table } from 'antd';

const CountryTable = () => {
    const [countryData, setCountryData] = useState([]);
    const pushData =[];
    const columns = [
        {
            title: 'Country',
            dataIndex : 'country_name',
        

        },
        {
            title : 'Confirmed',
            dataIndex : 'confirmed',
            defaultSortOrder : 'ascend',
            sorter : (a,b)=>b.confirmed - a.confirmed,

        },
        {
            title : 'Death',
            dataIndex : 'death',
            defaultSortOrder : 'ascend',
            sorter : (a,b)=>b.death - a.death,
        },
        {
            title : 'Recoverd',
            dataIndex : 'recovered',
            defaultSortOrder : 'ascend',
            sorter : (a,b)=>b.recovered - a.recovered,
        }

    ];

    useEffect(()=>{
        const fetchData = async()=>{
            const allData = await axios.get('http://localhost:8080/api/cases/allCountry');
            setCountryData(allData.data);
            console.log(allData);
            // allData.map((item)=>{
            //     pushData.push(item);
            //     console.log(item);
            // });

        }
        fetchData();
    },[]);

    function onChange(pagination, filters, sorter, extra){
        console.log('params',pagination,filters,sorter,extra);
    }

    return (
        <div className="table">
            <Table columns={columns} dataSource={countryData} onChange={onChange} tableLayout="fixed" tableSize="small" />
           
        </div>
    )
};

export default CountryTable;