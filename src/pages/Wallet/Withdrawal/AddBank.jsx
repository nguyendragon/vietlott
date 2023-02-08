import Header from '@layout/Header';
import pay_icon_debitcard_red from '@assets/images/pay_icon_debitcard_red.png';
import './AddBank.scss';
import { Notifications } from '@src/utils/Notification';
import { useContext, useState } from 'react';
import AppUsers from '@services/AppUsers';

function AddBank() {
    const openNotification = useContext(Notifications);
    const [nameBank, setNameBank] = useState('');
    const [NameUser, setNameUser] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [phoneCard, setPhoneCard] = useState('');

    const handleAddBank = async () => {
        if (!nameBank || !NameUser || !accountNumber || !phoneCard) {
            return openNotification('Vui lòng điền vào phần được cần thiết');
        }

        let { message, status } = await AppUsers.SetWithdrawalBankCard(nameBank, NameUser, accountNumber, phoneCard);
        if (status == 1) {
            setNameBank('');
            setNameUser('');
            setAccountNumber('');
            setPhoneCard('');
        }
        return openNotification(message);
    };

    return (
        <div className="select-none">
            <Header left={true} title={'Thêm thẻ ngân hàng'} />
            <div className="pt-[1.33333rem]">
                <div className="bank">
                    <div className="box">
                        <div className="flex mb-1 items-center">
                            <div className="w-[40px] h-[40px] van-image">
                                <img src={pay_icon_debitcard_red} className="van-image__img" />
                            </div>
                            <div className="pl-1"> Thêm thẻ ngân hàng </div>
                        </div>
                        <div className="item">
                            <div className="lab"> Tên ngân hàng </div>
                            <div className="input">
                                <input
                                    type="text"
                                    placeholder="Cần thiết điền"
                                    className="ipt"
                                    spellCheck={false}
                                    value={nameBank}
                                    onChange={(e) => setNameBank(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="lab">Tên chủ tài khoản</div>
                            <div className="input">
                                <input
                                    type="text"
                                    placeholder="Cần thiết điền"
                                    className="ipt"
                                    spellCheck={false}
                                    value={NameUser}
                                    onChange={(e) => setNameUser(e.target.value)}
                                    onInput={(e) =>
                                        (e.target.value = e.target.value.replace(/[^a-zA-Z\s+$]/g, '').toUpperCase())
                                    }
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="lab">Số tài khoản</div>
                            <div className="input">
                                <input
                                    type="number"
                                    placeholder="Cần thiết điền"
                                    className="ipt"
                                    spellCheck={false}
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="lab">Số điện thoại</div>
                            <div className="input">
                                <input
                                    type="text"
                                    placeholder="Cần thiết điền"
                                    maxLength={10}
                                    className="ipt"
                                    spellCheck={false}
                                    value={phoneCard}
                                    onChange={(e) => setPhoneCard(e.target.value)}
                                    onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-2 bank-btn">
                        <button
                            onClick={() => handleAddBank()}
                            className="btn van-button van-button--default van-button--normal van-button--block van-button--round"
                        >
                            <div className="van-button__content">
                                <span className="van-button__text"> Thêm thẻ ngân hàng </span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBank;
