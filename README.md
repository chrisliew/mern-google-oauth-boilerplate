Remove package.json engines see if it still deploys after

npm install

create two google developer files: One for Dev, one for Prod. Prod one will link back to heroku URL, no auth/google for the first authorized one, but will include auth/google/callback for callback. Dev one will Authorize http://localhost:5000/auth/google

create two mongo databases in Mlab. One for Dev, one for Prod.

create new dev.js file in config folder. Put the client secret and ID here, and MongoURL here and cookieKey here (make this one up)

create a new Heroku instance and push to it. sign in to heroku dashboard, then add configs for GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, MONGO_URL, COOKIE_KEY here.

git add and commit, then push to heroku master, and test to see if auth/google pulls up the login page.
