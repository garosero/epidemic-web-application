
import React, {useEffect, useState, useRef, useContext} from 'react';
import { VectorMap } from '@south-paw/react-vector-maps';
import world from '../SVGCountries/world.json';
import axios from 'axios';
import './index.css';
import styled from 'styled-components';
import { Menu, Input, Row, Col,Layout } from 'antd';
import web from '../web_config';
import { Line } from "react-chartjs-2"
import diseaseContext from '../context/DiseaseContext';

const MapCol = styled(Col)`
  svg {
    stroke: #fff;

    // All layers are just path elements
    path {
      fill: #a82b2b;
      cursor: pointer;
      outline: none;

      // When a layer is hovered
      &:hover {
        fill: rgba(168,43,43,0.83);
      }

      // When a layer is focused.
      &:focus {
        fill: rgba(168,43,43,0.6);
      }

      // When a layer is 'checked' (via checkedLayers prop).
      &[aria-checked='true'] {
        fill: rgba(255,219,88,0.65);
      }

      // When a layer is 'selected' (via currentLayers prop).
      &[aria-current='true'] {
        fill: rgba(255,219,88,0.65);
      }
    
  }
`;


const CountryMap = ()=>{
    //const [data,setData] = React.useState([]);
    const [query,setQuery] = useState('None');
    const [confirmedChartObject,setConfirmedChartObject] = React.useState({});
    const [deathChartObject,setDeathChartObject] = React.useState({});
    const [recoveredChartObject,setRecoveredChartObject] = React.useState({});
    const [predictedChartObject, setPredictedChartObject] = React.useState({});
    const [hovered, setHovered] = React.useState('None');
    const [focused, setFocused] = React.useState('None');
    const [clicked, setClicked] = React.useState('None');
    const {disease, setDisease} = useContext(diseaseContext);
    const [finalDays,setFinalDays] = React.useState(0);
    const [year, setYear] = React.useState();
    const [month, setMonth] = React.useState();
    const [day, setDay] = React.useState();
    const [criteria, setCriteria] = React.useState();


    const inputRef = useRef();
    const baseUrl = web.base_URI+'/cases/';

   const label = [];
   const confirmedDataset = [];
   const recoveredDataset = [];
   const deathDataset = [];

   const label2 = [];
   const predictedDataset = [];
  


   var date;

    useEffect(()=> {
        const fetchData = async()=> {
          var allData = await axios.get(baseUrl+disease+query);
          if(!allData){
            console.log("No Data");
          }
          const data = allData.data; 
          // const criteriaData = success.data; 
          // console.log(criteriaData);
          data.map(item=>{
            label.push(item.days);
            confirmedDataset.push(item.confirmed);
            recoveredDataset.push(item.recovered);
            deathDataset.push(item.death);
          });
          setConfirmedChartObject({
            labels : label,
            datasets : [
              {
                label:`${query.replace('/','')}`,
                data : confirmedDataset
              }
            ]
          });
          setDeathChartObject({
            labels : label,
            datasets : [
              {
                label : `${query.replace('/','')}`,
                data : deathDataset
              }
            ]
          });
          setRecoveredChartObject({
            labels : label,
            datasets : [
              {
                label : `${query.replace('/','')}`,
                data : recoveredDataset
              }
            ]
          });
        
        
        }

      const sendData = async() =>{
        var fittingData = await axios.get(web.base_URI+'/predicted/'+disease+query);
        if(!fittingData){
          console.log("No Data");
        }
        const fitData = fittingData.data;
        fitData.map(item=>{
          label2.push(item.days);
          predictedDataset.push(item.infectious);
        });
        setFinalDays(label2[label2.length-1]);
        console.log("final : "+finalDays);
        var inputDate = String(label[0]).split('-');
        date = new Date(parseInt(inputDate[0]),parseInt(inputDate[1]),parseInt(inputDate[2]));
        date.setDate(date.getDate() + finalDays)
        setYear(date.getFullYear());
        setMonth(date.getMonth());
        setDay(date.getDate());
        setPredictedChartObject({
          labels : label2,
          datasets : [
            {
              label : `${query.replace('/','')}`,
              data : predictedDataset
            }
          ]
        });
      } 

      var criteriaData = async()=>{
        var successData = await axios.get(web.base_URI+'/rsquare/'+disease+query);
        var r = successData.data;
        console.log(r.Rsquare);
        setCriteria(r.Rsquare);
        // console.log(criteria.Rsquare);
      }


      fetchData();
      sendData();
      criteriaData();
      //date.setDate(date.getDate() + finalDays);
      

        
       
    },[clicked,query,finalDays]) //clicked가 바뀔 때마다 실행됨
 

    const handleClick = () => {
      const { current } = inputRef;
      if (current && current.value){ 
         let countryUpper = current.value[0].toUpperCase();
         let countryLower = current.value.substr(1); //첫번째 문자 제거
         console.log("search : "+countryUpper+countryLower.toLowerCase());
         setQuery("/"+countryUpper+countryLower);
      }
    };

    const layerProps = {
      onMouseEnter: ({ target }) => setHovered(target.attributes.name.value),
      onMouseLeave: ({ target }) => setHovered('None'),
      onFocus: ({ target }) => setFocused(target.attributes.name.value),
     // onBlur: ({ target }) => setFocused('None'),
      onClick: ({ target }) => {
         setClicked(target.attributes.name.value)
         setQuery("/"+target.attributes.name.value)  
      },
        
    };

    return (
    <>
      <div className="Map">
        <Row>
          <MapCol span={12}>
             <VectorMap {...world} layerProps={layerProps}/>
          </MapCol>
          <Col span={12}>
              <input ref={inputRef} type='text' defaultValue={query}/>
              <button onClick={handleClick}>Click</button>
            {/* <p>Clicked: {clicked && <code>{clicked}</code>}</p> */}
            {/* {
              data.map(item =>{
                return (
                  <div key={item.id}>
                    {clicked === item.country_name ? (
                      <>
                        <p>disease_name : {item.disease_name}</p>
                        <p>days : {item.days}</p>
                        <p>confirmed : {item.confirmed}</p>
                        <p>death : {item.death}</p>
                        <p>recovered : {item.recovered}</p>
                      </>
                    ) : null
                  }              
                  </div>
                )
              })
            }  */}
            {
              
            }
            <p>{query.replace('/','')} Predicted Chart</p>
            <p className="rs">success criteria : {criteria} / 0.5</p>
            <Line data={predictedChartObject}/>
            <p>{year}년 {month}월 {day}일 종식 예측</p>
          </Col>
        </Row>
      </div>

      <div className="middle-chart-1">
            <p>{query.replace('/','')} Confirmed Chart</p>
            <Line data={confirmedChartObject}/>
      </div>
      <div className="middle-chart-1">
            <p>{query.replace('/','')} Death Chart</p>
            <Line data={deathChartObject}/>
      </div>
      <div className="middle-chart-2">
            <p>{query.replace('/','')} Recovered Chart</p>
            <Line data={recoveredChartObject}/>
      </div>
    </>
    )

}

export default CountryMap;

//https://dev.to/pallymore/clean-up-async-requests-in-useeffect-hooks-90h