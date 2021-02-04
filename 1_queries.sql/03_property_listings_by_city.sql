SELECT (properties.*), AVG(rating) AS avg_rating
FROM properties
JOIN property_reviews ON property_id = properties.id
WHERE city = 'Vancouver'
GROUP BY properties.id
HAVING AVG(rating) >= 4
ORDER BY cost_per_night;