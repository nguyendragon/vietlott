import './404.scss';

function NotFound() {
    return (
        <div id="all">
            <div id="center">
                <span id="err-404">Error 404!</span>
                <br />
                <span className="err-msg">The requested URL was not found on this server.</span>
            </div>
        </div>
    );
}

export default NotFound;
