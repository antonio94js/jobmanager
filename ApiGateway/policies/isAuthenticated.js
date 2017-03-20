// import jwtHandler from '../handler/jwtHandler';

const ensureAuthenticated = (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).json({
            "Message": "The Authentication header is missing"
        });
    }

    let [scheme, token] = req.headers.authorization.split(" ");
    // console.log(scheme);
    // console.log(token);

    if (!/^Bearer$/i.test(scheme)) {

        return res.status(401).json({
            err: 'Format is Authorization: Bearer [token]'
        });
    }

    req.token = token;
};

export default ensureAuthenticated;
