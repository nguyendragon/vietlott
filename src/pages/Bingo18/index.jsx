import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import volume_off from '@assets/images/volume_off.png';
import volume_on from '@assets/images/volume_on.png';

import './component/Bingo18.scss';
import BingoTotal from './BingoTotal';
import BingoFull from './BingoFull';
import Loading from '@components/Loading';
import BoxBet from './BoxBet';
import BoxConfirm from './component/BoxConfirm';
import LayoutHistory from './component/BoxHistory';
import Star from '@components/Star';
import CountdownClock from './component/CountdownClock';
import { Notifications } from '@src/utils/Notification';
import AppUsers from '@services/AppUsers';

const check_volume = localStorage.getItem('volume');
if (!check_volume) localStorage.setItem('volume', 'on');

function Bingo18() {
    const showNotification = useContext(Notifications);
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [volume, setVolume] = useState(localStorage.getItem('volume') === 'on' ? true : false);

    const [listOrderOld, setListOrderOld] = useState({ period: '00000000', result: ['0', '0', '0'] });

    const [dataGames, setDataGame] = useState([]);
    const [totalGames, setTotalGames] = useState(0);

    const handleDataGame = (newJoin) => {
        if (newJoin.amount <= 0) {
            return showNotification('Bet count can not be empty');
        }
        let check = dataGames.find((data) => {
            return data.type === newJoin.type;
        });
        let total = 0;
        if (!check) {
            setDataGame([...dataGames, newJoin]);
            let arrTemp = [...dataGames, newJoin];
            total = arrTemp.reduce((a, b) => {
                return a + b.amount;
            }, 0);
        } else {
            let newData = dataGames.map((data) => {
                return data.type == newJoin.type ? newJoin : data;
            });
            total = newData.reduce((a, b) => {
                return a + b.amount;
            }, 0);
            setDataGame(newData);
        }
        setTotalGames(total);
    };

    const handleVolume = () => {
        if (localStorage.getItem('volume') == 'off') {
            localStorage.setItem('volume', 'on');
            setVolume(true);
        } else {
            localStorage.setItem('volume', 'off');
            setVolume(false);
        }
    };

    useEffect(() => {
        (async () => {
            let data = await AppUsers.userInfo();
            if (data.status === 4 && localStorage.getItem('token')) {
                showNotification(data.message);
                localStorage.removeItem('token');
                navigate('/auth/login');
            }
            setUserInfo(data.data);
            setLoading(false);
        })();
    }, []);
    return (
        <BoxConfirm handleDataGame={handleDataGame} dataGames={dataGames} setDataGame={setDataGame}>
            <Loading show={loading} />
            <div id="bingo18" className="flex flex-col min-h-screen pb-[100px] relative">
                <div className="mt-1">
                    <div className="h-4 flex items-center relative justify-between">
                        <div onClick={() => navigate(-1)} className="z-10 cursor-pointer px-2 py-1">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                        <div className="absolute top-0 left-0 right-0 bottom-0 m-auto flex justify-center items-center text-[20px]">
                            <h1 className="font-bold">BINGO18</h1>
                        </div>
                        <div onClick={() => handleVolume()} className="cursor-pointer mr-1 z-[1000]">
                            <img className="w-[.66667rem] h-[.66667rem]" src={volume ? volume_on : volume_off} alt="" />
                        </div>
                    </div>

                    <div className="flex justify-center w-full mt-1">
                        <div className="flex select-game">
                            <button
                                onClick={() => setActive(true)}
                                className={`flex-1 text-[0.35rem] game-total ${active && 'active'}`}
                            >
                                Bàn cộng tổng
                            </button>
                            <button
                                onClick={() => setActive(false)}
                                className={`flex-1 text-[0.35rem] game-full ${!active && 'active'}`}
                            >
                                Bàn đầy đủ
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center w-full py-[12px] relative mt-1">
                        <div className="flex-1 text-center">
                            <p className="text-[0.27rem] leading-[14px] text-[#ccc]">Kỳ quay hiện tại</p>
                            <div className="draw-id mt-[0.1rem]"> #{listOrderOld?.period} </div>
                        </div>
                        <CountdownClock />
                        <div className="flex-1 intro text-center">
                            <p className="text-[0.27rem] leading-[14px] text-[#ccc]">Kết quả kỳ trước</p>
                            <div className="flex justify-center items-center gap-[5px] draw-id mt-[0.1rem]">
                                <Star size={15} title={listOrderOld?.result[0]} />
                                <Star size={15} title={listOrderOld?.result[1]} />
                                <Star size={15} title={listOrderOld?.result[2]} />
                            </div>
                        </div>
                    </div>

                    {active ? (
                        <BingoTotal dataGames={dataGames} handleDataGame={handleDataGame} />
                    ) : (
                        <BingoFull dataGames={dataGames} handleDataGame={handleDataGame} />
                    )}
                    <BoxBet
                        setTotalGames={setTotalGames}
                        setDataGame={setDataGame}
                        showNotification={showNotification}
                        dataGames={dataGames}
                        totalGames={totalGames}
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        setLoading={setLoading}
                    />

                    <LayoutHistory setListOrderOld={setListOrderOld} listOrderOld={listOrderOld} />
                    <Loading show={loading} />
                </div>
            </div>
        </BoxConfirm>
    );
}

export default Bingo18;
