
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
    const [chartObject,setChartObject] = React.useState({});
    const [hovered, setHovered] = React.useState('None');
    const [focused, setFocused] = React.useState('None');
    const [clicked, setClicked] = React.useState('None');
    const {disease, setDisease} = useContext(diseaseContext);

    const inputRef = useRef();
    const baseUrl = web.base_URI+'/cases/';

   const label = [];
   const dataset = [];
    useEffect(()=> {
        const fetchData = async()=> {
          var allData = await axios.get(baseUrl+disease+query);
          //setData(allData.data);
          if(!allData){
            console.log("No Data");
          }
          const data = allData.data;
          data.map(item=>{
            label.push(item.days);
            dataset.push(item.confirmed);
          });
          setChartObject({
            labels : label,
            datasets : [
              {
                label:`${query.replace('/','')}`,
                data : dataset
              }
            ]
          })
        
        
        }


      fetchData();
        
        
       
    },[clicked,query]) //clicked가 바뀔 때마다 실행됨
 

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
            <Line data={chartObject}/>
          </Col>
        </Row>
        
        
      </div>
    </>
    )

}

export default CountryMap;

//https://dev.to/pallymore/clean-up-async-requests-in-useeffect-hooks-90h