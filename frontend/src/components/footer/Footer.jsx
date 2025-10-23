import "./Footer.css"

export default function Footer() {
    return (
        <div className="footer" id="footer">
            <div className="footer-content" >
                <div className="footer-content-left">
                    <img src='/page-logo.png'className='logo' alt=''/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis temporibus molestiae expedita corporis ducimus, adipisci saepe dolores quod quia, in consequuntur pariatur, veritatis quisquam iusto? Distinctio enim similique saepe corrupti.</p>
                    <i className="fa-brands fa-square-facebook"></i>
                    <i className="fa-brands fa-square-twitter"></i>
                    <i className="fa-brands fa-linkedin"></i>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivary</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET-IN-TOUCH</h2>
                    <ul>
                        <li>+91-6342635465</li>
                        <li>contact@foody.com</li>
                    </ul>
                </div>
            </div>
            <hr></hr>
            <p>Copyright 2025 &copy; foody.com - All Right reserved</p>
        </div>

    )
}