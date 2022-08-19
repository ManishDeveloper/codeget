import React,{useState,useEffect} from 'react'
import { Container,Row,Col,Table,Pagination} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import Loader from '../components/Loader';
import {getDoneQuestion, getQuestion} from "../redux/actions/questionActions";

const QuestionsList = ({match}) => {
    const [page,setPage] = useState(1);

    const dispatch = useDispatch();


    const {loading, questionsList, doneQuestion,numDoneQuestion, doneLoading} = useSelector(state=>state.questions);
    const {userInfo} = useSelector(state=>state.user);

   
    const loadPages = (pageNum) => {
        setPage(pageNum);
    }

    let totalPart = 1;

    if(!loading){
        totalPart = questionsList.length < 50 ? 1 : Number(Math.ceil(questionsList.length/50));
    }

    let QuestionTrim = questionsList.slice(0,50);

    if(page === 1){
        QuestionTrim = questionsList.slice(0,50);
    }
    else {
        QuestionTrim = questionsList.slice((page ===1 ? 1 : page-1 )*50,50*page);
    }
    
    useEffect(async ()=>{
        await dispatch(getQuestion(match.params.id));
        await dispatch(getDoneQuestion());
    },[]);


    return (
        <>
            <section className="landing">
            <div className="dark-overlay"></div>
            {(loading || doneLoading) ? <Loader customColor="light" /> : <Container className="text-center py-5">
                    <Row>
                        <Col md={12} lg={12} className="m-auto">
                        <div className='d-flex justify-content-between align-items-start'>
                            <Link target="_blank" style={{padding:'5px 12px'}} to={`/important/${match.params.id}`} className='btn btn-success'>Important Question</Link>
                            <Pagination>
                            {[...Array(totalPart).keys()].map((pages,index)=>(
                                <Pagination.Item key={index} active={page === (index+1)} onClick={()=>loadPages(index+1)}>{index+1}</Pagination.Item>
                            ))}
                            </Pagination>
                        </div>
                        
                        <Table variant="light" striped bordered hover>
                    <thead style={{backgroundColor:'#555555',color:'#ffffff'}}>
                        <tr>
                        <th><h5 style={{color:'#ffffff'}}>Sl. No.</h5></th>
                        <th><h5 style={{color:'#ffffff'}}>Questions1 ({`${numDoneQuestion}/${questionsList.length}`})
                        </h5></th>
                        <th><h5 style={{color:'#ffffff'}}>Answer</h5></th>
                        <th><h5 style={{color:'#ffffff'}}>Status</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                       {QuestionTrim.map((question, index)=>(
                           <tr key={index}>
                               <td>{page===1 ? index+1 : ((page-1)*50)+(index+1)}</td>
                               <td className='font17'>{question.level == 2 ? <strong><pre>{question.question}</pre></strong> : <pre>{question.question}</pre>} </td>
                               <td>
                                  <Link target="_blank" style={{padding:'5px 12px'}} to={`/answer/${question._id}`} className="btn btn-dark">Show</Link>
                               </td>
                               <td>
                                {((doneQuestion.quizDone.indexOf(question._id.toString()) === -1) && doneQuestion.user.toString() === userInfo._id.toString()) ? <i className="far fa-times-circle ques-check"></i> : <i className="fas fa-check-circle ques-check active"></i> }
                               </td>
                           </tr>
                       ))} 
                    </tbody>
                    </Table> 

                    <Pagination className='justify-content-end'>
                        {[...Array(totalPart).keys()].map((pages,index)=>(
                            <Pagination.Item key={index} active={page === (index+1)} onClick={()=>loadPages(index+1)}>{index+1}</Pagination.Item>
                        ))}
                    </Pagination>
                    </Col>   
                    </Row>
                </Container>}
            </section>
        </>
    )
}

export default QuestionsList;
