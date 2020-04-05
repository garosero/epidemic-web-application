import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';

const UpMenu = styled(Menu)`
    background : #ffffff;
    text-align : right;
    height : 60px;
    margin-top : 1rem;
    margin-bottom : 1rem;
`;

const Overlay = styled.div`
    background-color: #dee2e6;
`;

const { SubMenu } = Menu;

const AppLayout = ({children}) => {
    return (
        <Overlay>
            <UpMenu className="menu" inlineIndent={20} mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>국내</a></Link></Menu.Item>
                <Menu.Item key="abroad"><Link href="/profile"><a>국외</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle'}} />
                </Menu.Item>
            </UpMenu> 
            <Row gutter={10}>
                <Col xs={24} md={3}>
                    <Menu mode="inline">
                        <Menu.Item>option1</Menu.Item>
                        <Menu.Item>option1</Menu.Item>
                    </Menu>
                </Col>
                <Col xs={24} md={18}>
                    {children}
                </Col>
           </Row>
        </Overlay>

    );
};


AppLayout.prototype = {
    children : PropTypes.node, //렌더링될 수 있는 애들은 다 노드 
};


export default AppLayout;