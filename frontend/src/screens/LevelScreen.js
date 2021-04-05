import React,{useEffect} from 'react'
import { Container,Row,Col,Table} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import Loader from '../components/Loader';
import {getQuestion} from "../redux/actions/questionActions";

const LevelScreen = ({match}) => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getQuestion(match.params.id));
    },[]);

    const {loading, questionsList} = useSelector(state=>state.questions);

    let totalPart = 1;

    if(!loading){
        totalPart = questionsList.length < 50 ? 1 : Number(Math.ceil(questionsList.length/50));
    }

    return (
        <>
            <section className="landing">
            <div className="dark-overlay">
            {loading ? <Loader customColor="light" /> : <Container className="text-center my-5">
                    <Row>
                        <Col md={6} className="m-auto">
                        <Table variant="light" striped bordered hover>
                    <thead style={{backgroundColor:'#555555',color:'#ffffff'}}>
                        <tr>
                        <th><h5 style={{color:'#ffffff'}}>Parts</h5></th>
                        <th><h5 style={{color:'#ffffff'}}>Start</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                       {[...Array(totalPart).keys()].map((index)=>(
                           <tr key={index}>
                               <td className="align-middle"><Link to={`/question/${index+1}/${match.params.id}`}><h5>Part {index+1} <br visible="xs" /></h5>
                               </Link><h6>({`${index > 0 ? index*50+1 : index} - ${totalPart === index+1 ? questionsList.length :  (index+1)*50}`})</h6> </td>

                               <td>
                                  <Link style={{padding:'10px 20px'}} to={`/question/${index+1}/${match.params.id}`} className="btn btn-dark">Start</Link>
                               </td>
                           </tr>
                       ))} 
                    </tbody>
                    </Table> 
                    </Col>   
                    </Row>
                </Container>}
            </div>
            </section>
        </>
    )
}

export default LevelScreen;
