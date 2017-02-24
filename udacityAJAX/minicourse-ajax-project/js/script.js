function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;
    var googleStreetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?';

    var streetviewUrl = googleStreetViewUrl + 'size=600x400&location=' + 
        address;

    //NY Times
    var nyTimesApiKey = '58dc888185a44d5fa3bff6a8c56f6fe4';
    var nyTimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    var nyTimesApiUrl = nyTimesUrl + '?q=' + city + '&sort=newest&api-key=' + nyTimesApiKey;

    $.getJSON(nyTimesApiUrl) //returns a promise
    .done(function(data){
        var items = []
        $.each(data.response.docs, function (key, val){
            items.push("<li class='article' id='" + key + "'>" + val.snippet + "</li>")
        })
        $nytElem.append(items);
        console.log('Success');
    })
    .fail(function(){
        console.log('Error');
        $nytElem.append("<li class='article'>Sorry, there has been an error</li>");
    });

    //Wikepedia
    var wikepediaEndpoint = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';
    var wikipediaApiUrl = wikepediaEndpoint + city + '&imlimit=5&format=json';
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 3000);

    $.ajax({
        url: wikipediaApiUrl,
        dataType: 'jsonp', //setting this lets us get around single origin rule
        crossDomain: true
    })
    .done(function(data){ 
        $greeting.text('So you want to live at ' + street + ', ' + data[0] + '?');
        var items = {};
        var lines = [];
        $.each(data[1], function(key, val){
            items[key] = [val]
        })
        $.each(data[3], function(key, val){
            items[key].push(val);
        })
        console.log(items);
        for (var key in items){
            if(items.hasOwnProperty(key)){
                var line = "<a href='" + items[key][1] + "'><li class='article' id=article" + key + "'>" + items[key][0] + "</li></a>";
                lines.push(line);
            }
        }
        $wikiElem.append(lines);
        clearTimeout(wikiRequestTimeout);
    });


    // YOUR CODE GOES HERE!
    $body.append("<img class='bgimg' src='" + streetviewUrl + "'>");
    return false;
};

$('#form-container').submit(loadData);