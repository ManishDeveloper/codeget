import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import { Container, Row,Col} from 'react-bootstrap';
import {Link, Switch, Route} from "react-router-dom";
import Loader from '../../components/Loader';
import { getAllCategory, getAllQuestion } from '../../redux/actions/dashboardActions';
import AllQuestion from './AllQuestion';
import AddQuestion from './AddQuestion';

const DashboardScreen = () => {

    const [currentPage, setCurrentPage] = useState("dashboard");

    const [pageLoading, setpageLoading] = useState(false);

    const {loading, questionsList,currentQuestionNum} = useSelector(state=>state.dashboardQuestions);

    const dispatch = useDispatch();

    useEffect(()=>{
    
    dispatch(getAllQuestion());
    dispatch(getAllCategory());
    
    },[]);

    const changePage = (e) => {
        if(currentPage !== e.target.id){
            setCurrentPage(e.target.id);
            setpageLoading(true);
            setTimeout(()=>{setpageLoading(false)},1000);
        }
    }
   
    return (
        <>
        <Container fluid>
            <Row>
                <Col md={3} style={{paddingLeft:0}}>
                    <div className="question-list-sidebar">
                        <div className="exercise-count">
                            <h5>Dashboard Panel</h5>
                        </div>
                        <div className="exercise-list">
                            <ul>
                            <li className={`${currentPage === "dashboard" && "active"}`} id="dashboard" onClick={changePage}>All Questions</li>
                            <li className={`${currentPage === "addquestion" && "active"}`} id="addquestion" onClick={changePage}>Add Questions</li>
                            <li>All Categories</li>
                            <li>Add Category</li>
                            <li>All User</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col md={9}>
                    <div className="answer-box">
                        {loading ? <Loader /> :(
                        <>
                        {pageLoading ? <Loader /> : (
                        <>
                        {currentPage === "dashboard" && <AllQuestion questionsList={questionsList.reverse()} />}

                        {currentPage === "addquestion" && <AddQuestion questionsList={questionsList}  />}
                        </>
                        
                        )}
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
