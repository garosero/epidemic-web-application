
import React, {useEffect, useState, useRef} from 'react';
import { VectorMap } from '@south-paw/react-vector-maps';
import world from '../SVGCountries/world.json';
import axios from 'axios';
import './index.css';
import styled from 'styled-components';
import { Menu, Input, Row, Col,Layout } from 'antd';
import web from '../web_config';
import { Line } from "react-chartjs-2"

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
    const [data,setData] = React.useState([]);
    const [query,setQuery] = useState('None');
    const [chartObject,setChartObject] = React.useState({});
    const [hovered, setHovered] = React.useState('None');
    const [focused, setFocused] = React.useState('None');
    const [clicked, setClicked] = React.useState('None');

    const inputRef = useRef();
    const baseUrl = web.base_URI+'/cases/';

   const label = [];
   const dataset = [];
    useEffect(()=> {
      axios
      .get(baseUrl + query)
      .then(response => {
        setData(response.data);
      }).then(response => {
      
        data.map(item => {
          label.push(item.days);
          console.log(item.days);
          dataset.push(item.confirmed);
          console.log(item.dataset);
        })
        setChartObject({
          labels : label,
          datasets : [
            {
              label : `${clicked}`,
              data: dataset
            }
          ]
        })
      })
    

    },[chartObject]) //clicked가 바뀔 때마다 실행됨
 

    const handleClick = () => {
      const { current } = inputRef;
      if (current && current.value) setQuery(current.value);
    };

    const layerProps = {
      onMouseEnter: ({ target }) => setHovered(target.attributes.name.value),
      onMouseLeave: ({ target }) => setHovered('None'),
      onFocus: ({ target }) => setFocused(target.attributes.name.value),
     // onBlur: ({ target }) => setFocused('None'),
      onClick: ({ target }) => {
         setClicked(target.attributes.name.value)
         setQuery(target.attributes.name.value)  
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
           <input ref={inputRef} type='text' defaultValue={query} />
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