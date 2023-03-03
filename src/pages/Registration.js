import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { CustomInput } from "../components/CustomInput";

import { Layout } from "../components/Layout";
import { rendomStrGenerator } from "../utils";

//falsy: false, 0, "", undefined, null
//truthy : ture, 123, "lsfjlsdj", {} , []

const initialState = {
  fName: "",
  lName: "",
  email: "",
  password: "Aa12345",
  confirmPassword: "Aa12345",
};

export const Registration = () => {
  const [frm, setFrm] = useState(initialState);
  const [error, setError] = useState("");

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setError("");

      value.length < 6 &&
        setError("Password must be at least 6 characters long");

      !/[0-9]/.test(value) && setError("Number is required");
      !/[A-Z]/.test(value) && setError("Upper case is required");
      !/[a-z]/.test(value) && setError("Lower case is required");
    }

    setFrm({
      ...frm,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = frm;

    if (confirmPassword !== rest.password) {
      return toast.error("Password do not match!");
    }

    //reading data from local storage
    const oldUsersStr = localStorage.getItem("users");
    const oldUsers = oldUsersStr ? JSON.parse(oldUsersStr) : [];

    //let's check if user already exist for the given email

    const isExist = oldUsers.find(({ email }) => email === rest.email);

    if (isExist) {
      return toast.error("This email already have an account");
    }

    //storing in local storage
    localStorage.setItem(
      "users",
      JSON.stringify([...oldUsers, { ...rest, id: rendomStrGenerator(6) }])
    );
    toast.success("You account has been created, you may login now");
    setFrm(initialState);
  };

  const inputs = [
    {
      value: frm.fName,
      label: "First Name",
      name: "fName",
      required: true,
      placeholder: "sam",
    },
    {
      value: frm.lName,
      label: "Last Name",
      name: "lName",
      required: true,
      placeholder: "smith",
    },
    {
      value: frm.email,
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "sam@email.com",
    },
    {
      value: frm.password,
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "****",
    },
    {
      value: frm.confirmPassword,
      label: "Password",
      name: "confirmPassword",
      type: "password",
      required: true,
      placeholder: "****",
    },
  ];

  return (
    <Layout>
      <div className="w-50 m-auto">
        <Form
          onSubmit={handleOnSubmit}
          className=" mt-5 border p-3 py-5 rounded shadow-lg"
        >
          <h3>Join our system now!</h3>
          <hr />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnchange} />
          ))}

          <Form.Group>
            <Form.Text>
              you Password must contain at least 6 characters including at
              leaset 1 number upper case and lower case
            </Form.Text>
            {error && (
              <ul>
                <li className="text-danger fw-bolder mt-3">{error}</li>
              </ul>
            )}
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
