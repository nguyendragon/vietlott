import classNames from 'classnames/bind';
import { memo } from 'react';
import { useState } from 'react';
import HistoryResult from './HistoryResult';
import HistoryBet from './HistoryBet';
import styles from './History.module.scss';

const cx = classNames.bind(styles);

function LayoutHistory({ setListOrderOld }) {
    const [history, setHistory] = useState(true); // true: lịch sử đặt cược, false: đặt cược của tôi

    return (
        <div className="mt-1 px-1 py-[12px]">
            <div className="flex justify-between">
                <div onClick={() => setHistory(true)}>
                    <button className={cx('btn-history', { active: history })}>
                        <span className="text-[0.35rem]">Lịch sử trò chơi</span>
                    </button>
                </div>
                <div onClick={() => setHistory(false)}>
                    <button className={cx('btn-history', { active: !history })}>
                        <span className="text-[0.35rem]">Đặt cược của tôi</span>
                    </button>
                </div>
            </div>

            {history ? <HistoryResult setListOrderOld={setListOrderOld} /> : <HistoryBet />}
        </div>
    );
}

export default memo(LayoutHistory);
