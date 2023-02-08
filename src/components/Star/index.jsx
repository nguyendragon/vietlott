import classNames from 'classnames/bind';
import styles from './Star.module.scss';
import start from '@assets/images/start.svg';

const cx = classNames.bind(styles);

function Star({ title, size = '16' }) {
    return (
        <div className="relative flex justify-center items-center">
            <div className={cx('roulette-ball', `text-[${size}px]`, 'flex justify-center relative')}>
                <span className={cx('single')}>{title}</span>
                <img alt="" src={start} className="w-[12px]" />
            </div>
        </div>
    );
}

export default Star;
