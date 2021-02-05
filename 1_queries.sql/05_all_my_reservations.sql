SELECT (properties.*), (reservations.*), AVG(rating) AS avg_rating
FROM property_reviews
JOIN properties ON property_id = properties.id
JOIN reservations ON reservation_id = reservations.id
WHERE property_reviews.guest_id = 1
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date DESC
LIMIT 10;
