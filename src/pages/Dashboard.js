import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { DTable } from '../components/DTable'
import { Layout } from '../components/Layout'
import MyForm from '../components/MyForm'

export const Dashboard = () => {
    const [list, setList] = useState([])
    const [user, setUser] = useState({});

    useEffect(() => {
      const userStr = sessionStorage.getItem("logedInUser");
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
    }, []);
  
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
    <Layout>
      <Container>
        <Row>
          <Col>
          <div>Welcom {user.fName}</div>
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
