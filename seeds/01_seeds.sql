INSERT INTO users (name, email, password) 
VALUES
  ('Harimoto Santo', 'harimoto@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Sam Don', 'sam@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('YiQing Wang', 'yiqing@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Bob King', 'king@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('John Wright', 'wright@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Haley Dophy', 'dophy@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Tree Skywalker', 'tree@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Jane Bennett', 'bennett@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
  (1, 'Down quiet', 'a quiet house', 'https://www.pexels.com/photo/small-wooden-house-in-countryside-4947357/', 'https://www.pexels.com/photo/sunbeam-above-green-hills-with-rural-house-and-road-4947274/', 190, 2, 2, 3, 'United States', '#300 bank st.', 'New York', 'New York', 'NY1098', true),
  (2, 'Loud Shelter', 'a loud house', 'https://www.pexels.com/photo/small-wooden-house-in-countryside-4947357/', 'https://www.pexels.com/photo/sunbeam-above-green-hills-with-rural-house-and-road-4947274/', 150, 1, 2, 2, 'United States', '#100 bank st.', 'New York', 'New York', 'NY1025', true),
  (3, 'Wooden Heaven', 'a humble abode', 'https://www.pexels.com/photo/small-wooden-house-in-countryside-4947357/', 'https://www.pexels.com/photo/sunbeam-above-green-hills-with-rural-house-and-road-4947274/', 110, 1, 1, 2, 'United States', '#40 humble st.', 'Mountain View', 'California', 'MV1436', true),
  (4, 'Concrete Jungle', 'concrete everywhere', 'https://www.pexels.com/photo/small-wooden-house-in-countryside-4947357/', 'https://www.pexels.com/photo/sunbeam-above-green-hills-with-rural-house-and-road-4947274/', 180, 3, 4, 4, 'United States', '#75 Biggie st.', 'Houston', 'Texas', 'HR5526', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2018-09-11', '2018-09-26', 1, 6),
  ('2019-11-12', '2019-11-25', 2, 5),
  ('2014-10-09', '2014-11-05', 3, 8),
  ('2017-02-02', '2017-03-03', 2, 4),
  ('2020-01-27', '2020-03-22', 4, 7);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
  (6, 1, 1, 9, 'pretty pleasant stay'),
  (5, 2, 2, 8, 'comfy home'),
  (8, 3, 3, 9, 'Great kitchen'),
  (4, 2, 4, 3, 'Bad home smell'),
  (7, 4, 5, 7, 'ok, just ok...');