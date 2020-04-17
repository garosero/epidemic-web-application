import React,{useState} from 'react' ; 
import axios from 'axios';
import { Row, Col, Statistic , Timeline, Button, Card } from 'antd';
import { ArrowDownOutlined,ArrowUpOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import './index.css'

const Padding = styled(Row)`
    padding-top : 30px;
`;


const Home = ()=> {
    // const [data,setData] = useState(null);
    // axios.get('http://localhost:8080/api/country/',{
    //     params : {id:1}
    // }).then(function(res){
    //     setData(res);
    //     console.log(res);
    // }).catch(function(err){
    //     console.log(err);
    // });



    return (
        <>
        <Padding gutter={16} justify="center">
            <Col span={6}>
            </Col>
            <Col span={6}>
                <Statistic title="Active Users" value={112893} />
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
                        value={11.28}
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

export default Home;