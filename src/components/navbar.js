import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faServer, faUsers } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
    return (
        <div class="container mt-5">
            <header class="d-flex justify-content-center py-3">
                <ul class="nav nav-fill">
                    <li class="nav-item btn btn-danger mx-2"><a href="/" class="nav-link"><FontAwesomeIcon icon={faHouse}/> Home</a></li>
                    <li class="nav-item btn btn-danger mx-2"><a href="/servers" class="nav-link"><FontAwesomeIcon icon={faServer}/> Community Servers</a></li>
                    <li class="nav-item btn btn-danger mx-2"><a href="partner" class="nav-link"><FontAwesomeIcon icon={faUsers}/> Partnership</a></li>
                </ul>
            </header>
        </div>
    )
};

export default Nav;