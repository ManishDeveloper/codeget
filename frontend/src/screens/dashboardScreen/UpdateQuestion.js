import React,{useState} from 'react';
import {Form,Button} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import { updateQuestion } from '../../redux/actions/dashboardActions';

const UpdateQuestion = ({updateQuiz,quizId}) => {
    const [formData,setFormData] = useState({
    question:updateQuiz.question,description:"",level:updateQuiz.level, categoryId:updateQuiz.category._id,answer:updateQuiz.answer});

    const history = useHistory();

    const dispatch = useDispatch();

    console.log(updateQuiz);

    const {question,level,categoryId,answer} = formData;

    const categoryList = useSelector(state=>state.dashboardQuestions.categoryList);

    const changeFields = (e) => {
        e.preventDefault();
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const addQuestionHandler = (e) => {
        e.preventDefault();
        dispatch(updateQuestion(quizId,+level,question,categoryId,answer));
        history.push("/dashboard/home");
    }
    return (
        <div className="add-question">
            <h3>Update Question</h3>
            <Form onSubmit={addQuestionHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Question</Form.Label>
                        <Form.Control as="textarea" placeholder="Type Question" name="question" rows="3" value={question} onChange={changeFields} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Level</Form.Label>
                        <Form.Control name="level" onChange={changeFields} as="select">
                        <option value="">Select Level</option>
                        <option value="1" selected={1===level}>Beginner</option>
                        <option value="2" selected={2===level}>Intermediate</option>
                        <option value="3" selected={3===level}>Advance</option>
                        </Form.Control>
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

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Answer</Form.Label>
                        <Form.Control as="textarea" name="answer" value={answer} onChange={changeFields} rows={6} />
                    </Form.Group>
                    <div className="buttons mt-5">
                        <Button variant="primary" type="submit" className="mr-3">
                        Update
                    </Button>
                    <Button style={{background:'#bcbcbc'}} variant="light" onClick={()=>{history.push("/dashboard/home")}}>
                        Cancel
                    </Button>
                    </div>
                    
                </Form>
        </div>
    )
}

export default UpdateQuestion;
