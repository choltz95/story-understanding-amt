var PredicateManager = window.PredicateManager;

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
$('#story-container').click(function(e) {
  var selected_text_story = $('#story').selection().trim();
  var selected_text_ending = $('#story-ending').selection().trim();
  var selected_text_ending2 = $('#story-ending2').selection().trim();
  if(selected_text_story != '') {
    app.setState({selectedText: selected_text_story});
  } else {
    if(selected_text_ending == '') {
      app.setState({selectedText: selected_text_ending2});
    } else {
      app.setState({selectedText: selected_text_ending});
    }
  }
});