import { React, useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import BackgroundImg from "../../assets/bg.jpg";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardText,
    CardFooter,
    Table,
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

import { validatePassword } from "../../util/fe-validations/validatePassword";


function AdminNewUserForm({ props }) {

    /*
    // TODO: update user list after creating new user
    
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3001/admin/users").then((response) => {
            setUsersList(response.data);
        });
    }, []);
    */
    const history = useNavigate();

    // States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState('1');
    const [isDeleted, setIsDeleted] = useState(false);
    const [imgUrl, setImgUrl] = useState('placeholder');
    const [usersList, setUsersList] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

    const handlePasswordValidation = (value) => {
                const validationMessage = validatePassword(value);
                if (validationMessage !== "") {
                    setPasswordErrorMsg(validationMessage);
                } else {
                    setPasswordErrorMsg("");
                }
    };

    async function onSubmitNewUser(e) {
            
            e.preventDefault();

        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        
            if (passwordErrorMsg === "") {
                try {
                    const response = await axios.post(`${baseUrl}/admin/createNewUser`, { // /auth/regi
                        username,
                        email,
                        password,
                        isAdmin,
                        isDeleted,
                        //imgUrl,
                    });
                    if (response.data === "exist") {
                        props.newToastMessage("error", "User already exists: " + username); // SOLI TODO: more detailed messages
                    } else if (response.data === "success") {
                        // update user list
                        // SOLI TODO: return user details after creation!! 
                        // SOLI TODO: setUsersList([...usersList, response.data]);

                        props.newToastMessage("success", "User created: " + username);
                        // SOLI TODO: clear form
                    }
                } catch (error) {
                    props.newToastMessage("error", "Error creating user: " + username);
                    props.newToastMessage("warning", "Error: " + error);
                    console.error(error);
                }
            }
        }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

        return (
            <>
                {/* <div
                    className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
                    style={{
                        backgroundImage: `url(${BackgroundImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="max-w-md w-full bg-white bg-opacity-50 rounded-lg shadow-lg p-8">
                        <div>
                            <h1 className="text-center text-3xl font-bold text-gray-900">
                                Create New User
                            </h1>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={onSubmitNewUser}>
                            <input
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                placeholder="Username"
                                required
                            />
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm mt-3"
                                placeholder="Email"
                                required
                            />
                            <input
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    handlePasswordValidation(e.target.value);
                                }}
                                value={password}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm mt-3"
                                placeholder="Password"
                                required
                            />
                            {passwordErrorMsg && (
                                <span className="text-red-600">{passwordErrorMsg}</span>
                            )}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="inline-block py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
                                >
                                    Create User
                                </button>
                            </div>
                        </form>
                        
                    </div>
                </div> */}
            
            <div className="content">
                <Row>
                    <Col>
                        <Card>
                                <CardBody className='text-sm md:text-md lg:text-lg mb-4 md:mb-6 lg:mb-8'>
                                <Form onSubmit={onSubmitNewUser}>
                                    <Row>
                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Username:</label>
                                                <Input
                                                    id="newUserUsername"
                                                    placeholder="Clever Username Here"
                                                    type="text"
                                                    required
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-md-1" md="3">
                                            <FormGroup>
                                                <label>Password:</label>
                                                <Input
                                                    id='newUserPassword'
                                                    placeholder="Secure Password Here"
                                                    type="password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        
                                    </Row>
                                        <Row>
                                            <Col className="pl-md-1" md="4">
                                            <FormGroup>
                                                <label> {/* htmlFor="exampleInputEmail1" */}
                                                    Email:
                                                </label>
                                                <Input
                                                    id="newUserEmail"
                                                    placeholder="real@email.com"
                                                    type="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className='align-content-center'>

                                            <label>Role:</label>
                                        </Col>
                                            <Col className='align-content-center'>
                                            <FormGroup>
                                                <Input
                                                    id="newUserIsAdminTrue"
                                                    name="newUserIsAdmin"
                                                    type="radio"
                                                    onChange={(e) => setIsAdmin('1')}
                                                    defaultChecked
                                                />
                                                <label>
                                                    Admin
                                                </label>
                                            </FormGroup>
                                        </Col>
                                            <Col className='align-content-center'>
                                            <FormGroup>
                                                <Input
                                                    id="newUserIsAdminFalse"
                                                    name="newUserIsAdmin"
                                                    type="radio"
                                                    onChange={(e) => setIsAdmin('0')}
                                                />
                                                <label>
                                                    User
                                                </label>
                                            </FormGroup>
                                            </Col>
                                            <Col className='col-7'>
                                                </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <label>Image Input</label>
                                                <Input
                                                    id='newUserImgUrl'
                                                    disabled
                                                    defaultValue="not yet implemented"
                                                    placeholder="not yet implemented"
                                                    type="text"
                                                    onChange={(e) => setImgUrl(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => { onSubmitNewUser(e) }}
                                >
                                    Create User
                                </button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                </div>
            </>
    );
}
export default AdminNewUserForm;