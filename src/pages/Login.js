import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomInput } from "../components/CustomInput";
import { setUser } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Layout } from "../components/Layout";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fromDt, setFormDt] = useState({});
  const [userInfo] = useState({});

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "sam@email.com",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "****",
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormDt({
      ...fromDt,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const usersStr = localStorage.getItem("users");
    const userList = usersStr ? JSON.parse(usersStr) : [];

    const user = userList.find(({ email, password }) => {
      return email === fromDt.email && password === fromDt.password;
    });

    if (user?.email) {
      dispatch(setUser(user));
      navigate("/dashboard");
      sessionStorage.setItem("logedInUser", JSON.stringify(user));
    } else {
      toast.error("Invalid login details");
    }
  };

  console.log(userInfo);

  return (
    <Layout user={userInfo}>
      <div className="w-50 m-auto">
        <Form
          onSubmit={handleOnSubmit}
          className=" mt-5 border p-3 py-5 rounded shadow-lg"
        >
          <h3>Welcome back!</h3>
          <hr />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}

          <div className="d-grid mb-3">
            <Button variant="primary" type="submit">
              Login
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
