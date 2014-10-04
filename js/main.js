Parse.initialize("znb8zXizkj3pOq0mfmG691tnN9HVIibaEXprXZlG", "ZgMZzfYVaWzIT4VuI2TRpMEXoZ4y9FM8dghX6tDJ");

var MenuDay = Parse.Object.extend('MenuDay');

var Entree = Parse.Object.extend('Entree');
var Side = Parse.Object.extend('Side');
var Veggie = Parse.Object.extend('Veggie');

var menuData = [{"entree": "", "veggie": "", "month": "10", "year": "2014", "date": "1", "side": ""}, {"entree": "", "veggie": "", "month": "10", "year": "2014", "date": "2", "side": ""}, {"entree": "Mozzarella Sticks w Marinara Sauce", "veggie": " Zucchini Coins", "month": "10", "year": "2014", "date": "3", "side": "Toasty Bread Stick"}, {"entree": "BBQ Pulled Turkey on a soft Roll", "veggie": "Black Bean Salsa", "month": "10", "year": "2014", "date": "4", "side": ""}, {"entree": "Philly Cheese Steak Sandwich", "veggie": "Wedge Cut Fries", "month": "10", "year": "2014", "date": "5", "side": "Cookie Treat"}, {"entree": "Creamy Ranch Grilled Chicken Sandwich", "veggie": "Sweet Potato Wedges", "month": "10", "year": "2014", "date": "6", "side": "Baked! Tostitos Scoops"}, {"entree": "Bagel Pizza w Grilled Chicken Topping", "veggie": "Green Garden Salad", "month": "10", "year": "2014", "date": "7", "side": ""}, {"entree": "", "veggie": "", "month": "10", "year": "2014", "date": "8", "side": ""}, {"entree": "", "veggie": "", "month": "10", "year": "2014", "date": "9", "side": ""}, {"entree": "Chicken Tenders Ranch Dipper ", "veggie": "Celery Sticks Crunchy Carrots", "month": "10", "year": "2014", "date": "10", "side": ""}, {"entree": "Cheese Burger Deluxe Toppings ", "veggie": "Baked French Fries", "month": "10", "year": "2014", "date": "11", "side": ""}, {"entree": "Cheese Ravioli w Marinara Sauce", "veggie": "Broccoli Trees", "month": "10", "year": "2014", "date": "12", "side": "Toasty Bread Stick"}, {"entree": "Roasted Chicken Manager's Choice Sauce served w Rice", "veggie": "Sweet Plantains Souper Beans", "month": "10", "year": "2014", "date": "13", "side": "Wild Cherry Fruit Juice Ice"}, {"entree": "Pizza Slice French Bread Pizza Garden Fresh Topping", "veggie": "Kid Friendly Kale Salad", "month": "10", "year": "2014", "date": "14", "side": ""}, {"entree": "", "veggie": "", "month": "10", "year": "2014", "date": "15", "side": ""}, {"entree": "", "veggie": "", "month": "10", "year": "2014", "date": "16", "side": ""}, {"entree": "Tuscan Crispy Chicken Sandwich w Creamy Garlic Sauce", "veggie": "Green Beans", "month": "10", "year": "2014", "date": "17", "side": "Strawberry Fruit Cup"}, {"entree": "Sloppy Joe Sandwich", "veggie": "Sweet Potato Wedges", "month": "10", "year": "2014", "date": "18", "side": ""}, {"entree": "Mozzarella Sticks ", "veggie": "Super Hero Spinach", "month": "10", "year": "2014", "date": "19", "side": ""}, {"entree": "Sliced Turkey", "veggie": "Orange Roasted Carrots Mashed Potatoes", "month": "10", "year": "2014", "date": "20", "side": "Warm Fruit Turnover"}, {"entree": "Pizza Slice Bagel Pizza Bacon or Sausage Topping", "veggie": "Green Garden Salad Chickpea Salad", "month": "10", "year": "2014", "date": "21", "side": ""}, {"entree": "", "veggie": "", "month": "10", "year": "2014", "date": "22", "side": ""}, {"entree": "", "veggie": "", "month": "10", "year": "2014", "date": "23", "side": ""}, {"entree": "Chicken Tenders BBQ Dipper ", "veggie": "Crunchy Carrots", "month": "10", "year": "2014", "date": "24", "side": ""}, {"entree": "Pizza Burger Falafel Wrap", "veggie": "Baked French Fries", "month": "10", "year": "2014", "date": "25", "side": ""}, {"entree": "Kung Pao Chicken w Steamed Rice", "veggie": "Crispy Egg Roll w Duck Sauce", "month": "10", "year": "2014", "date": "26", "side": "Chocolate Grahams"}, {"entree": "Grilled Chicken Sandwich", "veggie": "Sofrito Beans", "month": "10", "year": "2014", "date": "27", "side": ""}, {"entree": "Pizza Slice", "veggie": "Green Garden Salad", "month": "10", "year": "2014", "date": "28", "side": ""}];

var entrees = {};
var sides = {};
var veggies = {};

function getQueryPromise(t, value) {
    console.log('value', t, value);
    var query = new Parse.Query(t);
    query.equalTo('menutext', value);
    return query.find();
}

for (var i = 0; i < menuData.length; i++) {

    var mdo = new MenuDay();

    var md = menuData[i];

    mdo.set('month', md['month']);
    mdo.set('date', md['date']);
    mdo.set('year', md['year']);


    (function(md, mdo) {

        var promise = mdo.save();
        promise.then(function(mdo) {

            var entp = getQueryPromise('Entree', md['entree']);
            var sidep = getQueryPromise('Side', md['side']);
            var veggiep = getQueryPromise('Veggie', md['veggie']);

            var promise = Parse.Promise.when([entp, sidep, veggiep]);

            promise.then(function(eRes, sRes, vRes) { 

                if (eRes.length) {
                    mdo.set('entree', eRes[0]);
                }

                if (sRes.length) {
                    mdo.set('side', sRes[0]);
                }

                if (vRes.length) {
                    mdo.set('veggie', vRes[0]);
                }

                mdo.save();

                console.log('all finished', arguments)
            })

        })

    })(md, mdo)


}
