import { faHouse, faLayerGroup, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar({ link }) {
    return (
        <>
            {/* <div className="nav-fill"></div> */}
            <div className="flex justify-between items-center nav">
                <Link to="/" className="flex-1 select-none cursor-pointer">
                    <div className={`nav-item flex flex-col ${link === '/' && 'active'}`}>
                        <FontAwesomeIcon className="text-[0.5rem] mb-[3px]" icon={faHouse} />
                        <span className="text-[12px] text-center capitalize">Trang chủ</span>
                    </div>
                </Link>
                <Link to="/bingo18" className="flex-1 select-none cursor-pointer">
                    <div className={`nav-item flex flex-col ${link === '/bingo18' && 'active'}`}>
                        <FontAwesomeIcon className="text-[0.5rem] mb-[3px]" icon={faLayerGroup} />
                        <span className="text-[12px] text-center capitalize">Bingo18</span>
                    </div>
                </Link>
                <Link
                    to={localStorage.getItem('token') ? '/my' : '/auth/login'}
                    className="flex-1 select-none cursor-pointer"
                >
                    <div className={`nav-item flex flex-col ${link === '/my' && 'active'}`}>
                        <FontAwesomeIcon className="text-[0.5rem] mb-[3px]" icon={faUser} />
                        <span className="text-[12px] text-center capitalize">Của tôi</span>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default memo(Navbar);
