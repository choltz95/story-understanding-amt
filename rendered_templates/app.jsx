var PredicateManager = window.PredicateManager;
var FooterInstructionComponent = window.FooterInstructionComponent;

/*
Gets initial and final state for each story instance
*/
var StoryBoard = React.createClass({
  getInitialState: function() {
    var PredicateManagers = [];
    for(var i=0;i<input_size;i++) {
      PredicateManagers.push(React.createElement(PredicateManager));
    }
    return { PredicateManagers, i_x: 0, changeBoards: false, selectedText: ""}
  },
  
  updateInstructionsOnHighlight: function() {
    ReactDOM.render(<FooterInstructionComponent step={2} substep={1} r={3} />, document.getElementById('footer-instructions'));
  },

  getFinalState: function() {
    var preds = [];
    var contextLinks = [];
    for(var i=0;i<input_size;i++) {
      preds.push(this.refs['manager'+i].state.predicates);
    }
    return(preds);
  },

  render: function() {
    return(
      <div className="predicate-container">
      {
        this.state.PredicateManagers.map(function(predicate, i) {
          return (
            <PredicateManager
            key={i}
            index={i}
            ref={'manager'+i}
            i_x={this.state.i_x}
            selectedText={this.state.selectedText}>
            </PredicateManager>
            );
        }, this)
      }
      </div>
    );
  }
});

/*
Pass information from react frontend to amt.
*/
window.app = ReactDOM.render(<StoryBoard />, document.getElementById('predicate-containers'));
window.globalState = [];
$('#story').click(function(e) {
  var selected_text_story = $('#story').selection().trim();
  var selected_text_ending = $('#story-ending').selection().trim();
  var selected_text_ending2 = $('#story-ending2').selection().trim();
  if(selected_text_story != '') {
    app.setState({selectedText: selected_text_story});
    app.updateInstructionsOnHighlight();
  } else {
    if(selected_text_ending == '') {
      app.setState({selectedText: selected_text_ending2});
      app.updateInstructionsOnHighlight();
    } else {
      app.setState({selectedText: selected_text_ending});
    }
  }
});