import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col,Layout } from 'antd';
import styled from 'styled-components';
const { Header, Footer, Sider, Content } = Layout;
import './index.css';

const UpMenu = styled(Menu)`
    text-align : right;
    height : 50px;
`;

// const Overlay = styled.div`
//     background-color: #dee2e6;
// `;


const AppLayout = ({children}) => {
    return (
        <div>
            <Layout>
                <UpMenu className="menu" inlineIndent={20} mode="horizontal">
                    <UpMenu.Item key="home"><Link href="/"><a>Home</a></Link></UpMenu.Item>
                    <UpMenu.Item key="continent"><Link href="/continent"><a>대륙별</a></Link></UpMenu.Item>
                    <UpMenu.Item key="country"><Link href="/country"><a>국가별</a></Link></UpMenu.Item>
                    <UpMenu.Item key="search"><Link href="/search"><a>검색</a></Link></UpMenu.Item>
                    <UpMenu.Item key="mail">
                        <Input.Search enterButton style={{ verticalAlign: 'middle'}} />
                    </UpMenu.Item>
                </UpMenu> 
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