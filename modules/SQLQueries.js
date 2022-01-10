const all = `SELECT category.name AS category, p.id AS id, p.name AS name, p.url_image AS img, p.price AS price, p.discount AS off FROM product AS p JOIN category ON p.category = category.id;`;

module.exports = {
    all
}
