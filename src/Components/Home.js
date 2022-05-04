import React, { useState } from 'react';
import { Form, Button, Input } from "antd"
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css"
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
function Home() {
    const [inputValue, setInputValue] = useState(0);

    const dispatch = useDispatch();
    const cash = useSelector(store => store.cash.cash);
    console.log(cash);

    const loseCash = (inputValue) => {
        dispatch({ type: "GET_CASH", payload: inputValue })
    }

    const addCash = (inputValue) => {
        dispatch({ type: "ADD_CASH", payload: inputValue })
    }

    return (
        <div>
            <Form>
                <h1> home</h1>
                <label >{cash} <SmileOutlined /></label>
                <Input type="number" onChange={e => setInputValue(e.target.value)}></Input>
                <Button onClick={() => addCash(Number(inputValue))}>Add cash</Button>
                <Button onClick={() => loseCash(inputValue)}>Lose cash</Button>

            </Form>
            {<Dropdown overlay={menu}>
                <a onClick={e => e.preventDefault()}>
                    <Space>
                        Hover me
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>}</div>
    );

}

const dropDownMenu = () => {
    <Dropdown overlay={menu}>
        <a onClick={e => e.preventDefault()}>
            <Space>
                Hover me
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>
}

const menu = (
    <Menu
        items={[
            {
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        1st menu item
                    </a>
                ),
            },
            {
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                        2nd menu item (disabled)
                    </a>
                ),
                icon: <SmileOutlined />,
                disabled: true,
            },
            {
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                        3rd menu item (disabled)
                    </a>
                ),
                disabled: true,
            },
            {
                danger: true,
                label: 'a danger item',
            },
        ]}
    />
);
export default Home