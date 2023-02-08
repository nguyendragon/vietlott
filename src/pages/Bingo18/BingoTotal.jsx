import { ButtonGreen, ButtonYellow } from '@components/Button';
import { BoxConfirms } from './component/BoxConfirm';
import { memo, useContext } from 'react';

import './component/Bingo18.scss';
function BingoTotal({ handleDataGame, dataGames }) {
    const showBoxConfirm = useContext(BoxConfirms);
    const selectBtn = (type) => {
        let data = dataGames.find((item) => {
            return item.type == type;
        });
        if (!data) return false;
        return data.amount;
    };
    return (
        <>
            <div className="flex-auto px-[11px]">
                <div className="flex min-h-[421px]">
                    <div className="flex flex-col flex-grow">
                        <div
                            onClick={() => {
                                showBoxConfirm(true, 'Nhỏ', '3-9', '2', '0');
                            }}
                            className="flex-d-2"
                        >
                            <ButtonGreen
                                title="Tổng 3-9"
                                body="Nhỏ"
                                color="#ffffff"
                                x="2"
                                amount={selectBtn(0) ? selectBtn(0) : ''}
                            />
                        </div>
                        <div
                            onClick={() => showBoxConfirm(true, 'Hòa', '10-11', '2', '1')}
                            className="flex-d-1 my-[0.06rem]"
                        >
                            <ButtonGreen
                                title="Tổng 10-11"
                                body="Hòa"
                                color="#ffbf1b"
                                x="2"
                                amount={selectBtn(1) ? selectBtn(1) : ''}
                            />
                        </div>
                        <div onClick={() => showBoxConfirm(true, 'Lớn', '12-18', '2', '2')} className="flex-d-2">
                            <ButtonGreen
                                title="Tổng 12-18"
                                body="Lớn"
                                color="#0A4429"
                                x="2"
                                amount={selectBtn(2) ? selectBtn(2) : ''}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col flex-grow mx-[0.06rem]">
                        <div className="flex-d-2">
                            <div className="flex flex-col flex-grow h-full">
                                <div
                                    onClick={() => showBoxConfirm(true, 'Tổng', '3', '120', '3')}
                                    className="flex-grow"
                                >
                                    <ButtonYellow title="3" x="120" amount={selectBtn(3) ? selectBtn(3) : ''} />
                                </div>
                                <div className="flex flex-grow mt-[0.06rem]">
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '6', '12', '6')}
                                        className="flex-grow mr-[0.06rem]"
                                    >
                                        <ButtonYellow title="6" x="12" amount={selectBtn(6) ? selectBtn(6) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '7', '8', '7')}
                                        className="flex-grow"
                                    >
                                        <ButtonYellow title="7" x="8" amount={selectBtn(7) ? selectBtn(7) : ''} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => showBoxConfirm(true, 'Tổng', '10', '4.4', '10')}
                            className="flex-d-1 my-[0.06rem]"
                        >
                            <ButtonYellow title="10" x="4.4" amount={selectBtn(10) ? selectBtn(10) : ''} />
                        </div>
                        <div className="flex-d-2">
                            <div className="flex flex-col flex-grow h-full">
                                <div className="flex flex-grow">
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '12', '4.7', '12')}
                                        className="flex-grow mr-[0.06rem]"
                                    >
                                        <ButtonYellow title="12" x="4.7" amount={selectBtn(12) ? selectBtn(12) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '13', '5.5', '13')}
                                        className="flex-grow"
                                    >
                                        <ButtonYellow title="13" x="5.5" amount={selectBtn(13) ? selectBtn(13) : ''} />
                                    </div>
                                </div>
                                <div className="flex flex-grow mt-[0.06rem]">
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '16', '20', '16')}
                                        className="flex-grow mr-[0.06rem]"
                                    >
                                        <ButtonYellow title="16" x="20" amount={selectBtn(16) ? selectBtn(16) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '17', '40', '17')}
                                        className="flex-grow"
                                    >
                                        <ButtonYellow title="17" x="40" amount={selectBtn(17) ? selectBtn(17) : ''} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-grow">
                        <div className="flex-d-2">
                            <div className="flex flex-col flex-grow h-full">
                                <div className="flex flex-grow">
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '4', '40', '4')}
                                        className="flex-grow mr-[0.06rem]"
                                    >
                                        <ButtonYellow title="4" x="40" amount={selectBtn(4) ? selectBtn(4) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '5', '20', '5')}
                                        className="flex-grow"
                                    >
                                        <ButtonYellow title="5" x="20" amount={selectBtn(5) ? selectBtn(5) : ''} />
                                    </div>
                                </div>
                                <div className="flex flex-grow mt-[0.06rem]">
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '8', '5.5', '8')}
                                        className="flex-grow mr-[0.06rem]"
                                    >
                                        <ButtonYellow title="8" x="5.5" amount={selectBtn(8) ? selectBtn(8) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '9', '4.7', '9')}
                                        className="flex-grow"
                                    >
                                        <ButtonYellow title="9" x="4.7" amount={selectBtn(9) ? selectBtn(9) : ''} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => showBoxConfirm(true, 'Tổng', '11', '4.4', '11')}
                            className="flex-d-1 my-[0.06rem]"
                        >
                            <ButtonYellow title="11" x="4.4" amount={selectBtn(11) ? selectBtn(11) : ''} />
                        </div>
                        <div className="flex-d-2">
                            <div className="flex flex-col flex-grow h-full">
                                <div className="flex flex-grow">
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '14', '8', '14')}
                                        className="flex-grow mr-[0.06rem]"
                                    >
                                        <ButtonYellow title="14" x="8" amount={selectBtn(14) ? selectBtn(14) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '15', '12', '15')}
                                        className="flex-grow"
                                    >
                                        <ButtonYellow title="15" x="12" amount={selectBtn(15) ? selectBtn(15) : ''} />
                                    </div>
                                </div>
                                <div className="flex flex-grow mt-[0.06rem]">
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '18', '120', '18')}
                                        className="flex-grow"
                                    >
                                        <ButtonYellow title="18" x="120" amount={selectBtn(18) ? selectBtn(18) : ''} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(BingoTotal);
