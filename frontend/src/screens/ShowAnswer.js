import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import { Container, Row,Col,Form } from 'react-bootstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Loader from '../components/Loader';
import { getSingleQuestion, sendDoneQuestion, getDoneQuestion, removeDoneQuestion } from '../redux/actions/questionActions';

const ShowAnswer = ({match}) => {

    const dispatch = useDispatch();

    useEffect(async ()=>{
    
    await dispatch(getSingleQuestion(match.params.qusId));

    await dispatch(getDoneQuestion());
    
    },[dispatch,match]);

    const doneHandler = (e) => {

        if(e.target.value === "yes"){
            
           dispatch(sendDoneQuestion(match.params.qusId));
        }

        if(e.target.value === "no"){

            dispatch(removeDoneQuestion(match.params.qusId));
        }

    }
    
    const {loading, doneLoading, singleQuestion,doneQuestion} = useSelector(state=>state.questions);

   
    return (
        <>
        {(loading || doneLoading) ? <Loader /> : (
            <Container fluid className="mb-5">
            <Row>
                <Col md={12}>
                    <div className="top-button my-4 px-3 d-none">
                    </div>
                    <div className="answer-box">
                    <pre style={{fontSize:"18px",marginBottom:'20px',wordSpacing:'-3px',letterSpacing:'normal'}}>{singleQuestion.question}</pre>
                    <SyntaxHighlighter className="p-3" language="javascript" style={dark}>
                        {singleQuestion.answer}
                    </SyntaxHighlighter>

                    <Form className='complete-box'>
                        <Form.Label>Completed: </Form.Label>
                        <Form.Group className="mb-3" controlId="formBasicRadio">
                            <Form.Check type="radio" value="yes" onClick={doneHandler} name="done" label="Yes" defaultChecked={doneQuestion.quizDone.indexOf(match.params.qusId) !== -1}  />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicRadio">
                            <Form.Check type="radio" value="no" onClick={doneHandler} name="done" label="No" defaultChecked={doneQuestion.quizDone.indexOf(match.params.qusId) === -1} />
                        </Form.Group>
                    </Form>
                    </div>
                    
                </Col>
            </Row>
         </Container>
        )}
            
        </>
    )
}

export default ShowAnswer;
