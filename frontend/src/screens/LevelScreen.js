import React,{useEffect} from 'react'
import { Container,Row,Col,Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import Loader from '../components/Loader';
import {getCategories} from "../redux/actions/categoryActions";

const LevelScreen = ({match}) => {

    return (
        <>
            <section className="landing">
            <div className="dark-overlay">
            <Container className="text-center my-5">
                    <Row>
                    <Col md={4} style={{display:'flex'}}>
                            <div className="language-box">
                                <h1 className="language-heading">Beginner</h1>
                                <p className="language-description">Start from the beginner level with simple Questions.</p>
                                <Link to={`question/${match.params.id}`} className="btn btn-primary language-button">Start Pracitce</Link>
                            </div>
                        </Col>
                        <Col md={4} style={{display:'flex'}}>
                            <div className="language-box">
                                <h1 className="language-heading">Intermediate</h1>
                                <p className="language-description">You have basic Knowdelge then Start from the Intermediate level.</p>
                                <Link to={`question/${match.params.id}`} className="btn btn-primary language-button">Start Pracitce</Link>
                            </div>
                        </Col>
                        <Col md={4} style={{display:'flex'}}>
                            <div className="language-box">
                                <h1 className="language-heading">Advance</h1>
                                <p className="language-description">Go with Advance Question and sharp your knowdelge.</p>
                                <Link to={`question/${match.params.id}`} className="btn btn-primary language-button">Start Pracitce</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            </div>
            </section>
        </>
    )
}

export default LevelScreen;
