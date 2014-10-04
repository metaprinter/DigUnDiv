
(function() {

    Parse.initialize("znb8zXizkj3pOq0mfmG691tnN9HVIibaEXprXZlG", "ZgMZzfYVaWzIT4VuI2TRpMEXoZ4y9FM8dghX6tDJ");

    var MenuDay = Parse.Object.extend('MenuDay');
    var Entree = Parse.Object.extend('Entree');
    var Veggie = Parse.Object.extend('Veggie');
    var Side = Parse.Object.extend('Side');

    var Classes = {
        MenuDay: MenuDay,
        Entree: Entree,
        Veggie: Veggie,
        Side: Side
    }

    var dayItemTpl = $('#day-menu-tpl').html();

    var getToday = function() {
        return new Date(2014, 10, 14);
    }

    var getQuery = function(item) {
        var query = new Parse.Query(Classes[item.className]);
        query.equalTo('objectId', item.id);
        return query.find();
    }

    var getRelations = function(item) {
        var promises = [];

        var e = item.get('entree');
        if (e) {
            promises.push(getQuery(e))
        }

        var s = item.get('side');
        if (s) {
            promises.push(getQuery(s))
        }

        var v = item.get('veggie');
        if (v) {
            promises.push(getQuery(v))
        }

        return promises;

    }

    var displayItem = function() {
        var args = [].slice.call(arguments);
        var day = args[0];
        var menu = args.slice(1);

        var data = {};
        data.day = day.toJSON();

        for (var i = 0; i < menu.length; i++) {
            data[menu[i][0].className] = menu[i][0].toJSON()
        }

        var html = Mustache.render(dayItemTpl, data)
        console.log('data for menu container', data);
        $('#menu-container').html(html);
    }

    var resolveItem = function(item) {
        var promises = getRelations(item);
        Parse.Promise.when(promises).then(function() {
            displayItem.apply(this, [item].concat([].slice.call(arguments)));
        });
    }

    var displayEmpty = function() {
        console.log('None Found');
    }

    var displayItemOrEmpty = function(results) {
        var item;

        if (results.length) {
            item = results[0];
        }

        if (item) {
            resolveItem(item);
        } else {
            displayEmpty()
        }
    }

    var start = function() {

        var today = getToday();
        var q = new Parse.Query('MenuDay');

        console.log(today.getMonth(), today.getDate(), today.getFullYear());
        q.equalTo('month', "" + today.getMonth());
        q.equalTo('date', "" + today.getDate());
        q.equalTo('year', "" + today.getFullYear());
        q.find().then(displayItemOrEmpty);
        

    }

    start();

})()

