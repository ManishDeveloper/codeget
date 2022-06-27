import React,{useEffect} from 'react'
import { Container,Row,Col} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import Loader from '../components/Loader';
import {getCategories} from "../redux/actions/categoryActions";

const TopicScreen = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCategories());
    },[]);

    const {categories,loading} = useSelector(state=>state.category);

    return (
        <>
            <section className="landing" style={{'height':'91.1vh'}}>
            <div className="dark-overlay"></div>
                {loading ? <Loader customColor="light" /> : (
                    <Container className="text-center py-5">
                    <Row>
                        {categories.map((category,index)=>(
                            <Col key={index} md={4} className="d-flex mb-4">
                            <div className="language-box">
                                <h1 className="language-heading">{category.name}</h1>
                                <p className="language-description">{category.shortDescription.slice(0,60)}...</p>
                                <Link to={`questions/${category._id}`} className="btn btn-primary language-button">Start Pracitce</Link>
                            </div>
                        </Col>
                        ))}
                    </Row>
                </Container>
                )}
            </section>
        </>
    )
}

export default TopicScreen
