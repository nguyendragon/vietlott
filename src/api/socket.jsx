import io from 'socket.io-client';
import settings from '../../settings.json';

const socket = io(settings.BASE_GAME, {
    withCredentials: true,
});

export default socket;
