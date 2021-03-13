import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import { Container, Row,Col } from 'react-bootstrap';
import {Link} from "react-router-dom";
import Loader from '../components/Loader';
import { getQuestion, getNextQuestion } from '../redux/actions/questionActions';

const QuestionScreen = ({match}) => {

    const {loading, questionsList, singleQuestion,currentQuestionNum} = useSelector(state=>state.questions);

    const dispatch = useDispatch();

    useEffect(()=>{
    
    dispatch(getQuestion(match.params.level,match.params.categoryId));
    
    },[dispatch,match]);

    const quizShowHandler = (index) => {
        dispatch(getNextQuestion(index));
    }
   
    return (
        <>
        {loading ? <Loader /> : (
            <Container fluid>
            <Row>
                <Col md={3} style={{paddingLeft:0}}>
                    <div className="question-list-sidebar">
                        <div className="header-box">
                            <Link to="/topic">
                                <i className="fas fa-home"></i>
                            </Link>
                            <i className="fas fa-trash"></i>
                            <i className="fas fa-times"></i>
                        </div>
                        <div className="exercise-count">
                            <h5>Excercise Number</h5>
                        </div>
                        <div className="exercise-list">
                            <ul>
                                {questionsList.map((quiz,index)=>(
                                
                            <li className={currentQuestionNum === index && "active"} key={index} onClick={()=>{quizShowHandler(index)}}>Exercise {index+1}</li>
                                ))}
                                
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col md={9}>
                    <div className="answer-box">
                        <h4>{currentQuestionNum+1} : {singleQuestion.question}</h4>
                    </div>
                </Col>
            </Row>
         </Container>
        )}
            
        </>
    )
}

export default QuestionScreen;
