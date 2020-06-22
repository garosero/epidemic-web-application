
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const SearchCountry = () => {
    const [datas,setDatas] = useState({});  //[]만 되는 듯?
    const [query,setQuery] = useState('None');
    const [url, setUrl] = useState(
        'http://localhost:8080/api/country/'
    )

    const baseUrl =  'http://localhost:8080/api/country/'

    useEffect(()=> {
        const fetchData = async ()=> {
            const result = await axios(`http://localhost:8080/api/country/${query}`);
            setDatas(result.data);
        };

        fetchData();
    

    },[url]);


    return(
        <div>
            <input 
                type="text"
                value={query}
                onChange={e=>setQuery(e.target.value)}
            />
           <button onClick={()=>setUrl(`http://localhost:8080/api/country/${query}`)}>click</button>
            {/* {
                datas.map(item=>{
                    return(
                        <div key={item.id}>
                            <>
                                <p>diseas : {item.disease_name}</p>
                                <p>days : {item.days}</p>

                            </>
                        </div>
                    )
                })
            } */}
            
            {
              url === baseUrl ? null
                              : <>
                                  <p>country : {datas.country_name}</p>
                                  <p>continent : {datas.continent}</p>
                                  <p>population : {datas.population}</p>
                                </>
            }
        </div>
    );
}

export default SearchCountry;