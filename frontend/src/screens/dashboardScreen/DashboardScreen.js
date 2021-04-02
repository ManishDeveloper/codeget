import React,{useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import { Container, Row,Col} from 'react-bootstrap';
import Loader from '../../components/Loader';
import { getAllCategory, getAllQuestion } from '../../redux/actions/dashboardActions';
import AllQuestion from './AllQuestion';
import AddQuestion from './AddQuestion';
import LeftSidebar from './LeftSidebar';
import UpdateQuestion from './UpdateQuestion';

const DashboardScreen = ({match}) => {
    let currentPage = match.params.page;

    if(currentPage !== "home" &&  currentPage !== "add" && currentPage !== "update"){
        currentPage = "home";
    }

    const {loading, questionsList} = useSelector(state=>state.dashboardQuestions);

    const dispatch = useDispatch();

    useEffect(()=>{
    
    dispatch(getAllQuestion());
    dispatch(getAllCategory());
    
    },[]);

    let updateQuiz = null;

    if(match.params.id){
        updateQuiz = questionsList.find((quiz)=>quiz._id === match.params.id.toString());
    }
    
   
    return (
        <>
        <Container fluid>
            <Row>
                <Col md={3} style={{paddingLeft:0}}>
                    <LeftSidebar currentPage={currentPage} />
                </Col>
                <Col md={9}>
                    <div className="answer-box">
                        {loading ? <Loader /> :(
                        <>
                        {currentPage==="add" ? <AddQuestion /> : (currentPage==="update") ? <UpdateQuestion quizId={match.params.id} updateQuiz={updateQuiz} /> : <AllQuestion questionsList={questionsList} />}
                        
                        </>
                        )}
                        
                    </div>
                </Col>
            </Row>
         </Container>
            
        </>
    )
}

export default DashboardScreen;
