import NotFoundCSS from './NotFound.module.css';

export default function NotFound() {
    return(
        <div className={NotFoundCSS.notFoundFrame}>
            <h1>Ops! We did not find the requested page.</h1>
        </div>
    );
}