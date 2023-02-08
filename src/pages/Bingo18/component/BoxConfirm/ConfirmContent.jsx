// import reduction from '@assets/images/reduction.svg';
// import plus from '@assets/images/plus.svg';
// import re_select from '@assets/images/re_select.svg';
import diamond from '@assets/images/diamond.svg';
import classNames from 'classnames/bind';
import styles from './ConfirmContent.module.scss';

import { useEffect, useState } from 'react';

const formatMoneyVN = (money = '0') => {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const cx = classNames.bind(styles);

function ConfirmContent({ setAmount, notification }) {
    const list_amount = [1000, 10000, 100000, 500000];
    const x = [1, 5, 10, 20, 50, 100];
    const [amountX, setAmountX] = useState(list_amount[0]);
    const [X, setX] = useState(1);

    const [money, setMoney] = useState(list_amount[0]);

    const handleActive = (x, money) => {
        setMoney((x ? x : X) * (money ? money : amountX));
    };

    useEffect(() => {
        setX(1);
        setAmountX(list_amount[0]);
        setMoney(x[0] * list_amount[0]);
    }, [notification]);

    useEffect(() => {
        setMoney(X * amountX);
    }, [X]);

    useEffect(() => {
        setAmount(Number(money));
    }, [money]);

    return (
        <>
            <div className="title">Chọn mệnh giá</div>
            <div className="flex w-full justify-between items-center display relative">
                <div className="background" style={{ background: 'rgba(0, 153, 95, 0.5)' }}></div>
                <button
                    onClick={() => setMoney((money) => (money -= X * amountX))}
                    disabled={money <= X * amountX ? true : false}
                    className="z-10 mat-focus-indicator operation flex items-center justify-center mat-flat-button mat-button-base cdk-focused cdk-program-focused"
                    style={{ background: 'rgb(205, 233, 140)' }}
                >
                    <span className="flex items-center justify-center mat-button-wrapper">
                        <p
                            className={cx('font-bold text-[.6rem] w-[0.4rem] h-[3px]', {
                                'bg-[#8888]': money <= X * amountX,
                                'bg-[#555]': money > X * amountX,
                            })}
                        ></p>
                    </span>
                    <span className="mat-ripple mat-button-ripple"></span>
                    <span className="mat-button-focus-overlay"></span>
                </button>
                <div className="relative">
                    <img alt="" src={diamond} width="128px" className="z-10" />
                    <div className="current-amount flex flex-col justify-center items-center">
                        <p>{formatMoneyVN(money)}</p>
                        {/* <p>
                            <input
                                maxLength="13"
                                className="text-center bg-transparent"
                                type="text"
                                value={formatMoneyVN(money)}
                                onChange={(e) => handleChange(e)}
                            />
                        </p> */}
                        <span>VNĐ</span>
                    </div>
                </div>
                <button
                    onClick={() => setMoney((money) => (money += X * amountX))}
                    className="mat-focus-indicator operation flex items-center justify-center mat-flat-button mat-button-base"
                    style={{ background: 'rgb(205, 233, 140)' }}
                >
                    <span className="mat-button-wrapper">
                        <p className="font-bold text-[.6rem] text-[#555]">+</p>
                    </span>
                    <span className="mat-ripple mat-button-ripple"></span>
                    <span className="mat-button-focus-overlay"></span>
                </button>
            </div>
            <div className={cx('w-[250px]', 'confirm-content')}>
                <div className={cx('item', 'flex justify-between items-center')}>
                    <div className={cx('tit')}>Số tiền</div>
                    <div className={cx('flex', 'amount-box')}>
                        {list_amount.map((item) => {
                            return (
                                <div
                                    key={Math.random()}
                                    onClick={() => {
                                        handleActive('', item);
                                        return setAmountX(item);
                                    }}
                                    className={cx('li', { action: item == amountX })}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('item', 'flex justify-between items-center', 'mt-1.5')}>
                    <div className={cx('tit')}>Số lượng</div>
                    <div className={cx('flex justify-between', 'stepper-box')}>
                        <div
                            onClick={() => {
                                handleActive(
                                    setX((X) => X - 1),
                                    '',
                                );
                            }}
                            className={cx(
                                'li',
                                'minus',
                                { action: X > 1 },
                                { 'pointer-events-none': X == 1 },
                                'flex justify-center items-center',
                            )}
                        >
                            -
                        </div>
                        <div className={cx('digit-box')}>
                            <div className="van-field__body">
                                <input
                                    type="tel"
                                    maxLength="4"
                                    inputMode="numeric"
                                    className={cx('van-field__control')}
                                    value={X}
                                    onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
                                    onChange={(e) => setX(e.target.value)}
                                />
                            </div>
                        </div>
                        <div
                            onClick={() =>
                                handleActive(
                                    setX((X) => Number(X) + 1),
                                    '',
                                )
                            }
                            className={cx('li', 'plus', 'flex justify-center items-center', {
                                action: X,
                                'pointer-events-none': !X && X < 1,
                            })}
                        >
                            +
                        </div>
                    </div>
                </div>
                <div className={cx('item', 'my-1.5')}>
                    <div className={cx('flex justify-between', 'multiple-box')}>
                        {x.map((item) => {
                            return (
                                <div
                                    key={Math.random()}
                                    onClick={() => {
                                        handleActive(item, '');
                                        return setX(item);
                                    }}
                                    className={cx('li', { action: item == X })}
                                >
                                    X{item}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmContent;
