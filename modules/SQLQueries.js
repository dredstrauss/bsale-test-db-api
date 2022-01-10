const all = `SELECT category.name AS category, p.id AS id, p.name AS name, p.url_image AS img, p.price AS price, p.discount AS off FROM product AS p JOIN category ON p.category = category.id;`;

const categories = 'SELECT category.name FROM category;';

const category = (by) => {
    const query = `
    SELECT
        p.id AS id,
        p.name AS name,
        p.url_image AS img,
        p.price AS price,
        p.discount AS off
    FROM
        product AS p
    JOIN category ON
        p.category = category.id
    WHERE category.name = '${by}';`;

    return query
}

module.exports = {
    all,
    category,
    categories
}
