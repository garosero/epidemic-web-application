import React,{useState, useEffect} from 'react' ; 
import axios from 'axios';
import { Row, Col, Statistic , Timeline, Button, Card } from 'antd';
import { ArrowDownOutlined,ArrowUpOutlined} from '@ant-design/icons';
import styled from 'styled-components'

const Padding = styled(Row)`
    padding-top : 30px;
`;


const Dashboard = ()=> {
    const [todayData, setTodayData] = useState();
    const [yesterData,setYesterData] = useState({});
    const [url, setUrl] = useState('http://localhost:8080/api/cases/confirmed');

    useEffect(async()=>{
    
           const today = await axios('http://localhost:8080/api/cases/confirmed/1');
            console.log("today" + today.data);
            setTodayData(today.data);   
    },[]);

    useEffect(async()=>{
       const yesterday = await axios('http://localhost:8080/api/cases/confirmed/2')
        console.log("yesterday" + yesterday.data);
        setYesterData(yesterday.data);
    },[])



    return (
        <>
        <Padding gutter={16} justify="center">
            <Col span={6}>
            </Col>
            <Col span={6}>
                <Statistic title="Active Users" value={todayData} />
            </Col>
            <Col span={6}>
                <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
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
                        value={todayData - (yesterData - todayData)}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                    <Statistic
                        title="Idle"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                    />
                    </Card>
                </Col>
                <Col span={6}>
                 </Col>
            </Padding>
        </div>,

        </>
    );
}

export default Dashboard;