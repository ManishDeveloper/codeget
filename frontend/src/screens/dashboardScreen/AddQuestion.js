import React,{useState} from 'react';
import {Form,Button} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import { addNewQuestion } from '../../redux/actions/dashboardActions';

const AddQuestion = () => {
    const [formData,setFormData] = useState({question:"",level:1,category:null,answer:""});

    const dispatch = useDispatch();

    const history = useHistory();

    const {question,level,category,answer} = formData;

    const categoryList = useSelector(state=>state.dashboardQuestions.categoryList);

    const changeFields = (e) => {
        e.preventDefault();
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    
    const addQuestionHandler = (e) => {
        e.preventDefault();
        dispatch(addNewQuestion(question,+level,category,answer));
        history.push("/dashboard/home");
    }
    return (
        <div className="add-question">
            <h3>Add New Question</h3>
            <Form onSubmit={addQuestionHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Question</Form.Label>
                        <Form.Control as="textarea" placeholder="Type Question" name="question" rows="3" value={question} onChange={changeFields} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Level</Form.Label>
                        <Form.Control name="level" onChange={changeFields} as="select">
                        <option value="">Select Level</option>
                        <option value="1">Beginner</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Advance</option>
                        </Form.Control>
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
