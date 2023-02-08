import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
// lib
import AppUsers from '@services/AppUsers';
import iBack from '@assets/images/back.png';
import Loading from '@components/Loading';
import { Notifications } from '@src/utils/Notification';

const cx = classNames.bind(styles);

const isPhoneVn = (params) => {
    let pattern = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    return pattern.test(params);
};

function inviteCode() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('r_code');
}

function Register() {
    let navigate = useNavigate();
    const [checked, setChecked] = useState(true);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [invite, setInvite] = useState(inviteCode() || '');
    const [loading, setLoading] = useState(false);

    const showNotification = useContext(Notifications);

    const handlingRegister = async () => {
        const data_user = {
            phone: phone,
            password: password,
            invite: invite,
        };
        if (!data_user.phone || !data_user.password || !data_user.invite || !checked) {
            return showNotification('Vui lòng điền vào phần được cần thiết');
        }
        if (!isPhoneVn(data_user.phone)) {
            return showNotification('Phone Error');
        }

        if (data_user.password.length < 6) {
            return showNotification('Độ dài mật khẩu không được nhỏ hơn 6 kí tự');
        }

        setLoading(true);
        const data = await AppUsers.userRegister(data_user);
        if (data) {
            showNotification(data.message);
            setLoading(false);
            if (data.status === 1) {
                navigate('/auth/login');
            }
        }
    };

    return (
        <>
            <Loading show={loading} />
            <div className="select-none pt-[1.33333rem]">
                <div className={cx('navbar')}>
                    <div className={cx('left-0', 'navbar-left')}>
                        <div onClick={() => navigate(-1)} className="flex justify-center items-center">
                            <img className={cx('navbar-back')} src={iBack} alt="" />
                        </div>
                    </div>
                    <div className={cx('navbar-title')}>Đăng ký</div>
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
                                autoComplete="false"
                                spellCheck={false}
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
                                placeholder="Mật khẩu"
                                autoComplete="false"
                                spellCheck={false}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('item', 'pl-[0.88rem]', 'flex justify-center items-center')}>
                            <div className={cx('number', 'flex')}>
                                <span className="flex justify-center items-center">
                                    <div className={cx('invite')}></div>
                                </span>
                            </div>
                            <input
                                className="w-full outline-none"
                                type="text"
                                autoComplete="false"
                                placeholder="Mã giới thiệu"
                                value={invite}
                                spellCheck={false}
                                onChange={(e) => setInvite(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center cursor-pointer">
                            <div onClick={() => setChecked(!checked)} className={cx('van-checkbox')}>
                                <div
                                    className={`van-checkbox__icon van-checkbox__icon--square ${
                                        checked && 'van-checkbox__icon--checked'
                                    }`}
                                >
                                    <i
                                        className="van-icon van-icon-success"
                                        style={{
                                            borderColor: checked && 'rgb(244, 69, 62)',
                                            backgroundColor: checked && 'rgb(244, 69, 62)',
                                        }}
                                    ></i>
                                </div>
                                <span className={cx('van-checkbox__label')}>
                                    <div className="agree pr-[0.2rem]">Tôi đồng ý {'  '}</div>
                                </span>
                            </div>
                            <Link to="" className={cx('txt')}>
                                {'  '}Chính sách bảo mật
                            </Link>
                        </div>
                        <div disabled={loading} onClick={() => handlingRegister()} className="mian-btn mt-[1.06667rem]">
                            <button className={cx('gradient', 'van-button', 'flex justify-center items-center')}>
                                <span>Đăng ký</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
