import { Navbar } from '../index';

import { useEffect } from 'react';

function DefaultLayout({ children }) {
    let props = children.props;
    useEffect(() => {
        // document.title = props.title;
        window.scrollTo({ top: 0 }); // , behavior: 'smooth'
    }, [children.props.link]);
    return (
        <div className="App bg-white">
            {children}
            {props.layout && <Navbar link={props.link} />}
        </div>
    );
}

export default DefaultLayout;
