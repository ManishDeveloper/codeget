import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import { Container, Row,Col,Button } from 'react-bootstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {Link} from "react-router-dom";
import Loader from '../components/Loader';
import { getQuestion } from '../redux/actions/questionActions';
import { toast } from 'react-toastify';

const QuestionScreen = ({match}) => {

    const dispatch = useDispatch();

    useEffect(()=>{
    
    dispatch(getQuestion(match.params.categoryId));
    
    },[dispatch,match]);
    
    const {loading, questionsList} = useSelector(state=>state.questions);

    const start = (Number(match.params.partNum)-1)*5;

    const end = Number(match.params.partNum)*5;

    const quizPart = questionsList.slice(start, end);

    const showQuestion = quizPart;

    const [currentQuestion,setCurrentQuestion] = useState(0);

    const [sidebarToogle,setSidebarToggle] = useState(false);

    const quizShowHandler = (index) => {
        if(index+1 === 0){
            toast.error("This is first Question!");
            return false;
        }
        if(index === quizPart.length){
            toast.error("This is Last Question!");
            return false;
        }
        setCurrentQuestion(index);
        if(sidebarToogle){
            setSidebarToggle(!sidebarToogle);
        }
    }

    const sidebarToogleHandler = () => {  
        setSidebarToggle(!sidebarToogle);
    }
   
    return (
        <>
        {loading ? <Loader /> : (
            <Container fluid className="mb-5">
            <Row>
                <Col md={3} className="sidebar-mobile" style={{display: window.innerWidth > 576 ? 'block' : (sidebarToogle ? 'block' : 'none'),paddingLeft:0}}>
                    <div className="question-list-sidebar">
                        <div className="header-box">
                            <Link to={`/level/${match.params.categoryId}`}>
                                <i className="fas fa-home"></i>
                            </Link>
                            <i className="fas fa-trash"></i>
                            <i onClick={sidebarToogleHandler} className="fas fa-times"></i>
                        </div>
                        <div className="exercise-count">
                            <h5>Excercise Number</h5>
                        </div>
                        <div className="exercise-list">
                            <ul>
                                {quizPart.map((quiz,index)=>(
                                
                            <li className={`${currentQuestion === index && "active"} p-2`} key={index} onClick={()=>{quizShowHandler(index)}}>Exercise {index+1}</li>
                                ))}
                                
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col md={9}>
                    <div className="top-button my-4 px-3 d-none">
                    <Button onClick={sidebarToogleHandler}>Show</Button>
                    </div>
                    <div className="answer-box">
                        <p style={{fontSize:"20px",marginBottom:'20px',wordSpacing:'-3px'}}><pre><strong>{currentQuestion+1}:</strong> {showQuestion[currentQuestion].question}</pre></p>
                    <SyntaxHighlighter className="p-3" language="javascript" style={dark}>
                        {showQuestion[currentQuestion].answer}
                    </SyntaxHighlighter>
                    </div>
                    <div className="prev-next text-center">
                        <Button size="sm" variant="dark" onClick={()=> quizShowHandler(currentQuestion-1)} className="mx-3" disabled={currentQuestion===0 && true}>Previous</Button>
                        <Button size="sm" variant="dark" onClick={()=> quizShowHandler(currentQuestion+1)} disabled={currentQuestion+1=== quizPart.length && true}>Next</Button>
                    </div>
                </Col>
            </Row>
         </Container>
        )}
            
        </>
    )
}

export default QuestionScreen;
