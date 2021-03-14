import React from 'react';
import {Container,Navbar,Nav, NavDropdown} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {userLogout} from "../redux/actions/userActions";

const Menubar = () => {
    const dispatch = useDispatch();

    const {isAuthenticated, userInfo} = useSelector(state=>state.user);

    const logoutHandler = () => {
        dispatch(userLogout());
    }
    return (
        <>
<Navbar bg="dark" variant="dark" expand="lg">
    <Container fluid>
        <LinkContainer to={isAuthenticated ? '/topic' : '/'}>
        <Navbar.Brand>Codeget</Navbar.Brand>
        </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
        <LinkContainer to={isAuthenticated ? '/topic' : '/'}>
            <Nav.Link><i className="fas fa-home"></i> Home</Nav.Link>
        </LinkContainer>
        {isAuthenticated && userInfo.isAdmin && <LinkContainer to="/dashboard">
            <Nav.Link>Dashboard</Nav.Link>
        </LinkContainer>}
        {isAuthenticated ? (
            <NavDropdown title={<i className="fas fa-user"> <span style={{fontFamily:"Nunito Sans"}}>{userInfo.name}</span></i>} id="username">
            <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

        </NavDropdown>
        )
         : <LinkContainer to="/login">
            <Nav.Link><i className="fas fa-user"></i> Sign In</Nav.Link>
        </LinkContainer>}
        
    </Nav>
  </Navbar.Collapse>
    </Container>
  
</Navbar>  
        </>
    )
}

export default Menubar
