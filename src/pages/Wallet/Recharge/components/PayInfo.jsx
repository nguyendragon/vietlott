import copy_info from '@assets/images/copy_info.png';
import { Notifications } from '@src/utils/Notification';
import { useContext } from 'react';
import AppUsers from '@services/AppUsers';

function formatMoneyVN(money = '0') {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function PayInfo({ data: { data }, setGetBankOrder, setLoading }) {
    const openNotification = useContext(Notifications);

    const copy = (text) => {
        openNotification('Sao chép thành công');
        return navigator.clipboard.writeText(text);
    };

    const handleCancelRecharge = async () => {
        setLoading(true);
        let { status } = await AppUsers.CancelRecharge();
        setLoading(false);
        if (status == 1) {
            setGetBankOrder({});
            return openNotification('Hủy đơn thành công');
        }
    };

    return (
        <div className="mt-2">
            <div className="info">
                <div className="box mb-1 flex justify-between items-center">
                    <div className="tit"> Ngân hàng </div>
                    <div className="flex justify-between con items-center tag-read">
                        <div className="text ml-[2px]">{data?.name_info}</div>
                        <div onClick={() => copy(data?.name_info)}>
                            <div className="tag-read van-image w-[22px] h-[20px]">
                                <img src={copy_info} className="van-image__img" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box mb-1 flex justify-between items-center">
                    <div className="tit"> Tên chủ tài khoản </div>
                    <div className="flex justify-between con items-center">
                        <div className="text ml-[2px]">{data?.name_account}</div>
                        <div onClick={() => copy(data?.name_account)}>
                            <div className="tag-read van-image w-[22px] h-[20px]">
                                <img src={copy_info} className="van-image__img" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box mb-1 flex justify-between items-center">
                    <div className="tit"> Số tiền thành toán </div>
                    <div className="flex justify-between con items-center">
                        <div className="text ml-[2px]">{formatMoneyVN(data?.money)}.00 ₫</div>
                        <div onClick={() => copy(data?.money)}>
                            <div className="tag-read van-image w-[22px] h-[20px]">
                                <img src={copy_info} className="van-image__img" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box mb-1 flex justify-between items-center">
                    <div className="tit"> Mã đơn hàng </div>
                    <div className="flex justify-between con items-center">
                        <div className="text ml-[2px]">{data?.order_code}</div>
                        <div onClick={() => copy(data?.order_code)}>
                            <div className="tag-read van-image w-[22px] h-[20px]">
                                <img src={copy_info} className="van-image__img" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box mb-1 flex justify-between items-center">
                    <div className="tit">Thời gian thanh toán còn lại</div>
                    <div className="flex justify-between con items-center">
                        <div className="text ml-[2px]">{data?.add_time}</div>
                        <div onClick={() => copy(data?.add_time)}>
                            <div className="tag-read van-image w-[22px] h-[20px]">
                                <img src={copy_info} className="van-image__img" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="des mt-3">
                    *Số tiền chuyển phải điền đúng với lệnh bạn đã tạo, nếu không sẽ không được cập nhật tiền thành công
                </div>
                <div className="des">
                    Nếu quý khách chuyển sai số tiền đã tạo lệnh , khoản tiền bị thất thoát công ty chúng tôi sẽ không
                    chịu trách nhiệm !
                </div>
                <div className="des">Lưu ý : Không hủy bỏ lệnh nạp nếu đã chuyển tiền hoàn tất</div>
                <div className="cursor-pointer w-full flex justify-center mt-2">
                    <div className="w-full item flex-cover">
                        <div
                            onClick={() => handleCancelRecharge()}
                            className="w-full mx-auto btn bg-[#b5b5b5] cancel active:bg-[#d8d8d8] duration-75"
                        >
                            Hủy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayInfo;
