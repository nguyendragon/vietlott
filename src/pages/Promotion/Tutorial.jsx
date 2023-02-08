import classNames from 'classnames/bind';
import styles from './Promotion.module.scss';
import Header from '@layout/Header';
import TableDaily from './components/TableDaily';
import NavPromotion from './components/NavPromotion';

const cx = classNames.bind(styles);
function Tutorial() {
    return (
        <div className="bg-[#f4f4f4]">
            <Header to={'/my'} left={true} title="Hướng dẫn" />
            <div className="py-[.76667rem]">
                <NavPromotion />
                <div className="pt-[1.4rem]"></div>
                <TableDaily />
            </div>
        </div>
    );
}

export default Tutorial;
