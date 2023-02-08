import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import iBack from '@assets/images/back.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Forgot() {
    let navigate = useNavigate();
    const [checked, setChecked] = useState(true);
    return (
        <div className="select-none pt-[1.33333rem]">
            <div className={cx('navbar')}>
                <div className={cx('left-0', 'navbar-left')}>
                    <div onClick={() => navigate(-1)} className="flex justify-center items-center">
                        <img className={cx('navbar-back')} src={iBack} alt="" />
                    </div>
                </div>
                <div className={cx('navbar-title')}>Lấy lại mật khẩu</div>
                <div className={cx('right-0', 'navbar-right')}></div>
            </div>
            <div className={cx('login-box')}>
                <div className={cx('mian-from')}>
                    <div className={cx('lab', 'mt-2')}>
                        Định dạng số điện thoại:<span>+84</span>
                    </div>
                    <div className={cx('item', 'first', 'flex justify-center')}>
                        <div className={cx('number', 'flex')}>
                            <span className="flex justify-center items-center">
                                <div className={cx('mobile')}></div>
                            </span>
                            <div className="ml-[0.13rem]">+84</div>
                        </div>
                        <input
                            className="w-full outline-none"
                            maxLength="16"
                            type="text"
                            placeholder="Điện thoại"
                            onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
                        />
                    </div>
                    <div className={cx('item', 'pl-[0.88rem]', 'flex justify-center items-center')}>
                        <div className={cx('number', 'flex')}>
                            <span className="flex justify-center items-center">
                                <div className={cx('code_otp')}></div>
                            </span>
                        </div>
                        <input className="w-full outline-none" type="number" placeholder="Mã xác nhận" />
                        <button className={cx('otp')}>OTP</button>
                    </div>
                    <div className={cx('tip')}>Không nhận được mã OTP ? Vui lòng liên hệ CSKH</div>
                    <div className={cx('item', 'pl-[0.88rem]', 'flex justify-center items-center')}>
                        <div className={cx('number', 'flex')}>
                            <span className="flex justify-center items-center">
                                <div className={cx('password')}></div>
                            </span>
                        </div>
                        <input className="w-full outline-none" type="password" placeholder="Mật khẩu mới" />
                    </div>
                    <div className="mian-btn mt-[1.06667rem]">
                        <button className={cx('gradient', 'van-button', 'flex justify-center items-center')}>
                            <span>Xác nhận</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forgot;
