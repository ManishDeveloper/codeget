import React,{useState} from 'react';
import {Row,Dropdown,Col,Form,InputGroup,FormControl,Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { deleteQuiz } from '../../redux/actions/dashboardActions';

const AllQuestion = ({questionsList}) => {

    const [currentPage,setCurrentPage] = useState(1);
    const [search,setSearch] = useState("");
    const [showQuiz,setshowQuiz] = useState(questionsList.slice((currentPage-1)*10,currentPage*10));


    const dispatch = useDispatch();

    const deleteQuizHandler = (e) => {
        dispatch(deleteQuiz(e.target.id));
    }

    const totalPage = Math.ceil(questionsList.length/10);
 

    const handlePage = (page) => {
        setCurrentPage(page);
        setshowQuiz(questionsList.slice((page-1)*10,page*10));
    }

    const searchHandler = (e) => {
        e.preventDefault();
        let filterQuiz = questionsList.filter(quiz=>(
            quiz.question.toLowerCase().includes(search.toLowerCase().trim())
        ));

        setCurrentPage(1);

        setshowQuiz(filterQuiz.slice(0,10));
    }
    return (
        <>
           <Row>
                <Col md={7}>
                    <Form onSubmit={searchHandler}>
                    <InputGroup className="mb-3 mr-sm-2 quiz-search-box">
                        <FormControl id="inlineFormInputGroupUsername2" placeholder="Search Question" onChange={e=>setSearch(e.target.value)} />
                        <InputGroup.Prepend onClick={searchHandler}>
                            <InputGroup.Text>
                            <i className="fas fa-search"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                    </InputGroup>
                    </Form>
                </Col>
                <Col md={3}>
                <Dropdown className="category-dropdown" variant="primary">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        All Category
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="category-dropdown-item">
                        <Dropdown.Item href="#/action-1">Javascript</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">HTML</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={2}>
                <Dropdown className="category-dropdown" variant="primary">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Page {currentPage}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="category-dropdown-item">
                        {[...Array(totalPage).keys()].map((index)=>(
                            <Dropdown.Item key={index} onClick={()=>handlePage(index+1)}>{index+1}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <Col>
                <Table striped bordered hover>
                    <thead style={{backgroundColor:'#555555',color:'#ffffff'}}>
                        <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Category</th>
                        <th>Level</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showQuiz.map((quiz,index)=>(
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{quiz.question}</td>
                            <td>{quiz.category.name}</td>
                            <td>{quiz.level===1 ? "Beginner" : quiz.level===2 ? "Intermediate" : "Advance"}</td>
                            <td className="text-center"><Link to={`/dashboard/update/${quiz._id}`}><i id={quiz._id} className="fas fa-edit"></i></Link> </td>
                            <td className="text-center"><i id={quiz._id} onClick={deleteQuizHandler} className="fas fa-trash delete-qus-button"></i></td>
                            </tr>
                        ))}
                    </tbody>
                    </Table>
                </Col>
            </Row> 
        </>
    )
}

export default AllQuestion;
