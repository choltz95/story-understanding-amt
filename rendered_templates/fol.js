var ConsequenceComponent = React.createClass({
  getInitialState: function() {
    return { linking: false, linkList: [], i:-1 }
  },

  setLink: function() { // i, j, grounding jth word of ith action
    this.setState({linking: true});
    this.setState({linkList: this.props.cons.trim().split(" ")});
    $('#story').removeClass('noselect');
  },
  
  link: function(i) {
    var word = this.state.linkList[i];
    this.refs.linked_element.value= word;
    this.setState({i: i});
  },
  
  saveLink: function() {
    if(this.props.selectedText == "" || this.refs.linked_element.value=="") {
      alert('must ground a word to a phrase in the context');
      return(1);
    }
    this.props.addLink(20, this.state.i, this.props.selectedText);
    $('#story').addClass('noselect');
    this.setState({linking: false});
  },
  
  render: function() {
    var btnStyle = { marginLeft: 5, marginRight: 0 };
    var groundBtnStyle = { marginLeft: 5, marginRight: 0 };
    var wrapStyle = { display: 'inline-block' };
    var linkedElementStyle = { display: 'inline-block', width: 50, overflow:'hidden', marginBottom:-8, marginLeft:5 };
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
    var linkStyle = {marginTop: 10 };

    var s = this.props.step;
    if(s==1) {
      groundBtnStyle['display'] = 'none';
    } else {
      groundBtnStyle['display'] = '';
    }

    if(this.state.linking == true){
      return (
        <div style = {wrapStyle}>
          <div style={linkStyle}>
            <textarea ref='linked_element' rows="1" maxLength="50" placeholder="Linked Element" style={linkedElementStyle} disabled></textarea>
            <button onClick={this.saveLink} className='btn btn-xs link-btn' style={btnStyle}>^</button>
            <textarea ref='ground' rows="1" maxLength="50" placeholder="Context" value={this.props.selectedText} style={linkedElementStyle} disabled></textarea>
          </div>
          <div className="actionText" style={divStyle}>
          {
            this.state.linkList.map(function(word, i) {
              return (
                <button key={i} onClick={() => {this.link(i)}} className='btn btn-xs link-btn' style={btnStyle}>{word}</button>
                );
            },this)
          }
          </div>
        </div>
        );
    } else {
      return(
        <div style = {wrapStyle}>
          <div style={linkStyle}>
            <button onClick={this.setLink} className='btn btn-xs link-btn' style={groundBtnStyle}>^</button>
          </div>
          <div ref='consequenceText' className='consequenceText' style={divStyle}>{this.props.cons}</div>
        </div>
      );
    }
  }
});

var ActionComponent = React.createClass({
  getInitialState: function() {
    return { op: this.props.opdefaultValue, act: this.props.adefaultValue, customValue: false, linking: false, linkList: [], i:-1 }
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

  setLink: function() { // i, j, grounding jth word of ith action
    this.setState({linking: true});    var action = this.getAction();
    this.setState({linkList: action.trim().split(" ")});
    $('#story').removeClass('noselect');
  },

  link: function(i) {
    this.setState({i: i});
    var word = this.state.linkList[i];
    this.refs.linked_element.value= word;
  },
  
  saveLink: function() {
    if(this.props.selectedText == "" ||  this.refs.linked_element.value=="") {
      alert('must ground a word to a phrase in the context');
      return(1);
    }
    this.props.addLink(this.props.index, this.state.i, this.props.selectedText);
    $('#story').addClass('noselect');
    this.setState({linking: false});
  },

  render: function() {
    var btnStyle = { marginLeft: 5, marginRight: 0 };
    var groundBtnStyle = { marginLeft: 5, marginRight: 0 };
    var wrapStyle = { display: 'inline-block' };
    var linkedElementStyle = { display: 'inline-block', width: 50, overflow:'hidden', marginBottom:-8, marginLeft:5 };
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
    var linkStyle = {marginTop: 10 };
    if(this.props.index == this.props.numActions-1) {
      var selectStyle = { display: 'none' };
    } else {
      selectStyle = {};
    }

    var s = this.props.step;
    if(s==1) {
      groundBtnStyle['display'] = 'none';
    } else {
      groundBtnStyle['display'] = '';
    }

    if(this.props.edit == true) {
      if (this.state.customValue == true) {
        return(
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
      if(this.state.linking == true){
        return(
          <div style = {wrapStyle}>
            <div style={linkStyle}>
              <textarea ref='linked_element' rows="1" maxLength="50" placeholder="Linked Element" style={linkedElementStyle} disabled></textarea>
              <button onClick={this.saveLink} className='btn btn-xs link-btn' style={btnStyle}>^</button>
              <textarea ref='ground' rows="1" maxLength="50" placeholder="Context" value={this.props.selectedText} style={linkedElementStyle} disabled></textarea>
            </div>
            <div className="actionText" style={divStyle}>
            {
              this.state.linkList.map(function(word, i) {
                return (
                  <button key={i} onClick={() => {this.link(i)}} className='btn btn-xs link-btn' style={btnStyle}>{word}</button>
                  );
              },this)
            }
            </div>
            <div style = {wrapStyle}>
              <b style={selectStyle}>{this.props.opdefaultValue}</b>
            </div>
          </div>
          );
      } else {
        return(
          <div style = {wrapStyle}>
            <div style={linkStyle}>
              <button ref="linkBtn" onClick={this.setLink} className='btn btn-xs link-btn' style={groundBtnStyle}>^</button>
            </div>
            <div style = {wrapStyle}>
              <div className="actionText" style={divStyle}>{this.props.adefaultValue}</div>
              <b style={selectStyle}>{this.props.opdefaultValue}</b>
            </div>
          </div>
        );
      }
    }
  }
});

var PredicateComponent = React.createClass({
  getInitialState: function() {
    var ed = false;
    if(this.props.index == this.props.consList.length) {
      ed = true;
    }
    return { editing: ed, actions: [], ops:[] }
  },

  edit: function() {
    this.setState({editing: true});
  },

  remove: function() {
    if (this.props.numPreds > 1) {
      console.log('removing predicate');
      this.props.removePredicate(this.props.index);
    } else {
      alert("Must provide at least one implication.");
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
    console.log("adding variable");
    var actions = this.state.actions;
    actions.push("");
    this.setState({actions: actions});
    this.props.addVariable(this.props.index);
  },

  addLink: function(i, j, grounding) { // jth word of ith action
    this.props.addLink(this.props.index, i, j, grounding);
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
    var btnStyle = { display: btnVisibility, margin: 5 };

    if(this.props.step==2) {
      return (
        <div className='predicate'>
        <b>{'Rule ' + (this.props.index+1) + ':'}</b>
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
              ref={'action'+i}
              addLink={this.addLink}
              contextLinks={this.props.contextLinks[i]}
              selectedText={this.props.selectedText}
              step={this.props.step}>
              </ActionComponent>
              );
          }, this)
        }
        </div>
        <b>==&gt;</b>
        <ConsequenceComponent cons={this.props.cons} step={this.props.step} addLink={this.addLink} selectedText={this.props.selectedText} contextLinks={this.props.contextLinks[20]}></ConsequenceComponent>
        </div>
      );
    } else {
      return (
        <div className='predicate'>
        <b>{'Rule ' + (this.props.index+1) + ':'}</b>
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
              ref={'action'+i}
              addLink={this.addLink}
              contextLinks={this.props.contextLinks[i]}
              selectedText={this.props.selectedText}
              step={this.props.step}>
              </ActionComponent>
              );
          }, this)
        }
        </div>
        <b>==&gt;</b>
        <ConsequenceComponent cons={this.props.cons} step={this.props.step} addLink={this.addLink} selectedText={this.props.selectedText} contextLinks={this.props.contextLinks[20]}></ConsequenceComponent>
        <button onClick={this.edit} className='btn btn-xs edit-predicate-btn' style={divStyle}>Edit Rule</button>
        <button onClick={this.remove} className='btn btn-xs remove-predicate-btn' style={divStyle}>Remove Rule</button>
        <button ref='addBtn' onClick={this.add} className='btn btn-xs add-predicate-btn' style={btnStyle}>Add Rule</button>
        </div>
        );
      }
  }, 

  renderForm: function() {
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
    var inlineBlock = { display: 'inline-block', marginLeft:10 };
    var btnStyle = { marginLeft: 5, marginRight:-10 };

    return (
      <div className='predicate'>
        <b>{'Rule ' + (this.props.index+1) + ':'}</b>
        <button onClick={this.addVariable} className='btn btn-xs add-variable-btn' style={btnStyle}>Add Variable</button>
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
              ref={'action'+i}
              addLink={this.addLink}
              contextLinks={this.props.contextLinks[i]}
              selectedText={this.props.selectedText}
              step={this.props.step}>
              </ActionComponent>
              );
          }, this)
        }
        </div>
        <select>
          <option value="==>">==&gt;</option>
        </select>
        <textarea ref='consequence' rows="1" maxLength="50" placeholder="consequence" defaultValue={this.props.cons} style={divStyle}></textarea>
        <button onClick={this.save} className='btn btn-xs save-predicate-btn' style={inlineBlock}>Save Rule</button>
        <button onClick={this.remove} className='btn btn-xs remove-predicate-btn' style={inlineBlock}>Remove Rule</button>
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
    var predicates = [
                        [ // predicate
                          [""],[""], "", [[""]] // action list, op list, consequence, list of groundings- per word
                        ]
                      ];
    predicates[0][3][20] = [""];
    return {
      predicates: predicates,
      consList: [], // consequence list
      step: 1
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
    predicates.push([[""],[""],"",[[""]]]);
    predicates[predicates.length-1][3][20] = [""];
    this.setState({predicates: predicates});
  },

  addVariable: function(i) {
    console.log('adding variable');
    var predicates = this.state.predicates;
    predicates[i][0].push("");
    predicates[i][3][predicates[i][3].length-20] = [""];//baaaddd
    this.setState({predicates:predicates});
  },

  addLink: function(i,j,k, grounding) { // ground kth word of the jth action of the ith rule
    console.log('grounding element');
    var predicates = this.state.predicates;
    predicates[i][3][j][k] = grounding;
    this.setState({predicates: predicates});
    ReactDOM.render(<ContextBoard predicates={predicates}></ContextBoard>, document.getElementById('grounding-container'));
  },

  nextStep: function() {
    console.log('next step');
    var s = this.state.step;
    if (s < 3) {
      if(this.state.consList.length < 1) {
        alert('Need at least one rule...');
        return(1);
      }
      s = s+1
    }
    this.setState({step: s});
  },

  prevStep: function() {
    console.log('prev step');
    var s = this.state.step;
    if (s > 1) {
      s = s-1;
    }
    this.setState({step: s});
  },
  
  render: function() {
    var btnStyle = { display: 'inline-block', marginRight: 10 };
    var description = "";
    if(this.state.step==1) {
      description = "add rules";
    } else if(this.state.step==2) {
      description = "ground rules";
    } else {
      description = "modify";
    }
    if(this.props.index == this.props.i_x) {
      return(
        <div className="predicates">
        <h3>{"Step: " + this.state.step + " " + description}</h3>
        <button onClick={this.prevStep} style={btnStyle} className='btn btn-xs step-bkwd-btn'>Previous Step</button>
        <button onClick={this.nextStep} style={btnStyle} className='btn btn-xs step-fwd-btn'>Next Step</button>
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
                contextLinks={predicate[3]}
                consList={this.state.consList}
                updatePredicate={this.updatePredicate}
                removePredicate={this.removePredicate}
                addPredicate={this.addPredicate}
                addVariable={this.addVariable}
                addLink={this.addLink}
                selectedText={this.props.selectedText}
                step={this.state.step}>
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
    return { PredicateManagers, i_x: 0, changeBoards: false, selectedText: ""}
  },

  setNextBoard: function() {
    var i = this.state.i_x;
    this.setState({i_x: i + 1});
    this.setState({changeBoards: true});
    ReactDOM.render(<ContextBoard predicates={this.getFinalState()[this.state.i_x]}></ContextBoard>, document.getElementById('grounding-container'));
  },

  setPrevBoard: function() {
    var i = this.state.i_x;
    this.setState({i_x: i - 1});
    this.setState({changeBoards: true});
    ReactDOM.render(<ContextBoard predicates={this.getFinalState()[this.state.i_x]}></ContextBoard>, document.getElementById('grounding-container'));
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
}); // pass idx to each story and render depending if id.

window.app = ReactDOM.render(<StoryBoard />, document.getElementById('predicate-containers'));
var globalState = [];
$('#next-btn').click(function() { app.setNextBoard(); });
$('#prev-btn').click(function() { app.setPrevBoard(); });
$('#story-container').click(function(e) {
  var selected_text = $('#story').selection().trim();
  app.setState({selectedText: selected_text});
});

var ContextBoard = React.createClass({
  render: function() {
    return(
      <div className="contexts">
      {
        this.props.predicates.map(function(predicate, i) { // ith predicate
          return (
            predicate[3].map(function(action,j) { //jth action
              return(
                action.map(function(mapping,k){ //kth word
                  if(mapping != "") {
                    if(j==20){ // if consequence
                      return(
                        <div>  {"predicate: "+(i+1) + ", consequence: 0" + ", word: " + (k+1) +"("+predicate[2].split(" ")[k]+") -> "+mapping} </div>
                        );
                    } else {
                      return(
                        <div>  {"predicate: "+(i+1) + ", variable: " +(j+1) + ", word: " + (k+1) +"("+predicate[0][j].split(" ")[k]+"): -> "+mapping} </div>
                      );
                    }
                  }
                },this)
              );
            },this)
          );
        }, this)
      }
      </div>
    );
  }
});
