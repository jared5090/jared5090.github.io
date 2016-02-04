var arrayNames = ['IDs', 'Bets'];
var positions = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
var letters = ["A", "B", "C", "D", "E", "F"];

var raceNames = [
  ['Flip', 'Boxer', 'Alpha', 'Ranger'],
  ["Sammy", "Demon", "Cheetah", "Hot Dawg", "Pilgrim", "K9"],
  ["Demon", "Alpha", "Pilgrim", "Quicksilver", "Chewtobacca"]
  ];
var raceRandomNames = [];
var betRanking = {};
var raceData = {};

var raceTable = $('#current_race_template').html();
var resultsTable = $('#results_template').html();


function printButtons(race) {
  $('#race_buttons').append("<button></button>");
  $('#race_buttons').find('button').last().attr('id', 'button_race' + race);
  $('#button_race' + race).text('Race ' + letters[race]);
  //clicking button for a race triggers creation of its table
  //and sets up other click listeners. 
  $('#button_race' + race).on('click', function(event) {
    event.preventDefault();
    if (!(document.getElementById('race' + race)) ) {
      printTable(race);
      createIDs(race);
      getBets(race);
    }
    displayTable(race);
  });
}

//container_table class has default display of NONE.
//first removes display_inline class to ensure only one table is displayed.
function displayTable(race) {
  $('.container_table').removeClass('display_inline');
  $('#race' + race).closest('.container_table').addClass('display_inline');
  $('#results' + race).closest('.container_table').addClass('display_inline');
}

function printTable(race) {
  var newRow = 
    "<tr>" +
      "<td></td>" +
      "<td>" +
        "<select class='betMenu'></select>" +
      "</td>" +
    "</tr>";
  $('#current_race').append(raceTable);
  //set race ids for table and buttons
  $('#current_race').children('div').last().attr('id', 'race' + race);
  $('#current_race').find('.submit_button').last().attr('id', 'submit_race' + race);
  var raceID = $('#race' + race);
  //print race title
  raceID.find('.table_header').prepend(
    "<div>" +
      "<h3>Race " + letters[race] + "</h3>" +
    "</div>"
    );
  //print table rows. In first column, name is printed from 2D array.
  //In second column, options are appended to a dropdown menu.
  //First option is the default ('select').
  for (var j = 0; j < raceNames[race].length; j++) {
    raceID.find('tr').last().after(newRow);
    raceID.find('tr').last().find('td').first().text(raceNames[race][j]);
    raceID.find('.betMenu').last().attr('val', raceNames[race][j]);
    for (var k = -1; k < raceNames[race].length; k++) {
      raceID.find('.betMenu').last().append("<option></option>");
      if (k !== -1) {
        raceID.find('option').last().attr('val', k);
        raceID.find('option').last().text(positions[k]);
      } else {
        raceID.find('option').last().text('select');
      }
    }
  }
}


function createIDs(race) {
  var selectID = '';
  var selectID2 = 'race';
  var k = 0;

  //create unique ID, store it in array and set it to a dropdown menu.
  for (var j = 0; j < raceNames[race].length; j++) {
    selectID = selectID2.concat(race.toString(), letters[j]);
    raceData['IDs' + [race]].push(selectID);
  }
  k = 0;
  $('#race' + race).find('.betMenu').each( function() {
    $(this).attr("id", raceData['IDs' + [race]][k]);
    k += 1;
  });
}


//Create array with randomised names from raceNames.
//perform loop until RandomNames is same length as Names. 
function randomiseNames(race) {
  var n = 0;
  var containsName = false;
  for (var i = 0; raceRandomNames[race].length < raceNames[race].length; i++) {
    //n = random number between 0 and 3, used to get random index of Names array.
    n = Math.floor(Math.random() * raceNames[race].length);
    //check each index of RandomNames array to see if it already contains same item from Names array.
    for (var j = 0; j < raceRandomNames[race].length; j++) {
      if (raceRandomNames[race][j] === raceNames[race][n]) {
        containsName = true;
        break;
      }
    }
    //if no match found, push name to RandomNames.
    if (containsName === false) {
      raceRandomNames[race].push(raceNames[race][n]);
    }
    containsName = false;
  }
  console.log(raceRandomNames[race]);
}

//create keys in raceData containing empty arrays.
for (var i = 0; i < arrayNames.length; i++) {
  for (var j = 0; j < raceNames.length; j++) {
    raceData[arrayNames[i] + [j]] = [];
  }
}


for (var i = 0; i < raceNames.length; i++) {
  printButtons(i);
  raceRandomNames.push([]);
  raceData['Points' + i] = 0;
}


//testing
  for (var key in raceData) {
    console.log(key);
    console.log(raceData[key]);
  }