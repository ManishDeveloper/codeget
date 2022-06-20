import React from 'react';
import {Form,Button} from "react-bootstrap";
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
    return (
        <>
        <section className="landing">
            <div className="dark-overlay">
                <div className="login-form">
                    <h4><i className="fas fa-user"></i> Register User 2</h4>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Text>
                        Already Registered? <Link to="/login">Login</Link>
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </div>
            </div>
        </section>
        </>
    )
}

export default RegisterScreen
