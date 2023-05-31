import { Link } from "react-router-dom";

import NavbarCSS from './Navbar.module.css';

export default function Navbar() {
    return(
        <nav>
            <Link to='/'>
                <div className={NavbarCSS.logo}>
                    <span className={NavbarCSS.logoBlack}>coin</span>
                    <span className={NavbarCSS.logoYellow}>X</span>
                    <span className={NavbarCSS.logoBlack}>plore</span>
                </div>
            </Link>
            <ul className={NavbarCSS.navbar_links}>
                <li><Link to="/" className={NavbarCSS.navbar_link}>Markets</Link></li>
            </ul>
        </nav>
    );
}