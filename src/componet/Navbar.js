import { Link } from "react-router-dom";

const Navbar = () =>
    <div>
        <nav>
            <ul>
                <li><Link to='/'>Sign Up</Link></li>
                <li><Link to='/login'>Log In</Link></li>
            </ul>
        </nav>
    </div>

export default Navbar;