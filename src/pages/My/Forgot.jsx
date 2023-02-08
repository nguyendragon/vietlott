import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
// lib
import styles from './Forgot.module.scss';
import Header from '@layout/Header';
import AppUsers from '@services/AppUsers';
import { Notifications } from '@src/utils/Notification';
import Loading from '@components/Loading';

const cx = classNames.bind(styles);

function Forgot() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const showNotification = useContext(Notifications);

    const handleChangePassword = async () => {
        if (!password || !newPassword || !reNewPassword) {
            return showNotification('Vui lòng điền vào phần cần thiết');
        }

        if (newPassword.length < 6 || reNewPassword.length < 6) {
            return showNotification('Độ dài mật khẩu không được nhỏ hơn 6 kí tự');
        }

        if (newPassword !== reNewPassword) {
            return showNotification('Mật khẩu xác nhận không chính xác');
        }
        setLoading(true);
        let data = await AppUsers.changePassword(password, newPassword);
        setLoading(false);
        if (data.status == 1) {
            setPassword('');
            setNewPassword('');
            setReNewPassword('');
        }
        return showNotification(data.message);
    };

    return (
        <>
            <Loading show={loading} />
            <Header left={true} title="Đặt lại mật khẩu" />
            <div className="select-none pt-[1.33333rem]">
                <div className={cx('login-box')}>
                    <div className={cx('mian-from')}>
                        {/* <div className={cx('lab', 'mt-2')}>
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
                        </div> */}
                        {/* <div className={cx('item', 'pl-[0.88rem]', 'flex justify-center items-center')}>
                            <div className={cx('number', 'flex')}>
                                <span className="flex justify-center items-center">
                                    <div className={cx('code_otp')}></div>
                                </span>
                            </div>
                            <input className="w-full outline-none" type="number" placeholder="Mã xác nhận" />
                            <button className={cx('otp')}>OTP</button>
                        </div>
                        <div className={cx('tip')}>Không nhận được mã OTP ? Vui lòng liên hệ CSKH</div> */}
                        <div className={cx('item', 'pl-[0.88rem]', 'flex justify-center items-center')}>
                            <div className={cx('number', 'flex')}>
                                <span className="flex justify-center items-center">
                                    <div className={cx('password')}></div>
                                </span>
                            </div>
                            <input
                                className="w-full outline-none"
                                type="password"
                                placeholder="Mật khẩu hiện tại"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
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
                                placeholder="Mật khẩu mới"
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
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
                                placeholder="Xác nhận mật khẩu mới"
                                onChange={(e) => setReNewPassword(e.target.value)}
                                value={reNewPassword}
                            />
                        </div>
                        <div className="mian-btn mt-[1.06667rem]">
                            <button
                                onClick={() => handleChangePassword()}
                                className={cx('gradient', 'van-button', 'flex justify-center items-center')}
                            >
                                <span>Xác nhận</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forgot;
