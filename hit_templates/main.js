var input_size = 0;
var idx = 0;
$(function() {
    // Default input to be used during testing + development.
    var DEFAULT_INPUT = ['Karen was assigned a roommate her first year of college. Her roommate asked her to go to a nearby city for a concert. Karen agreed happily. The show was absolutely exhilarating', 'Karen became good friends with her roommate.','Karen hated her roommate.'];

    var input = null;
    var descriptions = [];
    var endings = []
    var enabled = false;
    
    function randOrd(){ return (Math.round(Math.random())-0.5); }
    function shuffle_endings(a) {
      b = [a[1],a[2]]
      b.sort(randOrd);
      a[1] = b[0];
      a[2] = b[1];
    }

    function main() {
        // Read input to the HIT. In development the default input will be
        // used, and in deployment actual input will be used.
        input = amt.getInput(DEFAULT_INPUT);
        input_size = input.length;
        shuffle_endings(input);

        if (!amt.isPreview()) {
            enable_hit();
        }
        render();
    }

    // Use the current index to update the image and description
    function render() {
        // Set up the story
        $('#story').val('');
        $('#story').val(input[0]);
        $('#story-ending').val('');
        $('#story-ending').val(input[1]);
        $('#story-ending2').val('');
        $('#story-ending2').val(input[2]);

        // Set up the text area
        $('#text-area').val(descriptions[idx]);
    }

    function enable_hit() {
        // Enable the UI.
        enabled = true;

        $('#text-area').prop('disabled', false);

        // submit turk and get HIT id
        amt.setupSubmit();

        // Set up a click handler for the submit button.
        $('#submit-btn').click(function() {
            // Construct an object containing the output.
            // Output consists of set of tuples (string story, string selection)
            $('#text-area').val(descriptions[idx]);
            var comments = $('#comment-area').val();

            predicates = window.app.getFinalState();
            var output = _.map(_.zip(input, descriptions, predicates), function(x) {
                return {'story': x[0], 'description': x[1], 'predicates':x[2], 'comments':comments};
            });
            
            // validate output
            /*if (output[0]['predicates'].length < 2) {
              alert('Please construct and link at least 2 inference rules...');
              return(1);
            }*/
         
            var predicates = output[0]['predicates'];
            console.log(predicates);
            var csvOutput=[{}];
            csvOutput[0]['comments'] = output[0]['comments'];
            for(var i=0; i< predicates.length; i++) {
              console.log(predicates[i]);
              csvOutput.push({});
              csvOutput[i]['predicate'] = i;
              for(var j=0; j < predicates[i][0].length;j++) { // actions
                csvOutput[i]['action'+j] = predicates[i][0][j];
              }
              for(var k=0; k < predicates[i][1].length;k++) { // operations
                csvOutput[i]['operator'+k] = predicates[i][1][k];
              }
              csvOutput[i]['consequence'] = predicates[i][2];

              for(var l in predicates[i][3]) { // lth action that contains grounded word in predicate
                for(var m in l) { // mth grounded word in action
                  if (predicates[i][3][l].hasOwnProperty(m)) {
                    if(predicates[i][3][l][m] !="") {
                      csvOutput[i]['groundedTokenIndex'+l+"-"+m] = predicates[i][3][l][m][0];
                    }
                  }
                }
              }
            }
            amt.setOutput(csvOutput);
        });
    }
    
    main();
});