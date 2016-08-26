var input_size = 0;
var idx = 0;
$(function() {
    // Default input to be used during development.
    var DEFAULT_INPUT = ['Karen was assigned a roommate her first year of college. Her roommate asked her to go to a nearby city for a concert. Karen agreed happily. The show was absolutely exhilarating.',
    'Jim got his first credit card in college. He didn\'t have a job so he bought everything on his card. After he graduated he amounted a $10,000 debt. Jim realized that he was foolish to spend so much money.',
    'Gina misplaced her phone at her grandparents. It wasn\'t anywhere in the living room. She realized she was in the car before. She grabbed her dad\'s keys and ran outside. ']; 

    var input = null;
    var descriptions = [];
    var predicates_list = []; // array of phrase mappings
    var predicates = {};
    var enabled = false;

    function main() {
        // Read input to the HIT. In development the default input will be
        // used, and in deployment actual input will be used.
        input = amt.getInput(DEFAULT_INPUT);
        input_size = input.length;

        // Set up the descriptions.
        _.each(input, function() { descriptions.push(''); });

        // If the HIT is not in preview mode, then we need to enable the UI
        // and set up the logic for submitting.
        if (!amt.isPreview()) {
            enable_hit();
        }
        render();
    }

    // Use the current index to update the image and description
    function render() {
        // Set up the story
        $('#story').val('');
        $('#story').val(input[idx]);

        // Set up the text area
        $('#text-area').val(descriptions[idx]);

        // Refresh the counter
        $('.counter-top').text(idx + 1);
        $('.counter-bottom').text(input.length);

        // If the UI is enabled, enable or disable the buttons depending on
        // the index.
        if (enabled) {
            var prev_btn = $('#prev-btn');
            var next_btn = $('#next-btn');
            prev_btn.prop('disabled', true);
            next_btn.prop('disabled', true);
            if (idx > 0) {
                prev_btn.prop('disabled', false);
            }
            if (idx < input.length - 1) next_btn.prop('disabled', false);
        }
    }

    // Update the index, and save the text in the text area.
    function set_idx(new_idx) {
        if (new_idx < 0 || new_idx >= input.length) return;
        idx = new_idx;
        render();
    }

    function enable_hit() {
        // Enable the UI.
        enabled = true;

        $('#text-area').prop('disabled', false);
        // Enable the submit button. You must do this in every HIT.
        $('#submit-btn').prop('disabled', false);
        $('#next-btn').click(function() { set_idx(idx + 1) });
        $('#prev-btn').click(function() { set_idx(idx - 1) });

        // submit turk and get HIT id
        amt.setupSubmit();

        // Set up a click handler for the submit button.
        $('#submit-btn').click(function() {
            // Construct an object containing the output.
            // Output consists of set of tuples (string story, string selection)
            $('#text-area').val(descriptions[idx]);

            // Validate the output
            if (_.any(descriptions, function(d) { return d.length < 10; })) {
                alert('Selections should exceed three words. Correct before submitting.');
                return false;
            } else {
                var output = _.map(_.zip(input, descriptions, mappings), function(x) {
                    return {'story': x[0], 'description': x[1], 'mapping':x[2]};
                });
                amt.setOutput(output);
            }
        });
    }

    /*
       Change handlers
    */
    // Detect text-selection event
    $('#story-container').click(function(e) {
        var selected_text = $('#story').selection().trim();
        if (false) { // ensure first and last words are not cut off.
            alert('Selected text must be a complete phrase (no partial words)');
        } else {
            descriptions[idx] = selected_text;
            $('#text-area').val(selected_text);
        }
    });

    $('.add-predicate-btn').click(function(e) {
        this.style.display = 'none';
        add_predicate();
    });

    function add_predicate() {
        $clone = $('.predicate-template:first').clone(true).show();
        $('#predicate-container').append($clone);
    } 

    main();
});