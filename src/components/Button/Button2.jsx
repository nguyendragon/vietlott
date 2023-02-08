import start from '@assets/images/start.svg';
import diamond from '@assets/images/diamond.svg';
import classNames from 'classnames';
import './Button.scss';

function Button2({ title, amount = '' }) {
    function nFormatter(num, digits = 0) {
        const lookup = [
            { value: 1, symbol: '' },
            { value: 1e3, symbol: 'k' },
            { value: 1e6, symbol: 'M' },
            { value: 1e9, symbol: 'G' },
            { value: 1e12, symbol: 'T' },
            { value: 1e15, symbol: 'P' },
            { value: 1e18, symbol: 'E' },
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup
            .slice()
            .reverse()
            .find(function (item) {
                return num >= item.value;
            });
        return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
    }
    return (
        <div className="button2 w-full cursor-pointer">
            <div className="w-full flex items-center justify-center relative h-full">
                <div className="relative flex justify-center items-center">
                    <div className="flex flex-col w-full px-[6px] opacity-100">
                        <div className="flex justify-center translate-x-[-7px]">
                            <div className="relative flex justify-center items-center">
                                <div
                                    className={classNames(
                                        'roulette-ball',
                                        { action: amount },
                                        'flex justify-center relative',
                                    )}
                                >
                                    <span className="double">{title}</span>
                                    <img alt="" src={start} className="star w-[12px]" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center translate-x-[7px]">
                            <div className="relative flex justify-center items-center">
                                <div
                                    className={classNames(
                                        'roulette-ball',
                                        { action: amount },
                                        'flex justify-center relative',
                                    )}
                                >
                                    <span className="double">{title}</span>
                                    <img alt="" src={start} className="star w-[12px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {amount && (
                    <span className="right-diamond">
                        <img alt="" src={diamond} width="32px" />
                        <span className="betAmount">{nFormatter(amount)}</span>
                    </span>
                )}
            </div>
        </div>
    );
}

export default Button2;
