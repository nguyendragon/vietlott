import { ButtonGreen, ButtonYellow, Button1, Button2, Button3 } from '@components/Button';
import question from '@assets/images/question.svg';
import './component/Bingo18Full.scss';
import { BoxConfirms } from './component/BoxConfirm';
import { memo, useContext } from 'react';

function BingoFull({ dataGames }) {
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
            <div>
                <div className="flex-auto keypad">
                    <div className="h-full layout" id="advancedKeypad">
                        <div className="flex flex-col items-center">
                            <div className="flex w-full h-[71px] mb-[0.3rem]">
                                <div onClick={() => showBoxConfirm(true, 'Nhỏ', '3 - 9', '2', '0')} className="w-full">
                                    <ButtonGreen
                                        title="Tổng 3-9"
                                        body="Nhỏ"
                                        color="#ffffff"
                                        x="2"
                                        amount={selectBtn(0) ? selectBtn(0) : ''}
                                    />
                                </div>
                                <div
                                    onClick={() => showBoxConfirm(true, 'Hòa', '10 - 11', '2', '1')}
                                    className="w-full mx-[0.06rem]"
                                >
                                    <ButtonGreen
                                        title="Tổng 10-11"
                                        body="Hòa"
                                        color="#ffbf1b"
                                        x="2"
                                        amount={selectBtn(1) ? selectBtn(1) : ''}
                                    />
                                </div>
                                <div
                                    onClick={() => showBoxConfirm(true, 'Lớn', '12 - 18', '2', '2')}
                                    className="w-full "
                                >
                                    <ButtonGreen
                                        title="Tổng 12-18"
                                        body="Lớn"
                                        color="#0A4429"
                                        x="2"
                                        amount={selectBtn(2) ? selectBtn(2) : ''}
                                    />
                                </div>
                            </div>

                            <div className="total-title flex items-center opacity-100">
                                <span className="font-bold text-[0.25rem]">Cộng tổng</span>
                                <div
                                    className="cursor-pointer hint-icon flex justify-center items-center"
                                    style={{ background: 'rgb(15, 105, 71)' }}
                                >
                                    <img className="opacity-50 icon" src={question} width="6" />
                                </div>
                            </div>

                            <div className="flex flex-col w-full">
                                <div className="flex w-full h-[60px]">
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '3', '120', '3')}
                                        className="w-full"
                                    >
                                        <ButtonYellow
                                            title="3"
                                            x="120"
                                            radius={false}
                                            borderTopLeft={true}
                                            amount={selectBtn(3) ? selectBtn(3) : ''}
                                        />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '4', '40', '4')}
                                        className="w-full mx-[0.03rem]"
                                    >
                                        <ButtonYellow
                                            title="4"
                                            x="40"
                                            radius={false}
                                            amount={selectBtn(4) ? selectBtn(4) : ''}
                                        />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '5', '20', '5')}
                                        className="w-full"
                                    >
                                        <ButtonYellow
                                            title="5"
                                            x="20"
                                            radius={false}
                                            amount={selectBtn(5) ? selectBtn(5) : ''}
                                        />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '6', '12', '6')}
                                        className="w-full mx-[0.03rem]"
                                    >
                                        <ButtonYellow
                                            title="6"
                                            x="12"
                                            radius={false}
                                            amount={selectBtn(6) ? selectBtn(6) : ''}
                                        />
                                    </div>
                                    <div onClick={() => showBoxConfirm(true, 'Tổng', '7', '8', '7')} className="w-full">
                                        <ButtonYellow
                                            title="7"
                                            x="8"
                                            radius={false}
                                            amount={selectBtn(7) ? selectBtn(7) : ''}
                                        />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '8', '5.5', '8')}
                                        className="w-full mx-[0.03rem]"
                                    >
                                        <ButtonYellow
                                            title="8"
                                            x="5.5"
                                            radius={false}
                                            amount={selectBtn(8) ? selectBtn(8) : ''}
                                        />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '9', '4.7', '9')}
                                        className="w-full"
                                    >
                                        <ButtonYellow
                                            title="9"
                                            x="4.7"
                                            radius={false}
                                            amount={selectBtn(9) ? selectBtn(9) : ''}
                                        />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '10', '4.4', '10')}
                                        className="w-full ml-[0.03rem]"
                                    >
                                        <ButtonYellow
                                            title="10"
                                            x="4.4"
                                            radius={false}
                                            borderTopRight={true}
                                            amount={selectBtn(10) ? selectBtn(10) : ''}
                                        />
                                    </div>
                                </div>

                                <div className="flex w-full h-[60px] mt-[1px]">
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '18', '120', '18')}
                                        className="w-full"
                                    >
                                        <ButtonYellow
                                            title="18"
                                            x="120"
                                            radius={false}
                                            borderBottomLeft={true}
                                            amount={selectBtn(18) ? selectBtn(18) : ''}
                                        />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '17', '40', '17')}
                                        className="w-full mx-[0.03rem]"
                                    >
                                        <ButtonYellow
                                            title="17"
                                            x="40"
                                            radius={false}
                                            amount={selectBtn(17) ? selectBtn(17) : ''}
                                        />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '16', '20', '16')}
                                        className="w-full"
                                    >
                                        <ButtonYellow
                                            title="16"
                                            x="20"
                                            radius={false}
                                            amount={selectBtn(16) ? selectBtn(16) : ''}
                                        />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '15', '12', '15')}
                                        className="w-full mx-[0.03rem]"
                                    >
                                        <ButtonYellow
                                            title="15"
                                            x="12"
                                            radius={false}
                                            amount={selectBtn(15) ? selectBtn(15) : ''}
                                        />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '14', '8', '14')}
                                        className="w-full"
                                    >
                                        <ButtonYellow
                                            title="14"
                                            x="8"
                                            radius={false}
                                            amount={selectBtn(14) ? selectBtn(14) : ''}
                                        />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '13', '5.5', '13')}
                                        className="w-full mx-[0.03rem]"
                                    >
                                        <ButtonYellow
                                            title="13"
                                            x="5.5"
                                            radius={false}
                                            amount={selectBtn(13) ? selectBtn(13) : ''}
                                        />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '12', '4.7', '12')}
                                        className="w-full"
                                    >
                                        <ButtonYellow
                                            title="12"
                                            x="4.7"
                                            radius={false}
                                            amount={selectBtn(12) ? selectBtn(12) : ''}
                                        />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, 'Tổng', '11', '4.4', '11')}
                                        className="w-full ml-[0.03rem]"
                                    >
                                        <ButtonYellow
                                            title="11"
                                            x="4.4"
                                            radius={false}
                                            borderBottomRight={true}
                                            amount={selectBtn(11) ? selectBtn(11) : ''}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex single-title items-center">
                                <span className="font-bold mr-[0.25rem]">1 số trùng</span>
                                <span className="text-[0.25rem]">1 số x1.2</span>
                                <div className="divider"></div>
                                <span className="text-[0.25rem]">2 số x2</span>
                                <div className="divider"></div>
                                <span className="text-[0.25rem]">3 số x3</span>
                                <div
                                    className="hint-icon flex justify-center items-center"
                                    style={{ background: 'rgb(15, 105, 71)' }}
                                >
                                    <img className="opacity-50 icon" src={question} width="6" />
                                </div>
                            </div>

                            <div id="single-roulette" className="w-full">
                                <div className="flex w-full p-[3px] rounded-[7px] opacity-100 h-[76px] bg-[#0f6947]">
                                    <div
                                        onClick={() => showBoxConfirm(true, '1 Số trùng', '1', '1.2', '19')}
                                        className="flex w-full"
                                    >
                                        <Button1 title="1" amount={selectBtn(19) ? selectBtn(19) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '1 Số trùng', '2', '1.2', '20')}
                                        className="flex w-full bg-[#0a4429]"
                                    >
                                        <Button1 title="2" amount={selectBtn(20) ? selectBtn(20) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '1 Số trùng', '3', '1.2', '21')}
                                        className="flex w-full"
                                    >
                                        <Button1 title="3" amount={selectBtn(21) ? selectBtn(21) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '1 Số trùng', '4', '1.2', '22')}
                                        className="flex w-full bg-[#0a4429]"
                                    >
                                        <Button1 title="4" amount={selectBtn(22) ? selectBtn(22) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '1 Số trùng', '5', '1.2', '23')}
                                        className="flex w-full"
                                    >
                                        <Button1 title="5" amount={selectBtn(23) ? selectBtn(23) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '1 Số trùng', '6', '1.2', '24')}
                                        className="flex w-full bg-[#0a4429]"
                                    >
                                        <Button1 title="6" amount={selectBtn(24) ? selectBtn(24) : ''} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex single-title items-center">
                                <span className="font-bold mr-[0.25rem]">2 số trùng nhau</span>
                                <span className="text-[0.25rem]">x7.5</span>
                                <div
                                    className="hint-icon flex justify-center items-center"
                                    style={{ background: 'rgb(15, 105, 71)' }}
                                >
                                    <img className="opacity-50 icon" src={question} width="6" />
                                </div>
                            </div>

                            <div id="single-roulette" className="w-full">
                                <div className="flex w-full p-[3px] rounded-[7px] opacity-100 h-[76px] bg-[#0f6947]">
                                    <div
                                        onClick={() => showBoxConfirm(true, '2 Số trùng nhau', '1', '7.5', '25')}
                                        className="flex w-full"
                                    >
                                        <Button2 title="1" amount={selectBtn(25) ? selectBtn(25) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '2 Số trùng nhau', '2', '7.5', '26')}
                                        className="flex w-full bg-[#0a4429]"
                                    >
                                        <Button2 title="2" amount={selectBtn(26) ? selectBtn(26) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '2 Số trùng nhau', '3', '7.5', '27')}
                                        className="flex w-full"
                                    >
                                        <Button2 title="3" amount={selectBtn(27) ? selectBtn(27) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '2 Số trùng nhau', '4', '7.5', '28')}
                                        className="flex w-full bg-[#0a4429]"
                                    >
                                        <Button2 title="4" amount={selectBtn(28) ? selectBtn(28) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '2 Số trùng nhau', '5', '7.5', '29')}
                                        className="flex w-full"
                                    >
                                        <Button2 title="5" amount={selectBtn(29) ? selectBtn(29) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '2 Số trùng nhau', '6', '7.5', '30')}
                                        className="flex w-full bg-[#0a4429]"
                                    >
                                        <Button2 title="6" amount={selectBtn(30) ? selectBtn(30) : ''} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex single-title items-center">
                                <span className="font-bold mr-[0.25rem]">3 số trùng nhau</span>
                                <span className="text-[0.25rem]">x120</span>
                                <div className="divider"></div>
                                <span className="font-bold mr-[0.25rem]">3 số trùng nhau bất kì</span>
                                <span className="text-[0.25rem]">x20</span>
                                <div
                                    className="hint-icon flex justify-center items-center"
                                    style={{ background: 'rgb(15, 105, 71)' }}
                                >
                                    <img className="opacity-50 icon" src={question} width="6" />
                                </div>
                            </div>

                            <div id="single-roulette" className="w-full">
                                <div className="flex w-full p-[3px] rounded-[7px] opacity-100 h-[76px] bg-[#0f6947]">
                                    <div
                                        onClick={() => showBoxConfirm(true, '3 Số trùng nhau', '1', '120', '31')}
                                        className="flex w-full"
                                    >
                                        <Button3 title="1" amount={selectBtn(31) ? selectBtn(31) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '3 Số trùng nhau', '2', '120', '32')}
                                        className="flex w-full bg-[#0a4429]"
                                    >
                                        <Button3 title="2" amount={selectBtn(32) ? selectBtn(32) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '3 Số trùng nhau', '3', '120', '33')}
                                        className="flex w-full"
                                    >
                                        <Button3 title="3" amount={selectBtn(33) ? selectBtn(33) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '3 Số trùng nhau', '4', '120', '34')}
                                        className="flex w-full bg-[#0a4429]"
                                    >
                                        <Button3 title="4" amount={selectBtn(34) ? selectBtn(34) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '3 Số trùng nhau', '5', '120', '35')}
                                        className="flex w-full"
                                    >
                                        <Button3 title="5" amount={selectBtn(35) ? selectBtn(35) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '3 Số trùng nhau', '6', '120', '36')}
                                        className="flex w-full bg-[#0a4429]"
                                    >
                                        <Button3 title="6" amount={selectBtn(36) ? selectBtn(36) : ''} />
                                    </div>
                                    <div
                                        onClick={() => showBoxConfirm(true, '3 Số trùng nhau', '*', '20', '37')}
                                        className="flex w-full"
                                    >
                                        <Button3 title="*" amount={selectBtn(37) ? selectBtn(37) : ''} />
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

export default memo(BingoFull);
