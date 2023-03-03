import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { CustomInput } from './CustomInput'

export const PassResetForm = () => {

    const [formDt, setFormDt] = useState({})
    const [error, setError] = useState("")

    const handleOnchange = (e) => {
        const { name, value } = e.target
        if (name === "password") {
            setError("")
            value.length < 6 && setError("Password should contain atleast 6 character")

            !/[0-9]/.test(value) && setError("password should contain atleast one number")
            !/[A-Z]/.test(value) && setError("password should contain atleast one uppercase")
            !/[a-z]/.test(value) && setError("password should contain atleast one lowercase")
        }
        setFormDt({ ...formDt, [name]: value })
    }
    // console.log(formDt)

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const { confirmPassword, ...rest } = formDt
        if (confirmPassword !== rest.password) {
            return toast.error("Password do not match")
        }
        // console.log(rest)

        //get the data from the local storage
        const userStr = localStorage.getItem("users")
        if (userStr) {
            // parse the json data to object
            let users = JSON.parse(userStr)
            if (userStr.length) {

                //check if there is any user who has the same email 
                const userExist = users.find((item) => item.email === rest.email)
                if (userExist?.email) {
                    //loop through the array and update the password and it should create a new array

                    const temUsers = users.map(item=>{
                        if(item.email === rest.email){
                            item.password = rest.password
                        }
                        return item
                    })
                    //Store that array to the local storage and show the message saying you may login.
                    localStorage.setItem("users", JSON.stringify(temUsers))
                    toast.success("Password has been updated you can login now")
                    return;
                }
            }
            
        }
        toast.error("User not found or invalid request")
        // window.location.href= "/"

    }

    return (
        <div className='border p-3 py-4 rounded shadow-lg'>
            <h3 className='text-center'>Reset your password</h3>
            <hr />
            <Form onSubmit={handleOnSubmit}>
                <CustomInput onChange={handleOnchange} label="Email" name="email" placeholder="sam@gmail.com" required={true} />
                <CustomInput onChange={handleOnchange} label="New Password *" type="password" name="password" placeholder="******" required={true} />
                <CustomInput onChange={handleOnchange} label="Confirm Password *" name="confirmPassword" type="password" placeholder="******" required={true} />
                <Form.Text>
                    Password should contain atleast 6 character, one uppecase, one lowercase and one number.
                    {
                        error && (
                            <ul>
                                <li className="text-danger fw-bolder">{error}</li>
                            </ul>
                        )
                    }

                </Form.Text>
                <div className="d-grid mt-2">
                    <Button type="submit" variant="outline-danger" disable={error}>Reset Password</Button>

                </div>
            </Form>
        </div>
    )
}
