var ActionComponent = React.createClass({
  getInitialState: function() {
    return { op: this.props.opdefaultValue, act: this.props.adefaultValue, customValue: false }
  },
  getAction: function() {
    if(this.state.customValue == true){
      return(this.refs.action.value); 
    } else {
      return(this.state.act);
    }
  },

  getOp: function() {
    if(this.state.op == '' || this.state.op == null) {return("&&");}
    return(this.state.op);
  },

  linkAction: function() {
    return;
  },

  opChangeHandler: function(event){
    this.setState({op: event.target.value});
  },

  onBlurHandler: function(event) {
    if(event.target.value == '') {
      this.setState({customValue: false});
    }
  },

  actChangeHandler: function(event){
    if(event.target.value == 'customOption') {
      this.setState({customValue: true});
    } else {
      this.setState({act: event.target.value});
    }
  },

  render: function() {
    //console.log(this.props.consList);
    var btnStyle = { marginLeft: 5, marginRight:0 }; //prop todo 
    var wrapStyle = { display: 'inline-block' };
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
    if(this.props.index == this.props.numActions-1) {
      var selectStyle = { display: 'none' };
    } else {
      selectStyle = {};
    }

    if(this.props.edit == true) {
      if (this.state.customValue == true) {
        return( // still need to add functions/variables in order & link to context
          <div style = {wrapStyle}>
            <textarea ref='action' rows="1" maxLength="50" placeholder="action" defaultValue={this.props.adefaultValue} style={divStyle} onBlur={this.onBlurHandler}></textarea>
            <select ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
              <option value="&&">&amp;&amp;</option>
              <option value="||">||</option>
            </select>
          </div>
        );
      } else {
        return (
          <div style={wrapStyle}>
            <select ref='action' style={divStyle} onChange={this.actChangeHandler}>
              <option value={this.props.adefaultValue}>{this.props.adefaultValue}</option>
              <option value="context">*context*</option>
              <option value="customOption">[custom variable]</option>
              {
                this.props.consList.map(function(consequence) {
                  return(<option key={consequence}
                    value={consequence}>{consequence}</option>);
                })
              }
            </select>

            <select ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
              <option value="&&">&amp;&amp;</option>
              <option value="||">||</option>
            </select>
          </div>
        );
      }
    } else {
      return(
        <div style = {wrapStyle}>
        <div className="actionText" style={divStyle}>{this.props.adefaultValue}</div>
        <b style={selectStyle}>{this.props.opdefaultValue}</b>
        </div>
      );
    }
  }
});

var PredicateComponent = React.createClass({
  getInitialState: function() {
    return { editing: false, actions: [], ops:[] }
  },

  edit: function() {
    this.setState({editing: true});
  },

  remove: function() {
    if (this.props.numPreds > 1) {
      console.log('removing predicate');
      this.props.removePredicate(this.props.index);
    } else {
      return false;
    }
  },

  save: function() {
    console.log("saving predicate");
    var actions = [];
    var ops = [];
    for(var ref in this.refs) {
      if(ref.includes('action')) {
        actions.push(this.refs[ref].getAction());
        ops.push(this.refs[ref].getOp());
      }
    }
    var consequence = this.refs.consequence.value.trim();
    for (var i=0;i<actions.length;i++) {
      console.log('action: ' +actions[i]);
      if(actions[i] == "" || consequence == "") {
        alert("Can't save empty variable");
        return false;  
      }
    }
    this.props.updatePredicate(actions, ops, consequence,this.props.index);
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
    if(this.props.cons == null || this.props.cons == ''){alert("Please complete elements of this rule."); return(false);}
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
        {'rule ' + (this.props.index+1) + ':'}
        <div className='action-container' style={divStyle}>        
        {
          this.props.act.map(function(action, i) { 
            return (
              <ActionComponent 
                 key={i}
                 index={i}
                 numActions={this.props.act.length}
                 adefaultValue={action}
                 opdefaultValue={this.props.op[i]}
                 edit={this.state.editing}
                 ref={'action'+i}>
              </ActionComponent>
            );
          }, this)
        }
        </div>
        <b>==&gt;</b>
        <div ref='consequenceText' className='consequenceText' style={divStyle}>{this.props.cons}</div>
          <button onClick={this.edit} className='btn btn-xs edit-predicate-btn' style={divStyle}>(~)Edit Rule</button>
          <button onClick={this.remove} className='btn btn-xs remove-predicate-btn' style={divStyle}>(&#8211;)Remove Rule</button>
          <button ref='addBtn' onClick={this.add} className='btn btn-xs add-predicate-btn' style={btnStyle}>(+)Add Rule</button>
      </div> 
    );
  },

  renderForm: function() {
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
    var inlineBlock = { display: 'inline-block', marginLeft:10 };
    var btnStyle = { marginLeft: 5, marginRight:-10 };
    return (
      <div className='predicate'>
        {'rule ' + this.props.index+1 + ':'}
        <button onClick={this.addVariable} className='btn btn-xs add-variable-btn' style={btnStyle}>(+)Add Variable</button>
        <div className='action-container' style={inlineBlock}>
        {
          this.props.act.map(function(action, i) {
            return (
              <ActionComponent 
                 key={i}
                 index={i}
                 consList={this.props.consList}
                 numActions={this.props.act.length}
                 adefaultValue={action}
                 opdefaultValue={this.props.op[i]}
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
        <button onClick={this.save} className='btn btn-xs save-predicate-btn'>(~)Save Rule</button>
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
          [""],[""],"" // action list, consequence
        ]
      ],
      consList: []
    }
  }, 

  removePredicate: function (i) {
    console.log('removing comment ' + i);
    var predicates = this.state.predicates;
    predicates.splice(i, 1);
    this.setState({predicates: predicates});
  },

  updatePredicate: function(actions,ops,consequence,i) { // predicate is a tuple of array of variables and an implication jth action, ith consequence
    console.log('updating comment ' + i);
    var predicates = this.state.predicates;
    var consequences = this.state.consList;
    predicates[i][0] = actions;//new Array(actions);
    predicates[i][1] = ops;
    predicates[i][2] = consequence;
    consequences[i] = consequence;
    this.setState({predicates: predicates});
    this.setState({consList: consequences});
    globalState[this.props.index] = this.state.predicates;
  },

  addPredicate: function() {
    var predicates = this.state.predicates;
    predicates.push([[""],""]);
    this.setState({predicates: predicates});
  },

  addVariable: function(i) {
    console.log('adding variable');
    var predicates = this.state.predicates;
    predicates[i][0].push("");
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
                 numActions={predicate[0].length}
                 act={predicate[0]}
                 op={predicate[1]}
                 cons={predicate[2]}
                 consList={this.state.consList}
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
    return { PredicateManagers, i_x: 0, changeBoards: false}
  },

  render: function() {
    console.log(globalState);
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
window.app = ReactDOM.render(<StoryBoard />, document.getElementById('predicate-containers'));
var globalState = [];
$('#next-btn').click(function() { var i = app.state.i_x;  app.setState({i_x: i + 1}); app.setState({changeBoards: true}) });
$('#prev-btn').click(function() { var i = app.state.i_x;  app.setState({i_x: i - 1}); app.setState({changeBoards: true}) });
