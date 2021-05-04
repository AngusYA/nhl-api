
// MDIA-3295 Assignment 3 | Angus Yeh | A01131681

function freshLoad() {
    loadList();
}

function sortTeams() {
    var selectBox = document.querySelector('#select-box');
    var selectedValue = selectBox.value;
    var sortBy = '&sort=' + selectedValue;
    loadList(sortBy);
}

function loadList(sortBy='') {
    $('#spinner').addClass('loading');

    // Use a proxy to access API
    
    $.ajax('https://cors.bridged.cc/https://records.nhl.com/site/api/franchise?include=teams.logos&cayenneExp=lastSeasonId=null' + sortBy)
        .done(function(result) {
            // First remove the container with previous data
            removeContainer();
            // Then add container back and add new data to it
            addToContainer(result['data']);
        })
        .fail(function(xhr,status,error) {
            console.log('error: ' + xhr.status);
        })
        .always(function() {
            $('#spinner').removeClass('loading');
        })
}

var myContainer = document.querySelector('#my-container');

function removeContainer() {
    myContainer.remove();
}

function addToContainer(result) {
    myContainer = document.createElement('div');
    myContainer.classList.add('data-container');

    for(let i = 0; i < result.length; i++) {

        // Create card
        var card = document.createElement('div');
        // Create custom class
        var customClassCard = 'card' + result[i].id;
        // Add classes to card
        card.classList.add('card-container', customClassCard);

        // Create title box and add text and class to it
        var title = document.createElement('div');
        title.innerText = result[i].teamPlaceName + ' ' + result[i].teamCommonName;
        title.classList.add('team-name');

        // Create paragraph and add text to it
        var p = document.createElement('p');
        p.innerText = 'First NHL Season: ' + result[i].firstSeasonId;

        // Creat img and set img source
        var logoImg = document.createElement('img');
        var latestTeamId = result[i].mostRecentTeamId; // used to check which logos array is the latest
        var teamsArr = result[i].teams;
        for(let ii = 0; ii < teamsArr.length; ii++) {
            let logosArr = teamsArr[ii].logos;
            if (logosArr[0].teamId == latestTeamId) {
                // Use the teamId in logos array's first object to check if it matches mostRecentTeamId
                for (let iii = 0; iii < logosArr.length; iii++) {
                    if (logosArr[iii].background == 'light' && logosArr[iii].endSeason == 20202021) {
                        // Select light version of the latest logo
                        logoImg.setAttribute('src', logosArr[iii].secureUrl);
                    }
                }
            }
        }

        // Append img, title box and paragraph to card
        card.appendChild(logoImg);
        card.appendChild(title);
        card.appendChild(p);
        
        // Append card to container
        myContainer.appendChild(card);

        // Add a different color for canucks card
        if (result[i].teamCommonName == 'Canucks') {
            card.classList.add('canucks-card');
        }

        // Append container to outer container
        $('#outer-container').append(myContainer);

        // Reveal overlay box
        $('.' + customClassCard).click(function() {
            removeOverlay();

            // Create overlay box and add class to it
            var overlayBox = document.createElement('div');
            overlayBox.classList.add('overlay-box');

            // Create custom class for close box
            var customClassClose = 'close' + result[i].id;
            // Create close box, add classes and text to it
            var closeBox = document.createElement('div');
            closeBox.classList.add('close-box', customClassClose);
            closeBox.innerText = 'X';

            // Append close box to overlay box and overlay box to container
            $(overlayBox).append(closeBox);
            $('#overlay-box-container').append(overlayBox);

            // Create title box and add text and class to it
            var title = document.createElement('div');
            title.innerText = result[i].teamPlaceName + ' ' + result[i].teamCommonName;
            title.classList.add('team-name');

            // Create paragraph and add text to it
            var p = document.createElement('p');
            p.innerText = 'First NHL Season: ' + result[i].firstSeasonId;

            // Creat img and set img source
            var logoImg = document.createElement('img');
            var latestTeamId = result[i].mostRecentTeamId; // used to check which logos array is the latest
            var teamsArr = result[i].teams;
            for(let ii = 0; ii < teamsArr.length; ii++) {
                let logosArr = teamsArr[ii].logos;
                if (logosArr[0].teamId == latestTeamId) {
                    // Use the teamId in logos array's first object to check if it matches mostRecentTeamId
                    for (let iii = 0; iii < logosArr.length; iii++) {
                        if (logosArr[iii].background == 'light' && logosArr[iii].endSeason == 20202021) {
                            // Select light version of the latest logo
                            logoImg.setAttribute('src', logosArr[iii].secureUrl);
                        }
                    }
                }
            }

            // Append img, title box and paragraph to overlay box
            $(overlayBox).append(logoImg);
            $(overlayBox).append(title);
            $(overlayBox).append(p);

            // Animate overlay box
            $(overlayBox).animate({
                top: '50%',
                opacity: '100'
            });
            $(overlayBox).css('display', 'block');

            // Hide overlay box
            $('.' + customClassClose).click(function() {
                $('.overlay-box').animate({
                    opacity: '0'
                }, function() {
                    $('.overlay-box').css('display', 'none');
                })
            })
        });
    }
}

function removeOverlay() {
    $('.overlay-box').remove();
}