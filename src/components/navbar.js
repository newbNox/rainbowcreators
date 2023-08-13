import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faServer, faUsers } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
    return (
        <div className="container mt-5">
            <header className="d-flex justify-content-center py-3">
                <ul className="nav nav-fill">
                    <li className="nav-item btn btn-danger mx-2 my-2"><a href="/" className="nav-link"><FontAwesomeIcon icon={faHouse}/> Home</a></li>
                    <li className="nav-item btn btn-danger mx-2 my-2"><a href="/servers" className="nav-link"><FontAwesomeIcon icon={faServer}/> Community Servers</a></li>
                    <li className="nav-item btn btn-danger mx-2 my-2"><a href="partner" className="nav-link"><FontAwesomeIcon icon={faUsers}/> Partnership</a></li>
                </ul>
            </header>
        </div>
    )
};

export default Nav;