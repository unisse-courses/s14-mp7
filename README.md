# VILLA RESERVATION SYSTEM

## Michaela Ragasa, Alex Ramos, Angelo Remudaro

* Remudaro, Angelo

* Ragasa, Michaela

* Ramos, Alexandra Louise

# Villa La Isla
This is the code of group 7 of CCAPDEV S14. This web application is a Villa Reservation System with three (3) themed villages (Siargao, Toscana, Mykonos) consisting of four (4) types of villa (VIP, Deluxe, Suite, Premier). This allows registered users to reserve a villa.

## Application Deployed in Heroku
Click ** to see the deployed web application in Heroku.

## Local Setup
1. Navigate to the directory: `cd s14-mp7`
2. Install the dependencies: `npm install`
3. Run the server using the script defined (using nodemon): `npm run dev`
    * Navigate to `http://localhost:3000/` in the browser to view the app.
    * Expected screen should home page of Villa La Isla
    * All pages can be accessed through the navigation bar except from the page used to reserve a villa which can be accessed when 'Reserve A Villa' button is clicked in any of the village pages (Siargao, Toscana, Mykonos).

## How to Reserve
1. Sign up as guest or log in using:
	username: guest
	password: guest
2. Go to any of the villages then click the 'Reserve A Villa' button.
3. Enter the check-in and check-out dates, number of guests, and the village theme to see available villas.
4. Available villas will be shown and click the 'Reserve Now' button of the villa you want to reserve.
5. Cancel reservations in your profile.

## How to View Reservations
1. Sign up as admin or log in using
	username: admin
	password: admin
2. Go to 'Reservations' page

## NPM Packages and Third Party Libraries
NPM Packages and Third Party Libraries used can be found in `http://localhost:3000/about`. The link to the about page can be clicked in the footer's navigation bar.