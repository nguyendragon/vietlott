import start from '@assets/images/start.svg';
import diamond from '@assets/images/diamond.svg';
import classNames from 'classnames';
import './Button.scss';

function Button3({ title, amount = '' }) {
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
        <div className="button3 w-full cursor-pointer">
            <div className="w-full flex items-center justify-center relative h-full">
                <div className="flex flex-col items-center w-full px-[3px]">
                    <div className="flex justify-center w-full">
                        {Array(2)
                            .fill({})
                            .map(() => {
                                return (
                                    <div key={Math.random()} className="relative flex justify-center items-center">
                                        <div
                                            className={classNames(
                                                'roulette-ball',
                                                { action: amount },
                                                'flex justify-center relative',
                                            )}
                                        >
                                            <span className="triple">{title}</span>
                                            <img alt="" src={start} className="star w-[9px]" />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="relative flex justify-center items-center">
                        <div
                            className={classNames('roulette-ball', { action: amount }, 'flex justify-center relative')}
                        >
                            <span className="triple">{title}</span>
                            <img alt="" src={start} className="star w-[9px]" />
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
        </div>
    );
}

export default Button3;
