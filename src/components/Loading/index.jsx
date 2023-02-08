import './Loading.scss';

function Loading({ show = true }) {
    // let body = document.body;
    // body.classList.add('overflow-hidden');
    // body.classList.remove('overflow-hidden');

    return (
        <div className={`select-none Loading flex justify-center items-center duration-300 ${!show && 'hidden'} `}>
            <div className="van-loading van-loading--circular">
                <span
                    className="van-loading__spinner van-loading__spinner--circular"
                    style={{ color: 'rgb(242, 65, 59)' }}
                >
                    <svg viewBox="25 25 50 50" className="van-loading__circular">
                        <circle cx="50" cy="50" r="20" fill="none"></circle>
                    </svg>
                </span>
            </div>
        </div>
    );
}

export default Loading;
