import { FaGithub, FaLinkedin } from 'react-icons/fa';

import FooterCSS from './Footer.module.css';

export default function Footer() {
    return(
        <footer>
            <div className={FooterCSS.footerContent}>
                <h3>Developed by Fred.ef</h3>
                <div>
                <a href="https://github.com/Fred-ef" target="_blank" rel="noopener noreferrer" className={FooterCSS.iconLink}>
                    <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/fabio-federico-02663b1b3/" target="_blank" rel="noopener noreferrer" className={FooterCSS.iconLink}>
                    <FaLinkedin />
                </a>
                </div>
            </div>
        </footer>
    )
}