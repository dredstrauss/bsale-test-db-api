const versionsList = (vArray,url,text) => {
    let list = {}; list[text] = {};
    vArray.forEach( v => {
        list[text][v] = `${url}${v}`
    } );
    return list
}

module.exports = versionsList;
