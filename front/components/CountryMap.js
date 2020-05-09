
import React, {useEffect, useState} from 'react';
import { VectorMap } from '@south-paw/react-vector-maps';
import world from './world.json';
import axios from 'axios';
import './index.css';
import styled from 'styled-components';
import { Menu, Input, Row, Col,Layout } from 'antd';
// import Chart from './Chart';
// import C3Chart from 'react-c3js';
// import 'c3/c3.css';
import { Line } from "react-chartjs-2"

const CountryMap = ()=>{
    const [data,setData] = React.useState([]);
    const [chartObject,setChartObject] = React.useState({});
    const [hovered, setHovered] = React.useState('None');
    const [focused, setFocused] = React.useState('None');
    const [clicked, setClicked] = React.useState('None');

     //const [data,setData] = React.useState(null);
    // axios.get('http://localhost:8080/api/case/',{
    //     params : {id:1}
    // }).then(function(res){
    //     setData(res);
    //     console.log(res);
    // }).catch(function(err){
    //     console.log(err);
    // });


   const label = [];
   const dataset = [];
    useEffect(()=> {
      fetch(
        `http://localhost:8080/api/case/${clicked}`,
        {
          method : "GET",
          headers: new Headers({
            Accept:"application/json"
          })
        }
      ).then(res => res.json())
      .then(response => {
        setData(response);
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
    },[clicked]) //clicked가 바뀔 때마다 실행됨

    // const changeData = () => {
    //   fetch(
    //         `http://localhost:8080/api/case/${clicked}`,
    //         {
    //           method : "GET",
    //           headers: new Headers({
    //             Accept:"application/json"
    //           })
    //         }
    //       )
    //   .then(response => {
    //     setData(response);
    //   }).then(response => {
    //     data.map(item => {
    //       label.push(item.days);
    //       console.log(item.days);
    //       dataset.push(item.confirmed);
    //       console.log(item.dataset);
    //     })
    //     setChartObject({
    //       labels : label,
    //       datasets : [
    //         {
    //           label : `${clicked}`,
    //           data: dataset
    //         }
    //       ]
    //     })
    //   })
     
    // }
  
    const layerProps = {
      onMouseEnter: ({ target }) => setHovered(target.attributes.name.value),
      onMouseLeave: ({ target }) => setHovered('None'),
      onFocus: ({ target }) => setFocused(target.attributes.name.value),
     // onBlur: ({ target }) => setFocused('None'),
      onClick: ({ target }) => setClicked(target.attributes.name.value),
    };

    return (
    <>
      <div className="Map">
        <Row>
          <Col span={12}>
             <VectorMap {...world} layerProps={layerProps}/>
          </Col>
          <Col span={12}>
            <p>Hovered: {hovered && <code>{hovered}</code>}</p>
            <p>Focused: {focused && <code>{focused}</code>}</p>
            <p>Clicked: {clicked && <code>{clicked}</code>}</p>
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