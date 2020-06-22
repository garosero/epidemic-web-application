import React,{useState, useEffect, useContext} from 'react' ; 
import axios from 'axios';
import styled from 'styled-components'
import { Table } from 'antd';
import DiseaseContext from '../context/DiseaseContext';
import web from '../web_config'

const CountryTable = () => {
    const [countryData, setCountryData] = useState([]);
    const { disease, setDisease } = useContext(DiseaseContext);
    const pushData =[];
    const baseUrl = web.base_URI+'/cases/';
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
            const allData = await axios.get(baseUrl+disease+'/allCountry');
            setCountryData(allData.data);
            // allData.map((item)=>{
            //     pushData.push(item);
            //     console.log(item);
            // });

        }
        fetchData();
    },[disease]);

    function onChange(pagination, filters, sorter, extra){
    }

    return (
        <div className="table">
            <Table columns={columns} dataSource={countryData} onChange={onChange} tableLayout="fixed" tableSize="small" />
           
        </div>
    )
};

export default CountryTable;