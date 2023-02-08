import diamond from '@assets/images/diamond.svg';
import './Button.scss';

import { useState } from 'react';

function ButtonGreen({ title = '', body = '', color = '', x = '', amount = '' }) {
    const [click, setClick] = useState(false);

    const MouseUp = () => {
        setTimeout(() => {
            setClick(false);
        }, 250);
    };

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
        <div className="relative w-full h-full" onMouseDown={() => setClick(true)} onMouseUp={() => MouseUp()}>
            <button className="btn-parent mat-focus-indicator flex flex-col justify-center items-center relative w-full h-full mat-flat-button mat-button-base cdk-focused cdk-program-focused">
                <span className="mat-button-wrapper">
                    <span className="button-border"></span>
                    <div className="w-full h-full absolute glow-container">
                        <span className="glow"></span>
                    </div>

                    {amount && (
                        <span className="diamond">
                            <img alt="" src={diamond} width="34px" />
                            <span>{nFormatter(amount)}</span>
                        </span>
                    )}

                    <div className="w-full h-full z-50">
                        <div className="flex flex-col justify-center items-center big-button relative z-50">
                            <div className="title">{title}</div>
                            <div className="relative">
                                <div className="body text-shadow"> {body} </div>
                                <div className={`body relative z-50`} style={{ color: color }}>
                                    {' '}
                                    {body}{' '}
                                </div>
                                <div className="value">x{x}</div>
                            </div>
                        </div>
                    </div>
                    <span className="content"></span>
                </span>
                <span className="mat-ripple mat-button-ripple">
                    <div className={`mat-ripple-element ${click && 'mat-ripple-element2'}`}></div>
                </span>
                <span className="mat-button-focus-overlay"></span>
            </button>
        </div>
    );
}

export default ButtonGreen;
