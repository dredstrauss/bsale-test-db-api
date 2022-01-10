const getAbsUrl = (req,res) => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    return url
};

module.exports = getAbsUrl;
