import classNames from 'classnames/bind';
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// img
import iBack from '@assets/images/back.png';
import headlogo from '@assets/images/headlogo.png';
// lib
import AppUsers from '@services/AppUsers';
import styles from './Account.module.scss';
import { Notifications } from '@src/utils/Notification';
import Loading from '@components/Loading';

const cx = classNames.bind(styles);

const isPhoneVn = (params) => {
    let pattern = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    return pattern.test(params);
};

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function Login() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const showNotification = useContext(Notifications);

    const handleLogin = async () => {
        if (!phone || !password) {
            return showNotification('Vui lòng điền vào phần được cần thiết');
        }
        if (!isPhoneVn(phone)) {
            return showNotification('Phone Error');
        }

        if (password.length < 6) {
            return showNotification('Độ dài mật khẩu không được nhỏ hơn 6 kí tự');
        }

        setLoading(true);
        const data = await AppUsers.userLogin({ phone, password });
        if (data) {
            showNotification(data.message);
            if (data.status === 1) {
                localStorage.setItem('token', data.token);
                await sleep(500);
                navigate('/my');
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            return navigate('/my');
        }
    }, []);

    return (
        <>
            <Loading show={loading} />
            <div className="pt-0">
                <div className={cx('login-banner')}>
                    <div onClick={() => navigate('/')} className={cx('bankPage', 'flex justify-center items-center')}>
                        <img className={cx('navbar-back')} src={iBack} alt="" />
                    </div>
                    <img className={cx('headlogo')} src={headlogo} alt="" />
                </div>
                <div className={cx('login-box')}>
                    <div className={cx('tit')}>Đăng nhập</div>
                    <div className={cx('mian-from')}>
                        <div className={cx('lab')}>
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
                                type="number"
                                placeholder="Điện thoại"
                                onChange={(e) => setPhone(e.target.value)}
                                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
                            />
                        </div>
                        <div className={cx('item', 'pl-[0.88rem]', 'flex justify-center items-center')}>
                            <div className={cx('number', 'flex')}>
                                <span className="flex justify-center items-center">
                                    <div className={cx('password')}></div>
                                </span>
                            </div>
                            <input
                                className="w-full outline-none"
                                type="password"
                                autoComplete="false"
                                placeholder="Mật khẩu"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mian-btn">
                            <button
                                onClick={() => handleLogin()}
                                className={cx('gradient', 'van-button', 'flex justify-center items-center')}
                            >
                                <span>Đăng nhập</span>
                            </button>
                            <div className="flex justify-center items-center text-[#f2413b] mt-[.4rem]">
                                <Link to="/auth/register" className="pr-[.13rem] text-[.4rem]">
                                    Đăng ký
                                </Link>
                                ｜{' '}
                                <Link to="/auth/forgot" className="pl-[.13rem] text-[.4rem]">
                                    Lấy lại mật khẩu
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
