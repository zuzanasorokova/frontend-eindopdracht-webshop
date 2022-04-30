

const verifyToken = (token) => {
    return token * 1000 > Date.now();
};

export default verifyToken;