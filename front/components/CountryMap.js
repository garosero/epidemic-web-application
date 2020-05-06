
import React, {useEffect} from 'react';
import { VectorMap } from '@south-paw/react-vector-maps';
import world from './world.json';
import axios from 'axios';
import './index.css';
import styled from 'styled-components';
import { Menu, Input, Row, Col,Layout } from 'antd';

const CountryMap = ()=>{
    const[data,setData] = React.useState([]);

     //const [data,setData] = React.useState(null);
    // axios.get('http://localhost:8080/api/case/',{
    //     params : {id:1}
    // }).then(function(res){
    //     setData(res);
    //     console.log(res);
    // }).catch(function(err){
    //     console.log(err);
    // });

   
    // axios.get('http://localhost:8080/api/case')
    //       .then(res=>{
    //         console.log("success : " +res);
    //         setData(res);
    //         })
    //       .catch(res=>{console.log(res)});
    

    useEffect(()=> {
      fetch(
        `http://3.23.9.58/api/case/`,
        {
          method : "GET",
          headers: new Headers({
            Accept:"application/json"
          })
        }
      ).then(res => res.json())
      .then(response => {
        setData(response)
      })
    })


    const [hovered, setHovered] = React.useState('None');
    const [focused, setFocused] = React.useState('None');
    const [clicked, setClicked] = React.useState('None');
  
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
            {/* data : {
              data.map(item => {
               return (
                 <div key={item.id}>
                   <p>{item.country_name}</p>
                 </div>
               )
              }) */}
            {
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
            }
          </Col>
        </Row>
        
      </div>
    </>
    )

}

export default CountryMap;