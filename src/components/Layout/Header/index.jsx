import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import back from '@assets/images/back.png';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { memo } from 'react';

function Header({ left = '', title = '', right = '', to = '' }) {
    let navigate = useNavigate();
    return (
        <div className="select-none">
            {/* <div className="header-fill"></div> */}
            <div className="header bg-[#0A4429]">
                <div className="cursor-pointer navbar-left" onClick={() => left && navigate(to ? to : -1)}>
                    {left && <img className="navbar-back" src={back} alt="" />}
                </div>
                <div className={`cursor-pointer navbar-title`}>{title && title}</div>
                <div className="cursor-pointer navbar-right">{right && right}</div>
            </div>
        </div>
    );
}

export default memo(Header);
