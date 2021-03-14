import React,{useState, useEffect} from 'react';
import {Form,Button} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import { addNewQuestion } from '../../redux/actions/dashboardActions';

const AddQuestion = () => {
    const [formData,setFormData] = useState({
    question:"",description:"",image:"",category:null,level:null,answer:""});

    const [descToggle,setDescToggle] = useState(false);

    const dispatch = useDispatch();

    const {question,description,image,category,answer,level} = formData;

    const categoryList = useSelector(state=>state.dashboardQuestions.categoryList);

    const descToggleHandler = () => {
        setDescToggle(!descToggle);
    }

    const changeFields = (e) => {
        e.preventDefault();
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const addQuestionHandler = (e) => {
        e.preventDefault();
        dispatch(addNewQuestion(question,category,level,answer));
        setFormData({question:"",description:"",image:"",category:null,level:null,answer:""});
    }
    return (
        <div className="add-question">
            <h3>Add New Question</h3>
            <Form onSubmit={addQuestionHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Question</Form.Label>
                        <Form.Control type="text" placeholder="Type Question" name="question" value={question} onChange={changeFields} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Category</Form.Label>
                        <Form.Control name="category" onChange={changeFields} as="select">
                        <option value="">Select Category</option>
                        {categoryList.map((category,index)=>(
                        <option key={index} value={category._id}>{category.name}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Level</Form.Label>
                        <Form.Control as="select" name="level" onChange={changeFields}>
                        <option value="1">Select Level</option>
                        <option value="1">Beginner</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Advance</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" onClick={descToggleHandler} label="Add Description?" />
                    </Form.Group>

                    {descToggle && <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Question Description</Form.Label>
                        <Form.Control as="textarea" name="description" value={description} onChange={changeFields} rows={3} />
                    </Form.Group>}

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Answer</Form.Label>
                        <Form.Control as="textarea" name="answer" value={answer} onChange={changeFields} rows={3} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
        </div>
    )
}

export default AddQuestion;
