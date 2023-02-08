import Users from '../models/users.model';
import jwt from 'jsonwebtoken';
import config from '../config';

const VerifyToken = async (req, res, next) => {
    let key = config.JWT_SECRET;
    let authorization = req.headers.authorization;
    if (authorization && authorization.split(' ')[1]) {
        let token = authorization.split(' ')[1];
        jwt.verify(token, key, async (err, decoded) => {
            if (err) {
                return res.status(200).json({
                    status: 4,
                    message: 'Phiên đăng nhập hết hạn',
                });
            }
            let phone = decoded.data;
            let user = await Users.findByPhone(phone);
            if (!user) {
                return res.status(200).json({
                    status: 4,
                    message: 'Phiên đăng nhập hết hạn',
                });
            }
            req.phone = phone;
            next();
        });
    } else {
        return res.status(200).json({
            status: 4,
            message: 'Phiên đăng nhập hết hạn',
        });
    }
};

export default VerifyToken;
