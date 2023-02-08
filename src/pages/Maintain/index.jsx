import vietlott from '@assets/images/vietlott.svg';
import god_on_cash from '@assets/images/god_on_cash.svg';

function Maintain() {
    return (
        <div className="mx-2 h-screen flex flex-col justify-center items-center">
            <div className="mb-2">
                <img src={vietlott} alt="" />
            </div>
            <div className="text-center">
                <h3 className="font-bold my-1">Bảo trì hệ thống</h3>
                <span className="my-2">
                    Hệ thống đang tiến hành bảo trì. Thời gian hoạt động trở lại: 15:01 18/01/2023
                </span>
            </div>
            <div className="my-4">
                <img src={god_on_cash} alt="" />
            </div>
            <div className="space-x-[5px]">
                <span>Hotline:</span>
                <a className="text-[#3498db]" href="">
                    1900 599 822
                </a>
                <span>(1500đ/phút)</span>
            </div>
        </div>
    );
}

export default Maintain;
