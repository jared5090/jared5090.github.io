//Purpose: do an index-by-index comparison of Bets array and RandomNames array.
// Add a point if there is a match.
function checkBets(race) {
  for (var i = 0; i < raceNames[race].length; i++) {
    if (raceData['Bets' + race][i] === raceRandomNames[race][i]) {
      raceData['Points' + race] += 1;
    }
  }
}

function displayResults(race) {
  console.log(' ran displayResults');
  var newRow =
    "<tr>" +
      "<td></td>" +
      "<td></td>" +
      "<td></td>" +
    "</tr>";
  $('#results').append(resultsTable);
  $('#results').children('div').last().attr('id', 'results' + race);
  $('#results').find('.reset_button').last().attr('id', 'reset_race' + race);
  var raceID = $('#results' + race);
  raceID.prepend("<h3>Results</h3>");
  //print table rows.
  for (var i = 0; i < raceNames[race].length; i++) {
    raceID.find('tr').last().after(newRow);
    raceID.find('tr').last().find('td').first().append(raceRandomNames[race][i]);
    raceID.find('tr').last().find('td').first().next().append(positions[i]);
    
    //this column (Your Bets) finds and prints the position the user chose
    //for an athlete. E.g. if athlete is 'alpha', the betRanking object
    //is searched for a key with value of alpha.
    for (var j = 0; j < raceRandomNames[race].length; j++) {
      if (betRanking[positions[j]] === raceRandomNames[race][i]) {
        raceID.find('tr').last().find('td').last().append(positions[j]);
        if (positions[j] === positions[i]) {
          raceID.find('tr').last().find('td').first().addClass('highlight');
          raceID.find('tr').last().find('td').first().next().addClass('highlight');
          raceID.find('tr').last().find('td').last().addClass('highlight');
        }
        break;
      }   
    }
  }
  //display results table.
  raceID.addClass('display_table');

  resetBets(race);
}


/*
Purpose: display bar for each race that corresponds to points scored.
*/
// function displayGraph(color) {
//   $('dd#' + 'race' + race).addClass('percentage-' + raceData['Points' + race]);
// }

function resetBets(race) {
  console.log('ran resetBets');
  $('#reset_race' + race).on('click', function(event) {
    event.preventDefault();
    console.log('ran click listener for resetBets');
    $('#reset_race' + race).hide();
    $('#submit_race' + race).show();
    $('#results' + race).remove();
    $('.betMenu').each( function() {
      $(this).find('option').first().html(
        "<option selected>select</option>");
    });
    raceRandomNames[race] = [];
    console.log('raceRandomNames: ' + raceRandomNames);
    raceData['Bets' + race] = [];
    raceData['Points' + race] = 0;

  });
}

