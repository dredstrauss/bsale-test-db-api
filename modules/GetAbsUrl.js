const getAbsUrl = (req) => {
    let url = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (url.slice(-1) !== '/') url += '/'
    return url
};

module.exports = getAbsUrl;
