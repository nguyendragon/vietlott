// Img
import bingo18_stroke from '@assets/images/bingo18-stroke.png';
// Lib
import ConfirmTop from './ConfirmTop';
import ConfirmContent from './ConfirmContent';
import ConfirmBottom from './ConfirmBottom.';
import classNames from 'classnames';
import './BoxConfirm.scss';
// Framework
import { createContext, useEffect, useState } from 'react';

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export let BoxConfirms = createContext();

function BoxConfirm({ children, handleDataGame, dataGames, setDataGame, setTotalGames }) {
    const [active, setActive] = useState(false);
    const [dataBtn, setDataBtn] = useState({ type: '0', numberType: '0', x: '0' });
    const [notification, setNotification] = useState(false);
    const [typeJoin, setTypeJoin] = useState('');
    const [amount, setAmount] = useState('');

    const showBoxConfirm = async (status, type = '', numberType = '', x = '', data_type = '') => {
        setActive(status);
        if (!status) await sleep(300);
        setNotification(status);
        setDataBtn({ type, numberType, x });
        if (data_type) {
            setTypeJoin(Number(data_type));
        }
    };

    const handleGames = () => {
        handleDataGame({ type: typeJoin, amount: amount });
    };

    return (
        <BoxConfirms.Provider value={showBoxConfirm}>
            {children}
            <div id="box-confirm" className={classNames({ hidden: !notification })}>
                <div
                    className={classNames(
                        { 'v-enter-active v-enter-to': active, 'v-leave-active v-leave-to': !active },
                        'cdk-overlay-container',
                    )}
                >
                    <div className="opacity-100 bg-[#00000052] cdk-overlay-backdrop"></div>
                    <div className="cdk-global-overlay-wrapper justify-center items-center">
                        <div className="cdk-overlay-pane customize_dialog_css max-w-[335px] w-[335px] static translate-y-[-20px]">
                            <div className="mat-dialog-container transform-none overflow-hidden">
                                <div className="flex flex-col items-center bg-[#0f6947] pb-2">
                                    <img src={bingo18_stroke} className="cursor-pointer logo" width="125" alt="" />
                                    <div className="flex flex-col items-center h-full relative y-[20px] overflow-visible">
                                        <ConfirmTop hiddenBox={showBoxConfirm} dataBtn={dataBtn} />
                                        <ConfirmContent notification={notification} setAmount={setAmount} />
                                        <ConfirmBottom
                                            typeJoin={typeJoin}
                                            dataGames={dataGames}
                                            setDataGame={setDataGame}
                                            handleGames={handleGames}
                                            hiddenBox={showBoxConfirm}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BoxConfirms.Provider>
    );
}

export default BoxConfirm;
