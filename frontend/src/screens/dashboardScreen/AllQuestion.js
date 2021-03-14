import React from 'react';
import {Row,Dropdown,Col,Form,InputGroup,FormControl,Table} from "react-bootstrap";

const AllQuestion = ({questionsList}) => {
    return (
        <>
           <Row>
                <Col md={3}>
                <Dropdown className="category-dropdown" variant="primary">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        All Category
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="category-dropdown-item">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={9}>
                    <Form>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Search Question"
                        aria-label="Search Question"
                        aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Category</th>
                        <th>Level</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionsList.map((quiz,index)=>(
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{quiz.question}</td>
                            <td>{quiz.category.name}</td>
                            <td>{quiz.level===1 ? "Beginner" : quiz.level===2 ? "Intermediate" : "Advance"}</td>
                            <td>Edit</td>
                            <td>Delete</td>
                            </tr>
                        ))}
                    </tbody>
                    </Table>
                </Col>
            </Row> 
        </>
    )
}

export default AllQuestion;
