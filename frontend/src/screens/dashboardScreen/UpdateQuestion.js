import React,{useState, useEffect} from 'react';
import {Form,Button} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import { updateQuestion } from '../../redux/actions/dashboardActions';

const UpdateQuestion = ({updateQuiz,quizId}) => {
    const [formData,setFormData] = useState({
    question:updateQuiz.question,description:"",image:"",categoryId:updateQuiz.category._id,level:updateQuiz.level,answer:updateQuiz.answer});

    const history = useHistory();

    const [descToggle,setDescToggle] = useState(false);

    const dispatch = useDispatch();

    const {question,description,image,categoryId,answer,level} = formData;

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
        dispatch(updateQuestion(quizId,question,categoryId,level,answer));
        history.push("/dashboard/home");
    }
    return (
        <div className="add-question">
            <h3>Update Question</h3>
            <Form onSubmit={addQuestionHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Question</Form.Label>
                        <Form.Control type="text" placeholder="Type Question" name="question" value={question} onChange={changeFields} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Category</Form.Label>
                        <Form.Control name="categoryId" onChange={changeFields} as="select">
                        <option value="">Select Category</option>
                        {categoryList.map((category,index)=>(
                        <option key={index} value={category._id} selected={categoryId.toString()===category._id.toString() && true}>{category.name}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Level</Form.Label>
                        <Form.Control as="select" name="level" onChange={changeFields}>
                        <option value="1">Select Level</option>
                        <option value="1" selected={level===1 && true}>Beginner</option>
                        <option value="2" selected={level===2 && true}>Intermediate</option>
                        <option value="3" selected={level===3 && true}>Advance</option>
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
                        <Form.Control as="textarea" name="answer" value={answer} onChange={changeFields} rows={6} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
        </div>
    )
}

export default UpdateQuestion;
