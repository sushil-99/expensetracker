import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const initailState = {
    type: "",
    title: "",
    amount: "",
    date: ""
}

export const MyForm = ({transaction}) => {
    const [formData, setFormData] = useState({initailState})

    const handleInput =(e) =>{
        const {name, value} = e.target
        setFormData({
            ...formData, [name]:value
        })   
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        transaction(formData)
        setFormData(initailState)
    }

    console.log(formData)
    return (
        <Form onSubmit={handleOnSubmit} className='border p-2 rounded shadow-lg'>
            <Row className='gap-2'>
                <Col md = {2}>
                    <Form.Select onChange={handleInput} name="type" required defaultValue={formData.type}>
                        <option>Type...</option>
                        <option value="income">Income</option>
                        <option value="expenses">Expenses</option>
                    </Form.Select>
                </Col>
                <Col md = {3}>
                    <Form.Control onChange={handleInput} name="title" placeholder="Transaction name" required value={formData.title}/>
                </Col>
                <Col md = {2}>
                    <Form.Control onChange={handleInput} type="number" name="amount" placeholder="Amount" required value={formData.amount}/>
                </Col>
                <Col md = {3}>
                    <Form.Control onChange={handleInput} type="date" name="date" required/>
                </Col>
                <Col md = {2}>
                    <Button type="submit"><i class="fa-solid fa-plus"></i> Add</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default MyForm;
