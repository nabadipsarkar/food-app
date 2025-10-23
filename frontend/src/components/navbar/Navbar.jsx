import { useContext, useState } from 'react';
import {assets} from '../../assets/assets';
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
export default function Navbar({setShowLogin}){
    const [menu, setMenu] = useState("home");
    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

    return(
        
        <div className="navbar">
            <Link to='/'><img src='/page-logo.png'className='logo' alt=''/></Link>
            <div className='navbar-menu'>
                
                <Link to="/" onClick={()=>{setMenu("home")}} className={menu==='home'?"active":""}>home</Link>
                <a href='#explore-menu' onClick={()=>{setMenu("menu")}} className={menu==='menu'?"active":""}>menu</a>
                <a href='#app-download' onClick={()=>{setMenu("mobile-app")}} className={menu==='mobile-app'?"active":""}>mobile-app</a>
                <a href='#footer' onClick={()=>{setMenu("contact-us")}} className={menu==='contact-us'?"active":""}>contact us</a>
            </div>
            <div className="navbar-right">
                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                <Link to='/cart'><i className="fa-solid fa-bucket bucket-icon"></i></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
                {!token?<button onClick={()=>setShowLogin(true)} className='sign-in'>sign in</button>:
                <div className='navbar-profile'>
                    <img src={assets.profile_icon} alt=''/>
                    <ul className='navbar-profile-dropdown'>
                        <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon}/><p>Orders</p></li>
                        <hr></hr>
                        <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
                    </ul>
                </div>}
                
            </div>
        </div>
    )
}