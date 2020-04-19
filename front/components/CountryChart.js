
import React from 'react';
import { VectorMap } from '@south-paw/react-vector-maps';
import world from './world.json';

const CountryChart = ()=>{

    const style = { margin: '1rem auto', width: '300px' };

    const [hovered, setHovered] = React.useState('None');
    const [focused, setFocused] = React.useState('None');
    const [clicked, setClicked] = React.useState('None');
  
    const layerProps = {
      onMouseEnter: ({ target }) => setHovered(target.attributes.name.value),
      onMouseLeave: ({ target }) => setHovered('None'),
      onFocus: ({ target }) => setFocused(target.attributes.name.value),
      onBlur: ({ target }) => setFocused('None'),
      onClick: ({ target }) => setClicked(target.attributes.name.value),
    };

    return (
    <div className="App" >
        <VectorMap {...world} layerProps={layerProps}/>
        <hr />
        <p>Hovered: {hovered && <code>{hovered}</code>}</p>
        <p>Focused: {focused && <code>{focused}</code>}</p>
        <p>Clicked: {clicked && <code>{clicked}</code>}</p>
    </div>
    )

}

export default CountryChart;