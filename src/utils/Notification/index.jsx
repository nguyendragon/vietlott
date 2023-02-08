import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { createContext, useRef } from 'react';
import { useState } from 'react';
import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export let Notifications = createContext();

function Notification({ children }) {
    const [active, setActive] = useState(true);

    const [notification, setNotification] = useState(false);
    let title = useRef('');

    const showNotification = async (text) => {
        if (!notification) {
            title.current = text;
            setNotification(true);
            setActive(true);
            await sleep(1450);
            setActive(false);
            await sleep(50);
            setNotification(false);
        }
    };

    return (
        <>
            <Notifications.Provider value={showNotification}>
                {children}
                {notification && (
                    <div className={cx('msg')}>
                        <div
                            className={cx(
                                'msg-content',
                                { 'v-enter-active': active, 'v-enter-to': active },
                                { 'v-leave-active': !active, 'v-leave-to': !active },
                            )}
                        >
                            {title.current}
                        </div>
                    </div>
                )}
            </Notifications.Provider>
        </>
    );
}

export default Notification;
