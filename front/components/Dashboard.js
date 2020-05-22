import React,{useState, useEffect} from 'react' ; 
import axios from 'axios';
import { Row, Col, Statistic , Timeline, Button, Card } from 'antd';
import { ArrowDownOutlined,ArrowUpOutlined} from '@ant-design/icons';
import styled from 'styled-components'
import web from '../web_config';

const Padding = styled(Row)`
    padding-top : 30px;
`;


const Dashboard = ()=> {
    const [todayData, setTodayData] = useState({});
    const [yesterData,setYesterData] = useState({});
    const [url, setUrl] = useState(web.base_URI+'/cases/confirmed');

    useEffect(()=>{
        const fetchToday = async () => {
            const today = await axios(url+'/1');
            console.log("today" + today.data.confirmed);
            setTodayData(today.data);   
            console.log('base :'+web.base_URI);
        }
        
        fetchToday();
    },[]);

    useEffect(()=>{
        const fetchYesterday = async() => {
            const yesterday = await axios(url+'/2');
            console.log("yesterday" + (yesterday.data.confirmed));
            setYesterData(yesterday.data);
            
        };
        fetchYesterday();

    },[]);

    



    return (
        <div className="dashboard">
        <Padding gutter={16} justify="center">
            <Col span={6}>
            </Col>
            <Col span={6}>
                <Statistic title="World Active Cases" value={todayData.confirmed} />
            </Col>
            <Col span={6}>
                <Statistic title="World Death Cases" value={todayData.death} />
                <Button style={{ marginTop: 16 }} type="primary">
                    Recharge
                </Button>
            </Col>
            <Col span={6}>
            </Col>
        </Padding>
        <div className="site-statistic-demo-card">
            <Padding gutter={16}>
                <Col span={6}>
                </Col>
                <Col span={6}>
                    <Card>
                    <Statistic
                        title="Active"
                        value={((todayData.confirmed/(yesterData.confirmed-todayData.confirmed))-1)*100}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={(yesterData.confirmed-todayData.confirmed) - todayData.confirmed >0 ?
                            <ArrowDownOutlined/> : <ArrowUpOutlined />}
                        suffix="%"
                    />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                    <Statistic
                        title="death"
                        value={((todayData.death/(yesterData.death-todayData.death))-1)*100}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={(yesterData.death-todayData.death) -todayData.death > 0 ? 
                                                         <ArrowDownOutlined/> : <ArrowUpOutlined />}
                        suffix="%"
                    />
                    </Card>
                </Col>
                <Col span={6}>
                 </Col>
            </Padding>
        </div>,

        </div>
    );
}

export default Dashboard;