import jwt from 'jsonwebtoken';
import config from '../config';

const CreateJwt = (data) => {
    let payload = { data };
    let key = config.JWT_SECRET;
    let token = '';
    try {
        token = jwt.sign(payload, key, { expiresIn: '3d' });
    } catch (error) {
        console.log(error);
    }
    return token;
};

export default CreateJwt;
