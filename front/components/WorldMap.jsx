
import React from 'react';
import './index.css'

const World = require('react-world-map');



const WorldMap = ()=>{

  return(
    <div>
      <World />
    </div>
  );
}
if (typeof window !== 'undefined') {
  // it's safe to use window now
  window.addEventListener('WorldMapClicked', function(e) {console.log('map was clicked, current selection is: ', e.detail.clickedState)});

};

export default WorldMap;