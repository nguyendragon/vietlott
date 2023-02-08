// Img
import copy_info from '@assets/images/copy_info.png';
import empty_default from '@assets/images/empty-image-default.png';
// Lib
import Header from '@layout/Header';
import './components/HistoryWithdrawal.scss';
import Loading from '@components/Loading';
import { Notifications } from '@src/utils/Notification';
import AppUsers from '@services/AppUsers';
//
import { useContext, useEffect, useState } from 'react';

function HistoryWithdrawal() {
    const openNotification = useContext(Notifications);
    const [ListWithdrawal, setListWithdrawal] = useState([]);
    const [loading, setLoading] = useState(true);

    const copy = (text) => {
        openNotification('Sao chép thành công');
        return navigator.clipboard.writeText(text);
    };

    useEffect(() => {
        (async () => {
            let { data } = await AppUsers.getWithdrawLog();
            setListWithdrawal(data);
            setLoading(false);
        })();
    }, []);

    return (
        <>
            <Loading show={loading} />
            <Header left={true} title="Lịch sử rút tiền" />
            <div className="pt-[1.333rem] px-1">
                <div className="list-recharge-record">
                    {ListWithdrawal.map((item) => {
                        let color = item.status == 1 || item.status == 0 ? 'success' : 'danger';
                        return (
                            <div key={Math.random()} className="item flex justify-between items-center py-1">
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <span className="text-[0.4rem]">{item.order_code}</span>
                                        <img
                                            onClick={() => copy(item.order_code)}
                                            className="cursor-pointer ml-1 w-[20px] h-[18px]"
                                            src={copy_info}
                                            alt=""
                                        />
                                    </div>
                                    <div className="money my-[2px]">
                                        <span className={`text-[0.4rem] ${color}`}>{item.money}.00 ₫</span>
                                    </div>
                                    <span className="text-[0.32rem]">{item.time}</span>
                                </div>
                                <div
                                    className={`flex justify-center items-center ${color} font-semibold text-[0.35rem]`}
                                >
                                    {item.status == 0 && ' Đang yêu cầu'}
                                    {item.status == 1 && 'Thành công'}
                                    {item.status == 2 && 'Đã hủy'}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="text-center py-2">
                    {ListWithdrawal.length == 0 && (
                        <img className="mx-auto w-[4.26667rem] h-[4.26667rem]" src={empty_default} alt="" />
                    )}
                    <p className="text-[0.34rem]">không còn dữ liệu</p>
                </div>
            </div>
        </>
    );
}

export default HistoryWithdrawal;
