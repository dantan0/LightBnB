const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
pool.connect();

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
    SELECT *
    FROM users
    WHERE email = $1
  `, [email])
  .then(res => res.rows[0]);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
    SELECT *
    FROM users
    WHERE id = $1
  `, [id])
  .then(res => res.rows[0]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const { name, email, password } = user;
  return pool.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *
  `, [name, email, password])
  .then(res => res.rows);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
    SELECT (properties.*), (reservations.*), AVG(rating) AS avg_rating
    FROM property_reviews
    JOIN properties ON property_id = properties.id
    JOIN reservations ON reservation_id = reservations.id
    WHERE property_reviews.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date DESC
    LIMIT $2
  `;
  return pool.query(queryString, [guest_id, limit])
  .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // destructure the options
  const { city, owner_id, minimum_price_per_night, maximum_price_per_night, minimum_rating } = options;

  const queryParams = [];

  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
  `;

  if (city) {
    queryParams.push(`%${city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (owner_id) {
    queryParams.push(owner_id);
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  if (minimum_price_per_night) {
    queryParams.push(minimum_price_per_night * 100);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }

  if (maximum_price_per_night) {
    queryParams.push(maximum_price_per_night * 100);
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }

  if (minimum_rating) {
    queryParams.push(minimum_rating);
    queryString += `AND rating >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length}
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
  .then(res => res.rows);

}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  // console.log(Object.values(property));
  // for (const [key, value] of Object.entries(property)) {
  //   console.log(key, value, typeof value);
  // }
  return pool.query(`
    INSERT INTO properties (
      title,
      description,
      number_of_bathrooms,
      number_of_bedrooms,
      parking_spaces,
      cost_per_night,
      thumbnail_photo_url,
      cover_photo_url,
      street,
      country,
      city,
      province,
      post_code,
      owner_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *
    `, [property.title, property.description, property.number_of_bathrooms, property.number_of_bedrooms, property.parking_spaces, property.cost_per_night, property.thumbnail_photo_url, property.cover_photo_url, property.street, property.country, property.city, property.province, property.post_code, property.owner_id]
  ).then(res => res.rows);
}
exports.addProperty = addProperty;
