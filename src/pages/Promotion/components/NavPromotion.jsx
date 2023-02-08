import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from '../Promotion.module.scss';

const cx = classNames.bind(styles);

function NavPromotion() {
    return (
        <div className={cx('tab', 'py-1')}>
            <ul className="flex justify-between items-center">
                <NavLink to="/promotion" className={({ isActive }) => cx({ action: isActive })}>
                    Tổng quan
                </NavLink>
                <NavLink to="/" className={({ isActive }) => cx({ action: isActive })}>
                    Đội của tôi
                </NavLink>
                <NavLink to="/" className={({ isActive }) => cx({ action: isActive })}>
                    Lịch sử nhận
                </NavLink>
                <NavLink to="/tutorial" className={({ isActive }) => cx({ action: isActive })}>
                    Hướng dẫn
                </NavLink>
            </ul>
        </div>
    );
}

export default NavPromotion;
