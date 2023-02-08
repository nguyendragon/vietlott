import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
// Lib
import classNames from 'classnames/bind';
import styles from './Promotion.module.scss';
import Header from '@layout/Header';
import TableDaily from './components/TableDaily';
import NavPromotion from './components/NavPromotion';
import { Notifications } from '@src/utils/Notification';
import AppUsers from '@services/AppUsers';
import Loading from '@components/Loading';

const cx = classNames.bind(styles);
function Promotion() {
    const navigate = useNavigate();
    const openNotification = useContext(Notifications);

    const downloadQR = () => {
        const canvas = document.getElementById('_qr');
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = Date.now() + '_qr_bingo18.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const copy = (text) => {
        openNotification('Sao chép thành công');
        return navigator.clipboard.writeText(text);
    };

    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(true);

    useEffect(() => {
        (async () => {
            let data = await AppUsers.userInfo();
            if (data.status === 4) {
                openNotification(data.message);
                localStorage.removeItem('token');
                navigate('/auth/login');
            }
            setUserInfo(data.data);
            setLoading(false);
        })();
    }, []);

    return (
        <>
            <Loading show={loading} />
            <div className="bg-[#f4f4f4]">
                <Header to={'/my'} left={true} title="Quảng bá đại lý" />
                <div className="py-[.76667rem]">
                    <NavPromotion />
                    <div className="pt-[2rem]"></div>
                    <div className="bg-white p-[.4rem]">
                        <div className="flex justify-center items-center mb-2 acion">
                            <div className={cx('info-data')}>
                                <h5 className="font-bold">Hoa hồng ngày hôm qua</h5>
                                <p className="num mb-[0.15rem] font-bold text-[#f2413b] text-[.53333rem]">
                                    <span>0</span>
                                </p>
                                <p className="txt mb-[0.15rem]">
                                    <span>Hoa hồng trực tiếp: </span>
                                    <span>0</span>
                                </p>
                                <p className="txt">
                                    <span>Hoa hồng đội: </span>
                                    <span>0</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="mr-2">
                                <div
                                    id="qrcode"
                                    title={`${window.location.origin}/auth/register?r_code=${userInfo?.invite}`}
                                >
                                    <QRCodeCanvas
                                        id="_qr"
                                        value={`${window.location.origin}/auth/register?r_code=${userInfo?.invite}`}
                                        level={'H'}
                                        alt="Scan me!"
                                    />
                                    <div
                                        onClick={() => downloadQR()}
                                        className="text-[0.3rem] select-none mt-1 text-center"
                                    >
                                        Nhấn vào đây để lưu <br></br>mã QR
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="btn-box">
                                    <div
                                        onClick={() => copy(userInfo?.invite)}
                                        className={cx('btn', 'flex justify-center items-center mb-1 cursor-pointer')}
                                    >
                                        Sao chép Mã giới thiệu
                                    </div>
                                    <div
                                        onClick={() =>
                                            copy(`${window.location.origin}/auth/register?r_code=${userInfo?.invite}`)
                                        }
                                        className={cx('btn', 'flex justify-center items-center mb-1 cursor-pointer')}
                                    >
                                        Sao chép đường dẫn
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TableDaily />
                </div>
            </div>
        </>
    );
}

export default Promotion;
