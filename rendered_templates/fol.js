var ActionComponent = React.createClass({
/*  getInitialState: function() {
    return { editing: true }
  },
*/
  getValue: function() {
    return(this.refs.action.value); 
  },

  render: function() {
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
    if(this.props.edit == true) {
      return(<textarea ref='action' rows="1" maxLength="50" placeholder="action" defaultValue={this.props.defaultValue} style={divStyle}></textarea>);
    } else {
      return(<div className="actionText" style={divStyle}>{this.props.defaultValue}</div>);
    }
  }
});

var PredicateComponent = React.createClass({
  getInitialState: function() {
    return { editing: true, actions: [] }
  },

  edit: function() {
    this.setState({editing: true});
  },

  remove: function() {
    if (this.props.index != 0) {
      console.log('removing predicate');
      this.props.removePredicate(this.props.index);
    } else {
      return;
    }
  },

  save: function() {
    console.log("saving predicate");
    var actions = [];
    for(var ref in this.refs) {
      if(ref.includes('action')) {
        actions.push(this.refs[ref].getValue());
      }
    }
    var consequence = this.refs.consequence.value.trim();
    for (var i=0;i<actions.length;i++) {
      console.log('action: ' +actions[i]);
      if(actions[i] == "" || consequence == "") {
        return false;  
      }
    }
    this.props.updatePredicate(actions,consequence,this.props.index);
    this.setState({editing: false});
  },

  addVariable: function() {
    console.log("adding variable"); // insert into action-container  
    var actions = this.state.actions;
    actions.push("");
    this.setState({actions: actions});
    this.props.addVariable(this.props.index);
  },        

  add: function() {
    console.log('adding predicate');
    this.props.addPredicate();
    this.setState({editing: false});
  },

  renderNormal: function() {
    var btnVisibility = "";
    if(this.props.index==this.props.numPreds-1) {
      btnVisibility="inline-block";
    } else {
      btnVisibility="none";
    }
    var divStyle = { display: 'inline-block', margin: 5 };
    var btnStyle = { display: btnVisibility, margin: 5 }; //prop todo 
    return (
      <div className='predicate'>
        <div className='action-container' style={divStyle}>        
        {
          this.props.act.map(function(action, i) { 
            return (
              <ActionComponent 
                 key={i}
                 index={i}
                 defaultValue={action}
                 edit={this.state.editing}
                 ref={'action'+i}>
              </ActionComponent>
            );
          }, this)
        }
        </div>
        <select>
          <option value="==>">==&gt;</option>
        </select>
        <div ref='consequenceText' className='consequenceText' style={divStyle}>{this.props.cons}</div>
          <button onClick={this.edit} className='btn btn-xs edit-predicate-btn' style={divStyle}>~</button>
          <button onClick={this.remove} className='btn btn-xs remove-predicate-btn' style={divStyle}>&#8211;</button>
          <button ref='addBtn' onClick={this.add} className='btn btn-xs add-predicate-btn' style={btnStyle}>+</button>
      </div> 
    );
  },

  renderForm: function() {
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
    var inlineBlock = { display: 'inline-block', marginLeft:10 };
    var btnStyle = { marginLeft: 5, marginRight:-10 }; //prop todo 
    return (
      <div className='predicate'>
        <button onClick={this.addVariable} className='btn btn-xs add-variable-btn' style={btnStyle}>+</button>
        <div className='action-container' style={inlineBlock}>
        {
          this.props.act.map(function(action, i) {
            return (
              <ActionComponent 
                 key={i}
                 index={i}
                 defaultValue={action}
                 edit={this.state.editing}
                 ref={'action'+i}>
              </ActionComponent>
            );
          }, this)
        }
        </div>
        <select>
          <option value="==>">==&gt;</option>
        </select>
        <textarea ref='consequence' rows="1" maxLength="50" placeholder="consequence" defaultValue={this.props.cons} style={divStyle}></textarea>
        <button onClick={this.save} className='btn btn-xs save-predicate-btn'>~</button>
      </div>        
    );
  },

  render: function() {
    if(this.state.editing) {
      return this.renderForm();
    } else {
      return this.renderNormal();
    }
  }
});

var PredicateManager = React.createClass({
  getInitialState: function() { // predicate 1 
    return {
      predicates: [
        [ // predicate
          [""],"" // action list, consequence
        ]
      ]
    }
  }, 

  removePredicate: function (i) {
    console.log('removing comment ' + i);
    var predicates = this.state.predicates;
    predicates.splice(i, 1);
    this.setState({predicates: predicates});
  },
/*
  updatePredicate: function(actions,consequence,i) { // predicate is a tuple of array of variables and an implication
    console.log('updating comment ' + i);
    var predicates = this.state.predicates;
    predicates[i] = new Array(actions, consequence);
    this.setState({predicates: predicates});
  },
*/
  updatePredicate: function(actions,consequence,i) { // predicate is a tuple of array of variables and an implication jth action, ith consequence
    console.log('updating comment ' + i);
    var predicates = this.state.predicates;
    predicates[i][0] = actions;//new Array(actions);
    predicates[i][1] = consequence;
    this.setState({predicates: predicates});
  },

  addPredicate: function() {
    var predicates = this.state.predicates;
    predicates.push([[""],""]);
    this.setState({predicates: predicates});
  },

  addVariable: function(i) {
    console.log('adding variable');
    var predicates = this.state.predicates;
    predicates[i][0].unshift("");
    this.setState({predicates:predicates});
  },

  render: function() {
    if(this.props.index == this.props.i_x) {
      return(
        <div className="predicates">
        {
          this.state.predicates.map(function(predicate, i) {
            return (
              <PredicateComponent 
                 key={i}
                 index={i}
                 numPreds={this.state.predicates.length}
                 act={predicate[0]}
                 cons={predicate[1]}
                 updatePredicate={this.updatePredicate}
                 removePredicate={this.removePredicate}
                 addPredicate={this.addPredicate}
                 addVariable={this.addVariable}>
              </PredicateComponent>
            );
          }, this)
        }
        </div>
      );
    } else {
      return(false);
    }
  }
});

var StoryBoard = React.createClass({
  getInitialState: function() {
    var PredicateManagers = [];
    for(var i=0;i<input_size;i++) {
      PredicateManagers.push(React.createElement(PredicateManager));
    }
    return { PredicateManagers, i_x: 0}
  },

  render: function() {
    return(
      <div className="predicate-container">
      {
        this.state.PredicateManagers.map(function(predicate, i) {
          return (
            <PredicateManager key={i} index={i} i_x = {this.state.i_x}>
            </PredicateManager>
          );
        }, this) 
      }
      </div>
    );
  }
}); // pass idx to each story and render depending if id.
var app = ReactDOM.render(<StoryBoard />, document.getElementById('predicate-containers'));
$('#next-btn').click(function() { var i = app.state.i_x;  app.setState({i_x: i + 1}) });
$('#prev-btn').click(function() { var i = app.state.i_x;  app.setState({i_x: i - 1}) });