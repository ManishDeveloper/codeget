import React,{useState} from 'react';
import {Form,Button} from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import {userLogin} from "../redux/actions/userActions";
import Loader from '../components/Loader';

const LoginScreen = () => {
    const [formData, setFormData] = useState({email:"",password:""});

    const {email, password} = formData;

    const {isAuthenticated,loading,loading2} = useSelector(state=>state.user);

    const dispatch = useDispatch();

    const changeFields = e => {
        e.preventDefault();
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin(email,password));
    }
    if(isAuthenticated){
        return <Redirect to="/topic" />
     }
    
    return (
        <>
        {loading ? <Loader /> : isAuthenticated ? <Redirect to="/topic" /> : (
            <section className="landing" style={{'height':'91.1vh'}}>
            <div className="dark-overlay"></div>
                <div className="login-form">
                    <h4><i className="fas fa-user"></i> Login User</h4>
                <Form onSubmit={loginHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={changeFields} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={changeFields} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Text>
                        Not Registered? <Link to="/register">Register</Link>
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {loading2 ? "Please Wait..": "Submit"}
                    </Button>
                </Form>
                </div>
        </section>
        )}
                    
        </>
    )
}

export default LoginScreen;
