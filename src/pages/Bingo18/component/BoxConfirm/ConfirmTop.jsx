import users_online from '@assets/images/users_online.svg';

import Star2 from '@components/Star/Star2';

function ConfirmTop({ dataBtn, hiddenBox }) {
    return (
        <>
            <div
                onClick={() => hiddenBox(false)}
                className="cursor-pointer close-btn text-[20px] leading-[24px] text-white translate-x-[35px]"
            >
                ✕
            </div>
            <div className="server-bet-amount pt-2">
                <span>Tổng tiền đặt: </span>
                <span>0đ</span>
            </div>
            <div className="flex justify-center items-center w-full relative mt-[16px]">
                <div className="flex w-full justify-between items-center">
                    <div className="bet-type-label" style={{ color: 'rgb(205, 233, 140)' }}>
                        {dataBtn.type}
                    </div>
                    <div className="price-value" style={{ color: 'rgb(205, 233, 140)' }}>
                        x{dataBtn.x}
                    </div>
                </div>
                <div className="flex justify-center items-center absolute">
                    <div
                        className="flex bet-type"
                        style={{
                            background:
                                'linear-gradient(90deg, rgb(15, 105, 71) 0%, rgb(205, 233, 140) 47.4%, rgb(15, 105, 71) 100%)',
                        }}
                    ></div>
                    {dataBtn.type.indexOf('Số trùng') >= 0 && (
                        <div className="flex bet-type-title">
                            {dataBtn.type.indexOf('1 Số trùng') >= 0 && (
                                <>
                                    <Star2 size={8} title={dataBtn.numberType} />
                                </>
                            )}
                            {dataBtn.type.indexOf('2 Số trùng nhau') >= 0 && (
                                <>
                                    <Star2 size={8} title={dataBtn.numberType} />
                                    <Star2 size={8} title={dataBtn.numberType} />
                                </>
                            )}
                            {dataBtn.type.indexOf('3 Số trùng nhau') >= 0 && (
                                <>
                                    <Star2 size={8} title={dataBtn.numberType} />
                                    <Star2 size={8} title={dataBtn.numberType} />
                                    <Star2 size={8} title={dataBtn.numberType} />
                                </>
                            )}
                        </div>
                    )}
                    {dataBtn.type.indexOf('Số trùng nhau') < 0 && (
                        <div className="bet-type-title">{dataBtn.numberType}</div>
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center mt-[20px]">
                <div className="live"></div>
                <img className="opacity-40" width="20" height="15" src={users_online} alt="" />
                <div className="viewer"> 0 </div>
            </div>
        </>
    );
}

export default ConfirmTop;
