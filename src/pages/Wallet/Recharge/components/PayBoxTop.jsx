import recharge_TRANSFER_red from '@assets/images/recharge_TRANSFER_red.png';
import recharge_TRANSFER from '@assets/images/recharge_TRANSFER.png';
import pay_icon_mobile_hui from '@assets/images/pay_icon_mobile_hui.png';
import pay_icon_mobile_red from '@assets/images/pay_icon_mobile_red.png';
import pay_icon_Ewallet_hui from '@assets/images/pay_icon_Ewallet_hui.png';
import pay_icon_QRunkuk_hui from '@assets/images/pay_icon_QRunkuk_hui.png';
import pay_icon_mobile_card_hui from '@assets/images/pay_icon_mobile card_hui.png';
import wallet_recharge from '@assets/images/wallet_recharge.png';
// framework
import { Notifications } from '@src/utils/Notification';
import { useContext } from 'react';

function PayBoxTop({ select, setSelect }) {
    const openNotification = useContext(Notifications);
    const showNotification = () => {
        return openNotification('Phương thức nạp đang bảo trì');
    };
    return (
        <>
            <div className="pay-box">
                <div className="title flex items-center">
                    <div className="van-image w-[20px] h-[20px]">
                        <img src={wallet_recharge} className="van-image__img" />
                    </div>
                    <span className="ml-1"> Phương thức thanh toán </span>
                </div>
                <div className="select-none list flex flex-wrap mt-1">
                    <div onClick={() => setSelect(1)} className={`cursor-pointer item ${select === 1 && 'action'}`}>
                        <img
                            width="20px"
                            height="20px"
                            src={select === 1 ? recharge_TRANSFER_red : recharge_TRANSFER}
                            className="img"
                        />
                        <div className="name">Chuyển khoản nhanh</div>
                        {select === 1 && (
                            <div className="icon">
                                <i className="van-icon van-icon-success text-white text-[14px]"></i>
                            </div>
                        )}
                    </div>
                    <div onClick={() => setSelect(2)} className={`cursor-pointer item ${select === 2 && 'action'}`}>
                        <img
                            width="20px"
                            height="20px"
                            src={select === 2 ? pay_icon_mobile_red : pay_icon_mobile_hui}
                            className="img"
                        />
                        <div className="name">Thanh toán online</div>
                        {select === 2 && (
                            <div className="icon">
                                <i className="van-icon van-icon-success text-white text-[14px]"></i>
                            </div>
                        )}
                    </div>
                    <div onClick={() => showNotification()} className="cursor-pointer item">
                        <img width="20px" height="20px" src={pay_icon_Ewallet_hui} className="img" />
                        <div className="name">Chuyển khoản trực tuyến</div>
                    </div>
                    <div onClick={() => showNotification()} className="cursor-pointer item">
                        <img width="20px" height="20px" src={pay_icon_QRunkuk_hui} className="img" />
                        <div className="name">Quét mã QR</div>
                    </div>
                    <div onClick={() => showNotification()} className="cursor-pointer item">
                        <img width="20px" height="20px" src={pay_icon_mobile_card_hui} className="img" />
                        <div className="name">THẺ CÀO</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PayBoxTop;
