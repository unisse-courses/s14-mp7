// This is for the initial seeding in MongoDB Atlas which is already done
const Village = require('../models/village');
const Villa = require('../models/villa');
const Account = require('../models/account');
const Reservation = require('../models/reservation');
const Amenity = require('../models/amenity');
const mongoose = require('mongoose');
var db = mongoose.connection;
const bcrypt = require('bcrypt');
//const databaseURL = 'mongodb+srv://admin:admin@ccapdev-4kkwb.gcp.mongodb.net/s14mp7db';
const databaseURL = 'mongodb://localhost:27017/villalaisladb';
const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options, function (err) {
    if (err) throw err;

    // drop existing database;
    db.dropDatabase();
    console.log("Database dropped...");
})

mongoose.connect(databaseURL, options, function (err) {
    // for hashing of password in accounts
    const saltRounds = 10;

    if (err) throw err;

    console.log('Successfully connected');

    // seeding amenities
    var barAmenity = new Amenity({
        name: 'BEACH BAR AND RESTAURANTS',
        imagePath: 'img/resto.jpg',
        description: 'Villa La Isla offers an array of cuisine options. Each of the villages has its own specialty to choose from - Filipino, Greek and Italian. There is a wide variety of food options and cocktail drinks specializing in the country of origin in each menu which will certainly bring delight in every bite and sip. '
    });

    var beachfrontAmenity = new Amenity({
        name: 'BEACHFRONT',
        imagePath: 'img/beachfront.jpg',
        description: 'The beachfront is a perfect place to catch the epic waves, appreciate the island view and relax on the fine sands. As the morning approaches, a perfect view of the sunrise can be seen and as the sun sets, the scene of the crashing waves can be admired all in the beachfront of Villa La Isla.'
    });

    var poolAmenity = new Amenity({
        name: 'INFINITY POOL',
        imagePath: 'img/pool.jpg',
        description: 'As if the beach is not enough, the Infinity Pool allows you to indulge in the calming waters while still enjoying the view of the sea. Designed to incorporate man-made and natural, it enhances the experience of vacationing in Siargao. It is a perfect place to spend time with loved ones or oneself.'
    });

    var spaAmenity = new Amenity({
        name: 'SPA AND WELLNESS CENTER',
        imagePath: 'img/spa.jpg',
        description: 'The Spa and Wellness Center is a place for treatment to let go of stress or worries and to take a time for the well-being. Locally sourced oils are used to pamper and bring relaxation accompanied by jazz music.'
    });

    var yogaAmenity = new Amenity({
        name: 'YOGA STUDIO',
        imagePath: 'img/yoga.jpg',
        description: 'The Yoga Studio offers multiple sessions in Flow, Trapeze and Jivamukti. Villa La Isla trains instructors in using yoga to further help in improving the mind, body and soul while reaping the physical benefits as well.'
    });


    barAmenity.save(function(err) {
        if (err) throw err;
        console.log('bar Amenity successfully saved.');
    });

    beachfrontAmenity.save(function(err) {
        if (err) throw err;
        console.log('beachfront Amenity successfully saved.');
    });

    poolAmenity.save(function(err) {
        if (err) throw err;
        console.log('Pool Amenity successfully saved.');
    });

    spaAmenity.save(function(err) {
        if (err) throw err;
        console.log('Spa Amenity successfully saved.');
    });

    yogaAmenity.save(function(err) {
        if (err) throw err;
        console.log('Yoga Amenity successfully saved.');
    });

    // seeding villages
    var siargaoVillage = new Village ({
        _id: new mongoose.Types.ObjectId(),
        theme: 'siargao',
        desc: 'Having an island life vibe, the atmosphere is lively and full of life definitely showing that it is more fun in the Philippines.',
        imagePath: 'img/siargao5.jpg'
    });

    var mykonosVillage = new Village ({
        _id: new mongoose.Types.ObjectId(),
        theme: 'mykonos',
        desc: 'From the vivid nightlife to whitewashed structures, the village captures well-know island of Greece right here in Surigao Del Norte.',
        imagePath: 'img/mykonos2.jpg'
    });

    var toscanaVillage = new Village ({
        _id: new mongoose.Types.ObjectId(),
        theme: 'toscana',
        desc: 'Village displays the beauty of the islands in Tuscany, Italy and captures the burst of flavors that Italian cuisine has to offer.',
        imagePath: 'img/tuscany5.jpeg'
    });

    // saving michelle
    bcrypt.hash("admin", saltRounds, (err, hashed) => {
        var michelleAccount = new Account ({
            _id: new mongoose.Types.ObjectId(),
            name: "Michelle Lopez",
            username: "admin",
            email: "michlopez@gmail.com",
            password: hashed,
            isAdmin: "true",
            imagePath: 'img/girl.png'
        });
        michelleAccount.save(function(err) {
            if (err) throw err;

            console.log('Michelle Account (admin) successfully saved.');

        });
    });

    //seeding villas in siargao village
    siargaoVillage.save(function(err) {
        if (err) throw err;
        console.log('Siargao Village successfully saved.');

        var siargaoVip = new Villa ({
            _id: new mongoose.Types.ObjectId(),
            villatype: 'vip',
            price: 5400,
            capacity: 2,
            rooms: 1,
            imagePath: 'img/vip.jpg',
            shortDesc:'Siargao Village represents what Siargao is all about. Having an island life vibe, the atmosphere is lively and full of life. Includes a king sized bed that can accomodate 2 people in 1 bedroom.',
            inclusions: ['1 King Bed', 'Air conditioned', 'Cable/Satellite TV', 'WiFi', 'Netflix',
                        'Linen, Towels and Bathrobes', 'Toiletries', '1 Shower Room'],
            villageTheme: 'siargao',
            village: siargaoVillage._id
        });

        siargaoVip.save(function(err) {
            if (err) throw err;

            console.log('Siargao VIP successfully saved.');

            // saving bea
            bcrypt.hash("gomezbea1992", saltRounds, (err, hashed) => {
                var beaAccount = new Account ({
                    _id: new mongoose.Types.ObjectId(),
                    name: "Bea Gomez",
                    username: "beagomez",
                    email: "beagomez@gmail.com",
                    password: hashed,
                    isAdmin: "false",
                    imagePath: 'img/girl.png'
                });

                beaAccount.save(function(err) {
                    if (err) throw err;
                    console.log('Bea Account successfully saved.');
                    
                    //seeding reservations in accounts
                    var beaReservation = new Reservation ({
                                _id: new mongoose.Types.ObjectId(),
                                account: beaAccount._id,
                                checkIn: "2020-04-23",
                                checkOut: "2020-04-26",
                                adultNum: 2,
                                childrenNum: 0,
                                villa: siargaoVip._id,
                                total: 16200, //booked 3 nights siargao vip,
                                status: "Active"
                            });

                    beaReservation.save(function(err) {
                        if (err) throw err;

                        console.log('Bea Reservation successfully saved.');
                    });
                });
            });

    });

        var siargaoDeluxe = new Villa ({
            _id: new mongoose.Types.ObjectId(),
            villatype: 'deluxe',
            price: 8400,
            capacity: 4,
            rooms: 2,
            imagePath: 'img/deluxe.jpg',
            shortDesc: 'Siargao Village represents what Siargao is all about. Having an island life vibe, the atmosphere is lively and full of life. Includes one double sized bed and two single beds in two seperate rooms that can accodomate 4 people.',
            inclusions: ['1 Double and 2 Single Beds', 'Air conditioned', 'Cable/Satellite TV', 'WiFi', 'Netflix',
            'Linen, Towels and Bathrobes', 'Toiletries', '1 Shower Room and 1 Shower over bath',
            'Kitchen', 'Lounge Area'],
            villageTheme: 'siargao',
            village: siargaoVillage._id
        });

        siargaoDeluxe.save(function(err) {
            if (err) throw err;

            console.log('Siargao Deluxe successfully saved.');

        });

        var siargaoSuite = new Villa ({
            _id: new mongoose.Types.ObjectId(),
            villatype: 'suite',
            price: 11400,
            capacity: 6,
            rooms: 3,
            imagePath: 'img/suite.jpg',
            shortDesc: 'Siargao Village represents what Siargao is all about. Having an island life vibe, the atmosphere is lively and full of life. Includes one double sized bed and four single beds. This suite has three bedrooms with three shower rooms and it can accomodate up to 6 people.',
            inclusions: ['1 Double and 4 Single Beds', 'Air conditioned', 'Cable/Satellite TV', 'WiFi', 'Netflix',
            'Linen, Towels and Bathrobes', 'Toiletries', '3 Shower Rooms',
            'Kitchen', 'Lounge Area', 'Minibar'],
            villageTheme: 'siargao',
            village: siargaoVillage._id
        });

        siargaoSuite.save(function(err) {
            if (err) throw err;

            console.log('Siargao Suite successfully saved.');
        });

        var siargaoPremier = new Villa ({
            _id: new mongoose.Types.ObjectId(),
            villatype: 'premier',
            price: 15400,
            capacity: 8,
            rooms: 4,
            imagePath: 'img/premier.jpg',
            shortDesc: 'Siargao Village represents what Siargao is all about. Having an island life vibe, the atmosphere is lively and full of life. Includes one king sized bed, one double sized bed and four single beds split among four spacious rooms. This Premier villa can accomodate up to 8 people and has 4 shower rooms.',
            inclusions: ['1 King, 1 Double, 4 Single Beds', 'Air conditioned', 'Cable/Satellite TV', 'WiFi', 'Netflix',
            'Linen, Towels and Bathrobes', 'Toiletries', '3 Shower Rooms 1 Shower over bath',
            'Kitchen', 'Lounge Area', 'Minibar', 'Private garden'],
            villageTheme: 'siargao',
            village: siargaoVillage._id
        });

        siargaoPremier.save(function(err) {
            if (err) throw err;

            console.log('Siargao Premier successfully saved.');
            
            // saving isabelle
            bcrypt.hash("pups4life", saltRounds, (err, hashed) => {
                var isabelleAccount = new Account ({
                    _id: new mongoose.Types.ObjectId(),
                    name: "Isabelle Santos",
                    username: "sabsantos",
                    email: "sabsantos@gmail.com",
                    password: hashed,
                    isAdmin: "false",
                    imagePath: 'img/girl.png'
                });

                isabelleAccount.save(function(err) {
                    if (err) throw err;
                    console.log('isabelle Account successfully saved.');
                    
                    //seeding reservations in account
                    var isabelleReservation = new Reservation ({
                                _id: new mongoose.Types.ObjectId(),
                                account: isabelleAccount._id,
                                checkIn: "2020-05-12",
                                checkOut: "2020-05-14",
                                adultNum: 5,
                                childrenNum: 3,
                                villa: siargaoPremier._id, //variable
                                total: 30800, //booked 2 nights siargao premier,
                                status: "Active"
                    });
    
                    isabelleReservation.save(function(err) {
                        if (err) throw err;
    
                        console.log('isabelle Reservation successfully saved.');
                    });
                });
            });

        });


    });

    //seeding villas in toscana village
    toscanaVillage.save(function(err) {
        if (err) throw err;
        console.log('Toscana Village successfully saved.');

        var toscanaVip = new Villa ({
            _id: new mongoose.Types.ObjectId(),
            villatype: 'vip',
            price: 6400,
            capacity: 2,
            rooms: 1,
            imagePath: 'img/tuscany4.jpg',
            shortDesc: 'Toscana villas have a rustic, yet elegant design exbiting intricate patterns having contrasting tones. Includes a king sized bed that can accomodate 2 people in one bedroom.',
            inclusions: ['1 King Bed', 'Air conditioned', 'Cable/Satellite TV', 'WiFi', 'Netflix',
                        'Linen, Towels and Bathrobes', 'Toiletries', '1 Shower Room'],
            villageTheme: 'toscana',
            village: toscanaVillage._id
        });

        toscanaVip.save(function(err) {
            if (err) throw err;

            console.log('toscana VIP successfully saved.');

            // saving katherine
            bcrypt.hash("kathyyy", saltRounds, (err, hashed) => {
                var kathrineAccount = new Account ({
                    _id: new mongoose.Types.ObjectId(),
                    name: "Kathrine Go",
                    username: "kathgo",
                    email: "kathgo@gmail.com",
                    password: hashed,
                    isAdmin: "false",
                    imagePath: 'img/girl.png'
                });
  
                kathrineAccount.save(function(err) {
                    if (err) throw err;
                    console.log('Kath Account successfully saved.');

                    //seeding reservations in account
                    var kathrineReservation = new Reservation ({
                                _id: new mongoose.Types.ObjectId(),
                                account: kathrineAccount._id,
                                checkIn: "2020-04-23",
                                checkOut: "2020-04-28",
                                adultNum: 2,
                                childrenNum: 0,
                                villa: toscanaVip._id,
                                total: 32000, //booked 5 nights toscana vip,
                                status: "Active"
                        });

                    kathrineReservation.save(function(err) {
                        if (err) throw err;

                        console.log('Kath Reservation successfully saved.');
                    });
                });
            });

        });

        var toscanaDeluxe = new Villa ({
            _id: new mongoose.Types.ObjectId(),
            villatype: 'deluxe',
            price: 9400,
            capacity: 4,
            rooms: 2,
            imagePath: 'img/toscanaDeluxe.jpg',
            shortDesc: 'Toscana villas have a rustic, yet elegant design exbiting intricate patterns having contrasting tones. Includes one double sized bed and two single beds that can accodomate 4 people.',
            inclusions: ['1 Double and 2 Single Beds', 'Air conditioned', 'Cable/Satellite TV', 'WiFi', 'Netflix',
            'Linen, Towels and Bathrobes', 'Toiletries', '1 Shower Room and 1 Shower over bath',
            'Kitchen', 'Lounge Area'],
            villageTheme: 'toscana',
            village: toscanaVillage._id
        });

        toscanaDeluxe.save(function(err) {
            if (err) throw err;

            console.log('toscana Deluxe successfully saved.');

            // saving juana
            bcrypt.hash("guest", saltRounds, (err, hashed) => {
                var juanaAccount = new Account ({
                    _id: new mongoose.Types.ObjectId(),
                    name: "Juana Dela Cruz",
                    username: "guest",
                    email: "juanadc@gmail.com",
                    password: hashed,
                    isAdmin: "false",
                    imagePath: 'img/girl.png'
                });

                //seeding reservations in account
                juanaAccount.save(function(err) {
                    if (err) throw err;

                    console.log('Juana Account (guest) successfully saved.');

                    //seeding reservations in account
                   var juanaReservation = new Reservation ({
                    _id: new mongoose.Types.ObjectId(),
                    account: juanaAccount._id,
                    checkIn: "2020-04-18",
                    checkOut: "2020-04-20",
                    adultNum: 2,
                    childrenNum: 2,
                    villa: toscanaDeluxe._id,
                    total: 18800, //booked 3 nights toscana suite,
                    status: "Active"
                    });

                    juanaReservation.save(function(err) {
                        if (err) throw err;

                        console.log('Juana Reservation successfully saved.');
                    });
                });
            });
        });

        var toscanaSuite = new Villa ({
            _id: new mongoose.Types.ObjectId(),
            villatype: 'suite',
            price: 12400,
            capacity: 6,
            rooms: 3,
            imagePath: 'img/toscanaSuite.jpg',
            shortDesc: 'Toscana villas have a rustic, yet elegant design exbiting intricate patterns having contrasting tones. Includes a kitchen, a lounge area and a minibar. This suite has three bedrooms with three shower rooms and it can accomodate up to 6 people.',
            inclusions: ['1 Double and 4 Single Beds', 'Air conditioned', 'Cable/Satellite TV', 'WiFi', 'Netflix',
            'Linen, Towels and Bathrobes', 'Toiletries', '3 Shower Rooms',
            'Kitchen', 'Lounge Area', 'Minibar'],
            villageTheme: 'toscana',
            village: toscanaVillage._id
        });

        toscanaSuite.save(function(err) {
            if (err) throw err;

            console.log('toscana Suite successfully saved.');
                    
            // saving joshua
            bcrypt.hash("654321", saltRounds, (err, hashed) => {
                var joshuaAccount = new Account ({
                    _id: new mongoose.Types.ObjectId(),
                    name: "Joshua Dela Cruz",
                    username: "joshdelacruz",
                    email: "joshdelacruz@gmail.com",
                    password: hashed,
                    isAdmin: "false",
                    imagePath: 'img/boy.png'
                });

                joshuaAccount.save(function(err) {
                    if (err) throw err;
                    console.log('joshua Account successfully saved.');
                    
                    //seeding reservations in account
                   var joshuaReservation = new Reservation ({
                            _id: new mongoose.Types.ObjectId(),
                            account: joshuaAccount._id,
                            checkIn: "2020-05-01",
                            checkOut: "2020-05-04",
                            adultNum: 5,
                            childrenNum: 1,
                            villa: toscanaSuite._id,
                            total: 49200, //booked 3 nights toscana suite,
                            status: "Active"
                    });
    
                    joshuaReservation.save(function(err) {
                        if (err) throw err;
    
                        console.log('joshua Reservation successfully saved.');
                   });
                });
            });

        });

        var toscanaPremier = new Villa ({
            _id: new mongoose.Types.ObjectId(),
            villatype: 'premier',
            price: 16400,
            capacity: 8,
            rooms: 4,
            imagePath: 'img/toscanaPremier.jpg',
            shortDesc: 'Toscana villas have a rustic, yet elegant design exbiting intricate patterns having contrasting tones. Includes four spacious rooms with a private garden. This Premier villa can accomodate up to 8 people.',
            inclusions: ['1 King, 1 Double, 4 Single Beds', 'Air conditioned', 'Cable/Satellite TV', 'WiFi', 'Netflix',
            'Linen, Towels and Bathrobes', 'Toiletries', '3 Shower Rooms 1 Shower over bath',
            'Kitchen', 'Lounge Area', 'Minibar', 'Private garden'],
            villageTheme: 'toscana',
            village: toscanaVillage._id
        });

        toscanaPremier.save(function(err) {
            if (err) throw err;

            console.log('toscana Premier successfully saved.');
        });


    });


    //seeding villas in mykonos village
    mykonosVillage.save(function(err) {
        if (err) throw err;
        console.log('mykonos Village successfully saved.');

        var mykonosVip = new Villa ({
            _id: new mongoose.Types.ObjectId(),
            villatype: 'vip',
            price: 7400,
            capacity: 2,
            rooms: 1,
            imagePath: 'img/mykonos3.jpg',
            shortDesc: 'Mykonos Village has a neat and clean arhitecture drawing inspiration from the worldwide famous island in Greece. Includes a shower room and a king sized bed that can accomodate 2 people in one bedroom.',
            inclusions: ['1 King Bed', 'Air conditioned', 'Cable/Satellite TV', 'WiFi', 'Netflix',
                        'Linen, Towels and Bathrobes', 'Toiletries', '1 Shower Room'],
            villageTheme: 'mykonos',
            village: mykonosVillage._id
        });

        mykonosVip.save(function(err) {
            if (err) throw err;

            console.log('mykonos VIP successfully saved.');
        });

        var mykonosDeluxe = new Villa ({
            _id: new mongoose.Types.ObjectId(),
            villatype: 'deluxe',
            price: 10400,
            capacity: 4,
            rooms: 2,
            imagePath: 'img/mykonosDeluxe.jpeg',
            shortDesc: 'Mykonos Village has a neat and clean arhitecture drawing inspiration from the worldwide famous island in Greece. Includes one double sized bed and two single beds that can accodomate 4 people. There is also a kitchen and a lounge area',
            inclusions: ['1 Double and 2 Single Beds', 'Air conditioned', 'Cable/Satellite TV', 'WiFi', 'Netflix',
            'Linen, Towels and Bathrobes', 'Toiletries', '1 Shower Room and 1 Shower over bath',
            'Kitchen', 'Lounge Area'],
            villageTheme: 'mykonos',
            village: mykonosVillage._id
        });

        mykonosDeluxe.save(function(err) {
            if (err) throw err;

            console.log('mykonos Deluxe successfully saved.');

             // saving angel
            bcrypt.hash("angeltan123", saltRounds, (err, hashed) => {
                var angelAccount = new Account ({
                    _id: new mongoose.Types.ObjectId(),
                    name: "Angelica Tan",
                    username: "angeltan",
                    email: "angeltan@gmail.com",
                    password: hashed,
                    isAdmin: "false",
                    imagePath: 'img/girl.png'
                });

                angelAccount.save(function(err) {
                    if (err) throw err;
                    console.log('angel Account successfully saved.');
                    
                    // seeding reservations in account
                   var angelReservation = new Reservation ({
                            _id: new mongoose.Types.ObjectId(),
                            account: angelAccount._id,
                            checkIn: "2020-05-05",
                            checkOut: "2020-05-07",
                            adultNum: 4,
                            childrenNum: 0,
                            villa:  mykonosDeluxe._id,
                            total: 20800, //booked 2 nights mykonos deluxe,
                            status: "Active"
                    });
    
                    angelReservation.save(function(err) {
                        if (err) throw err;
    
                        console.log('angel Reservation successfully saved.');
                     });
                });
            });

        });

        var mykonosSuite = new Villa ({
            _id: new mongoose.Types.ObjectId(),
            villatype: 'suite',
            price: 13400,
            capacity: 6,
            rooms: 3,
            imagePath: 'img/mykonosSuite.jpg',
            shortDesc: 'Mykonos Village has a neat and clean arhitecture drawing inspiration from the worldwide famous island in Greece. This suite includes a minibar and has three bedrooms with three shower rooms and it can accomodate up to 6 people.',
            inclusions: ['1 Double and 4 Single Beds', 'Air conditioned', 'Cable/Satellite TV', 'WiFi', 'Netflix',
            'Linen, Towels and Bathrobes', 'Toiletries', '3 Shower Rooms',
            'Kitchen', 'Lounge Area', 'Minibar'],
            villageTheme: 'mykonos',
            village: mykonosVillage._id
        });

        mykonosSuite.save(function(err) {
            if (err) throw err;

            console.log('mykonos Suite successfully saved.');

            // saving michael
            bcrypt.hash("password", saltRounds, (err, hashed) => {
                var michaelAccount = new Account ({
                    _id: new mongoose.Types.ObjectId(),
                    name: "Michael Cruz",
                    username: "michcruz",
                    email: "michcruz@gmail.com",
                    password: hashed,
                    isAdmin: "false",
                    imagePath: 'img/boy.png'
                });

                //seeding reservations in account
                michaelAccount.save(function(err) {
                    if (err) throw err;
                    console.log('michael Account successfully saved.');

                    var michaelReservation = new Reservation ({
                                _id: new mongoose.Types.ObjectId(),
                                account: michaelAccount._id,
                                checkIn: "2020-04-24",
                                checkOut: "2020-04-29",
                                adultNum: 2,
                                childrenNum: 0,
                                villa: mykonosSuite._id,
                                total: 67000, //booked 5 nights mykonos suite,
                                status: "Active"
                        });

                        michaelReservation.save(function(err) {
                        if (err) throw err;

                        console.log('michael Reservation successfully saved.');
                        });
                });
            });

        });

        var mykonosPremier = new Villa ({
            _id: new mongoose.Types.ObjectId(),
            villatype: 'premier',
            price: 17400,
            capacity: 8,
            rooms: 4,
            imagePath: 'img/mykonos2.jpg',
            shortDesc: 'Mykonos Village has a neat and clean arhitecture drawing inspiration from the worldwide famous island in Greece. Includes four spacious rooms, three Shower Rooms, one Shower over bath and a private garden. This Premier villa can accomodate up to 8 people.',
            inclusions: ['1 King, 1 Double, 4 Single Beds', 'Air conditioned', 'Cable/Satellite TV', 'WiFi', 'Netflix',
            'Linen, Towels and Bathrobes', 'Toiletries', '3 Shower Rooms 1 Shower over bath',
            'Kitchen', 'Lounge Area', 'Minibar', 'Private garden'],
            villageTheme: 'mykonos',
            village: mykonosVillage._id
        });

        mykonosPremier.save(function(err) {
            if (err) throw err;

            console.log('mykonos Premier successfully saved.');
        });


    });


});
