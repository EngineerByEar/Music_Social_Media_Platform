import jwt from 'jsonwebtoken';
import "dotenv/config";
export function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
}
export function validateAuth(req, res, next) {
    try {
        const header = (req.headers.authorization ?? '').trim();
        if (!header.startsWith("Bearer")) {
            res.status(401).send();
            return;
        }
        const token = header.substring('Bearer '.length);
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.params._username = decode.username;
        next();
    }
    catch (e) {
        res.status(401).send();
    }
}
//# sourceMappingURL=auth.js.map