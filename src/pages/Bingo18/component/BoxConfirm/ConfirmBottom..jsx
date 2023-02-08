import { useEffect } from 'react';

function ConfirmBottom({ hiddenBox, handleGames, dataGames, setDataGame, typeJoin }) {
    const cancelJoin = () => {
        let newData = dataGames.filter((item) => {
            return item.type !== typeJoin;
        });
        setDataGame(newData);
    };

    useEffect(() => {
        cancelJoin();
    }, []);

    return (
        <>
            <div className="limit mt-1">Không vượt quá 2,000,000,000đ/kỳ QSMT</div>
            <div className="action flex w-full">
                <button
                    onClick={() => {
                        cancelJoin();
                        return hiddenBox(false);
                    }}
                    className="mat-focus-indicator reset flex justify-center items-center mat-flat-button mat-button-base"
                >
                    <span className="mat-button-wrapper"> Hủy đặt </span>
                    <span matripple="" className="mat-ripple mat-button-ripple"></span>
                    <span className="mat-button-focus-overlay"></span>
                </button>
                <button
                    onClick={() => {
                        handleGames();
                        hiddenBox(false);
                    }}
                    className="mat-focus-indicator confirm flex justify-center items-center mat-flat-button mat-button-base"
                    style={{
                        background: 'rgb(205, 233, 140)',
                        color: 'rgb(15, 105, 71)',
                    }}
                >
                    <span className="mat-button-wrapper"> Đồng ý </span>
                    <span matripple="" className="mat-ripple mat-button-ripple"></span>
                    <span className="mat-button-focus-overlay"></span>
                </button>
            </div>
        </>
    );
}

export default ConfirmBottom;
