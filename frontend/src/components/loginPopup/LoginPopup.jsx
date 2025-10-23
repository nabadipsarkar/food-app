import { useContext,  useState } from 'react'
import './LoginPopup.css'
import TextField from '@mui/material/TextField';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'

export default function LoginPopup({ setShowLogin }) {
    const {url,setToken} = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({ ...data, [name]: value }));
    }
    const onLogin = async(event)=>{
        event.preventDefault();
        let newUrl = url;
        if(currState === "Login"){
            newUrl += "/api/user/login";
        }else{
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
        }else{
            alert(response.data.message);
        }
    }
    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <i onClick={() => setShowLogin(false)} className="fa-solid fa-xmark"></i>
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <TextField name='name' value={data.name} onChange={onChangeHandler} label="Enter name" variant="outlined" />}

                    <TextField name='email' value={data.email} onChange={onChangeHandler} label="Enter email" variant="outlined" />
                    <TextField name='password' value={data.password} onChange={onChangeHandler} label="Enter password" variant="outlined" />

                </div>
                <button type='submit'>{currState === "Sign up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continue, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p onClick={() => setCurrState("Sign up")}>Create a new account? <span>Click here</span></p>
                    : <p onClick={() => setCurrState("Login")}>Already have an account? <span>Login here</span></p>
                }
            </form>
        </div>
    )
}