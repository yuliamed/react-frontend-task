import React, { useState } from 'react';
import { Form, Button, Input } from "antd"
import { useDispatch, useSelector } from "react-redux";

function Home() {
    const [inputValue, setInputValue] = useState(0);

    const dispatch = useDispatch();
    const cash = useSelector(store => store.cash.cash);
    //console.log(cash);

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
                <label >{cash} </label>
                <Input type="number" onChange={e => setInputValue(e.target.value)}></Input>
                <Button onClick={() => addCash(Number(inputValue))}>Add cash</Button>
                <Button onClick={() => loseCash(inputValue)}>Lose cash</Button>

            </Form>
        </div>
    );

}

export default Home