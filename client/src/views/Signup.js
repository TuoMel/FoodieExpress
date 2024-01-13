import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FoodieButton from "../components/foodieButton";
import FoodieInput from "../components/foodieInput";
import { register } from '../api';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(firstName, lastName, email, phone, password);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
    }

    return (
        <div style={{display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"}}>

            <h2 style={{marginBottom: "5px"}}> Create an account </h2>

            <hr style={{width: "20%"}}/>

            <p> Enter your details to get started </p>

            <form style={{display: "flex", flexDirection: "column"}}>
                <p style={{marginBottom: "5px"}}> First name* </p>
                <FoodieInput type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>

                <p style={{marginBottom: "5px", marginTop: "30px"}}> Last name* </p>
                <FoodieInput type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>

                <p style={{marginBottom: "5px", marginTop: "30px"}}> Email* </p>
                <FoodieInput type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

                <p style={{marginBottom: "5px", marginTop: "30px"}}> Phone* </p>
                <FoodieInput type="text" placeholder="Phone number" onChange={(e) => setPhone(e.target.value)}/>

                <p style={{marginBottom: "5px", marginTop: "30px"}}> Create a password* </p>
                <FoodieInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

                <p style={{marginBottom: "5px", marginTop: "30px"}}> Repeat your password* </p>
                <FoodieInput type="password" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>

                <FoodieButton label="Sign up" margin="25px" onClick={handleSubmit}/>
            </form>

            <span>Already have an account?
            <Link style={{marginLeft: "5px"}} to={'/login'}>Log in</Link>
            </span>

        </div>
    );
};

export default Signup;
