import React,{useState} from 'react' ; 
import axios from 'axios';

const Home = ()=> {
    const [data,setData] = useState(null);
    axios.get('http://localhost:8080/api/country/',{
        params : {id:1}
    }).then(function(res){
        setData(res);
        console.log(res);
    }).catch(function(err){
        console.log(err);
    });

    return (
        <div>
            <div>{data && <textarea rows={7} value={JSON.stringify(data,null,2)} readOnly={true}/>}</div>
        </div>
    );
}

export default Home;