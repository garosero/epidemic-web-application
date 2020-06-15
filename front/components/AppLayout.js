import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col,Layout, Cascader } from 'antd';
import styled from 'styled-components';
const { Header, Footer, Sider, Content } = Layout;
import './index.css';
import DiseaseContext from '../context/DiseaseContext';
// import {DiseaseProvider} from '../context/DiseaseContext';


const UpMenu = styled(Menu)`
    item {
        margin-left : auto;
        text-align : right;

    }
    text-align : right;
    height : 50px;
`;

const UpCascader = styled(Cascader)`
    text-align : right;
    height : 50px;
    padding-top:5px;
`;

// const Overlay = styled.div`
//     background-color: #dee2e6;
// `;

const infectionOptions = [
    {
        value : 'covid19',
        label : 'COVID-19'
    },
    {
        value : 'sars',
        label : 'SARS'
    }
];

// const diseaseContext = createContext({ disease_name : 'covid19'})
// function onChange(value){
//     diseaseContext = null;
//     const diseaseContext = createContext({disease_name : value});
// }


const AppLayout = ({children}) => {
    const { disease, setDisease } = useContext(DiseaseContext);

    function onChange(value){
        console.log(value);
        setDisease(value);
        console.log("current : "+disease);
    }
    return (
        <div>     
            <Layout>
                <Row>
                    <Col span={21}>
                        <UpMenu className="menu" inlineIndent={20} mode="horizontal">
                            <UpMenu.Item key="home"><Link href="/"><a>Home</a></Link></UpMenu.Item>
                            <UpMenu.Item key="country"><Link href="/country"><a>Country</a></Link></UpMenu.Item>
                            <UpMenu.Item key="statistics"><Link href="/statistics"><a>Statistics</a></Link></UpMenu.Item>
                        </UpMenu>
                    </Col> 
                    <Col span={3}>
                        <UpCascader style={{ verticalAlign: 'middle'}} options={infectionOptions} size="large" onChange={onChange}/>
                    </Col>
                </Row>
                <div id="top-top">
                    <h1 id="top-title" align="center">
                    Disease Information Web
                    </h1>
                </div>
                <div>
                        <Row>
                            {/* <Col span={16} push={8}>
                            <div>                abcd</div>
                            </Col>

                            <Col span={8} pull={16} padding={2}>
                            <WorldMap />
                            </Col> */}
                            {children}
                    </Row>
                </div>

                <Footer>
                    Footer
                </Footer>
            </Layout> 
        </div>

    );
};


AppLayout.prototype = {
    children : PropTypes.node, //렌더링될 수 있는 애들은 다 노드 
};


export default AppLayout;