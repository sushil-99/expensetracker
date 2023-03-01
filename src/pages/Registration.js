import React, { useState } from "react";
import { Button, Form} from "react-bootstrap";
import { CustomInput } from "../components/CustomInput";

import { Layout } from "../components/Layout";
import {  toast } from 'react-toastify'
import { randomStrGenerator } from "../utils";


//falsy: false, 0, undefined, null
//truthy: true, 123, "asdfsd", {}, []
const initialState ={
    fName: "",
    lName: "",
    email: "",
    password:"",
    passwordConfirm: ""
}
export const Registration = () => {
 
    const [frm, setFrm] = useState({})
    const [error, setError] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setError("")
        if(name === 'password'){
            value.length < 6 && setError("Password must be at least 6 characters")

            !/[0-9]/.test(value) && setError("At least 1 number is required")

            !/[A-Z]/.test(value) && setError("At least 1 uppercase is required")

            !/[a-z]/.test(value) && setError("At least 1 lowercase is required")
        }

        setFrm({ ...frm, [name]: value })
    }

    const handleOnSubmit =(e) =>{

        e.preventDefault()
        
        const{passwordConfirm, ...rest} = frm

        if(passwordConfirm !== rest.password){
            return toast.error("Password donot match")
        }

        //reading data from local storage
        const oldUsersStr = localStorage.getItem("users")
        const oldUsers = oldUsersStr ?JSON.parse(oldUsersStr) : []

        //CHECK IF USER ALREADY EXIST FOR THE GIVEN EMAIL
        const isExist = oldUsers.find((email) => email === rest.email)

        if(isExist){
            toast.error("This email already have an account")
        }
        
       
        //Storing data in local storage
        localStorage.setItem("users", JSON.stringify([...oldUsers,
             {...rest, id:randomStrGenerator(6)}]))
        toast.success("Your account has been created, you may login now")
        setFrm(initialState)
    }

    const inputs = [
        {
            value:frm.fName,
            label: "First Name",
            name: "fName",
            required: true,
            placeholder: "sam",
        },
        {
            value:frm.fLame,
            label: "Last Name",
            name: "lName",
            required: true,
            placeholder: "smith",
        },
        {
            value:frm.email,
            label: "Email",
            name: "email",
            type: "email",
            required: true,
            placeholder: "sam@email.com",
        },
        {
            value:frm.password,
            label: "Password",
            name: "password",
            type: "password",
            required: true,
            placeholder: "****",
        },
        {
            value:frm.passwordConfirm,
            label: "Confirm Password",
            name: "passwordConfirm",
            type: "password",
            required: true,
            placeholder: "****",
        },
    ];

    return (
        <Layout>
            <div className="w-50 m-auto">
                <Form onSubmit={
                    handleOnSubmit} className=" mt-5 border p-3 py-5 rounded shadow-lg">
                    <h3>Join our system now!</h3>
                    <hr />
                    {inputs.map((item, i) => (
                        <CustomInput key={i} {...item} onChange={handleOnChange} />
                    ))}

                    <Form.Group>
                        <Form.Text>
                            Your password must contain at least 6 characters including at least 1 number uppercase asnd lowercase
                        </Form.Text>
                        {
                            error && 
                            <ul>
                                <li className="text-danger fw-bolder mt-3">{error}</li>
                            </ul>
                        }
                    </Form.Group>
                    <div className="d-grid py-3">
                        <Button disabled={error} variant="primary" type="submit">
                            Register
                        </Button>
                    </div>


                    <div className="text-end">
                        Forget password? <a href="/password-reset">Reset </a> now
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

