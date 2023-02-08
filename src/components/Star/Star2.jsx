import classNames from 'classnames/bind';
import styles from './Star.module.scss';
import start from '@assets/images/start.svg';

const cx = classNames.bind(styles);

function Star2({ title, size = '13' }) {
    return (
        <div className="mx-[5px] relative flex justify-center items-center">
            <div className={cx('roulette-ball_2', 'flex justify-center items-center relative')}>
                <span className={cx('single', `text-[${size}px]`)}>{title}</span>
                <img alt="" src={start} className="w-[12px]" />
            </div>
        </div>
    );
}

export default Star2;
