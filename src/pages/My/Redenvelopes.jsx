import classNames from 'classnames/bind';
import styles from './Redenvelopes.module.scss';
import Header from '@layout/Header';
import Redenvelope from '@assets/images/Redenvelope.png';

const cx = classNames.bind(styles);

function Redenvelopes() {
    return (
        <div className="pt-[1.33333rem]">
            <Header left={true} title="Quà tặng" />
            <div className={cx('mian')}>
                <div className={cx('redenve', 'pt-2')}>
                    <div className={cx('head-tit')}>
                        <div className={cx('txt')}>Chào bạn</div>
                        <div className={cx('txt')}>Mỗi một cái</div>
                        <div className={cx('des')}>Tôi có món quà tặng bạn</div>
                    </div>
                    <div className={cx('con')}>
                        <div className={cx('box')}>
                            <div className={cx('icon', 'flex justify-center items-center')}>
                                <span className={cx('white')}></span>
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center">
                                    <div className="w-[80%] van-image">
                                        <img src={Redenvelope} className="van-image__img" />
                                    </div>
                                </div>
                                <div className={cx('tit')}>Mã quà tặng</div>
                                <input
                                    type="text"
                                    placeholder="Vui lòng nhập mã quà tặng"
                                    className={cx('input', 'first', 'caret-pink-500', 'text-pink-500')}
                                    spellCheck={false}
                                    onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                                />
                            </div>
                        </div>
                        <div className={cx('flex justify-center mt-3', 'btn')}>
                            <div className={cx('gradient')}>
                                <button className={cx('btns', 'van-button', 'w-full', 'rounded-full')}>
                                    <div className={cx('van-button__content')}>
                                        <span className={cx('van-button__text')}>
                                            <span>Tạo lệnh</span>
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Redenvelopes;
