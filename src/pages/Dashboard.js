import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { DTable } from '../components/DTable'
import { Layout } from '../components/Layout'
import MyForm from '../components/MyForm'

export const Dashboard = ({user}) => {
    const [list, setList] = useState([])
    const addTransaction = (data) =>{
      setList([
        ...list, data
      ])
    }
    // console.log(list)
  
    const handleOnDelete = (id) =>{
      if(window.confirm("Are you sure you want to delete this transaction")){
        const tempArg = list.filter((item, i) => i !==id)
        setList(tempArg)
      }
      
    }
  return (
    <Layout user ={user}>
      <Container>
        <Row>
          <Col>
            <h2 className="text-center mt-5 title">Finance Tracker</h2>
          </Col>
        </Row>
        <hr />

        {/* form */}
        <MyForm transaction={addTransaction} />
        {/* table */}

        <DTable list={list} handleOnDelete={handleOnDelete} />
      </Container>
    </Layout>
  )
}
