           // Parameters
var stopList = "a about above across after again against almost alone along already also although always an and another any as ask asked asking asks at away b back backed backing backs be became because become becomes been before began behind being beings best better between big both but by c came can cannot case cases certain certainly clear clearly come could d did differ different differently do does done down down downed downing downs during e each early either end ended ending ends enough even evenly ever f face faces fact facts far felt few find finds for four full fully further furthered furthering furthers g gave general generally get gets give given gives go going good goods got great greater greatest group h had has have having here herself high high high higher highest how however if important in interest interested interesting interests into is it its itself j just k keep keeps kind knew know known knows l large largely last later latest least less let lets like likely long longer longest m made make making might more most mostly mr mrs much must n necessary need needed needing needs never new new newer newest next not now number numbers o of off often old older oldest on only open opened opening opens or order ordered ordering orders other others our out over p part parted parting parts per perhaps place places point pointed pointing points possible present presented presenting presents put puts q quite r rather really right right room rooms s said same saw say says second seconds see seem seemed seeming seems sees several shall should show showed showing shows side sides since small smaller smallest so some states still still such sure t take taken than that the then there therefore think thinks though thought thoughts three through thus to today too took toward turn turned turning turns two u under until up upon use used uses v very w want wanted wanting wants was way ways well wells went were what when where whether which while who whole whose why will with within without work worked working works would x y year years yet you young younger youngest z";

var defaultObjects = ["someone", "something"];
   
var InstructionComponent = React.createClass({
  getInitialState: function() {
    return { minimized: false }
  },
  
  minMaximize: function() {
    var m = !this.state.minimized;
    this.setState({minimized: m});
  },
  
  render: function() {
    var instrStyle = {border: "1px solid black", marginTop: 15};
    var ulStyle = {textAlign: 'left'};
    var headerStyle = {display: 'inline-block', textAlign: 'center', marginLeft: 250};
    var btnStyle = {marginLeft: 5};
    var pStyle = {marginRight: 5, marginLeft: -5};
    var divStyle = {paddingTop: 15};
    if(this.state.minimized == true) {
      return(
        <div style={instrStyle}>
          <ul>
            <h4 style = {headerStyle}><b>Instructions and Examples</b></h4>
            <button onClick={this.minMaximize} className='btn btn-xs' style={btnStyle}>SHOW</button>
          </ul>
        </div>
      );
    }  else {
      return(
        <div style={instrStyle}>
          <ul>
            <h4 style = {headerStyle}><b>Instructions and Examples</b></h4>
            <button onClick={this.minMaximize} className='btn btn-xs' style={btnStyle}>HIDE</button>
            <p style={pStyle}>
            Imagine that you want to describe to a friend why a short story ends in the way it does as opposed to having a different conclusion. The story can be about something that happened, something you or someone else has experienced in the past, or simply any life story about someone or something. Your task is derive and ground general rules from the context to explain why an arbitrary fifth-sentence ending logically follows a four-sentence context.
            </p>
            <li>Read the story to the right carefully.</li>
            <li>Construct some rules (Step 1) by:</li>
              <ul style = {ulStyle}>
                <li>Providing statements on left-hand-side of an implication-symbol</li>
                <li>An implication to the right hand side</li>
              </ul>
            <li>Ground these rules by linking terms to phrases in either the context or the given fifth sentence (Step 2).</li>
            <p style={pStyle}>Properties of good rules and groundings are provided below.</p>
            <h4><b>Example</b></h4>
            <li>Context: Jim got his first credit card in college. He didn't have a job so he bought everything on his card. After he graduated he amounted a $10,000 debt. Jim realized that he was foolish to spend so much money.</li>
            <li>Correct fifth-sentence: Jim decided to devise a plan for repayment.</li>
            <p style={pStyle}> <b>Step 1 (constructing rules)</b> - Your rules should be easily derivable from the context and should be focusing on answering <b><i>why</i></b> the given fifth sentence is correct. Each rule should be composed of a subject, a predicate, and an object and should be as general as possible. Do not include specific elements from the context in your rule. To simplify the process, a number of sample objects/subjects are provided for you.</p>
            <li>Good rules: </li>
              <ul style = {ulStyle}>
                <li>context => someone(1) buys something(1)</li>
                <li>context => someone(2) uses something(2)</li>
                <li>someone(3) buys something(3) and someone(4) uses something(4) => someone(5) has something(5)</li>
              </ul>
            <li>Bad rules: </li>
              <ul style = {ulStyle}>
                <li>context => something is someone</li>
              </ul>
            <p style={pStyle}><b>Step 2 (grounding elements)</b> - The context and rule elements you link between should be logically related. You should associate characters, items, and ideas.</p>
            <li>Good links: </li>
              <ul style = {ulStyle}>
                <li>someone(1)  &nbsp;&nbsp;-> Jim</li>
                <li>something(1) -> everything</li>
                <li>someone(2)  &nbsp;&nbsp;-> Jim</li>
                <li>something(2) -> credit card</li>
                <li>someone(3)  &nbsp;&nbsp;-> Jim</li>
                <li>something(3) -> everything</li>
                <li>someone(4)  &nbsp;&nbsp;-> Jim</li>
                <li>something(4) -> credit card</li>
                <li>someone(4)  &nbsp;&nbsp;-> Jim</li>
                <li>something(4) -> debt</li>
                <li>...</li>
              </ul>
            <li>Bad links: </li>
              <ul style = {ulStyle}>
                <li>someone(1)  &nbsp;&nbsp;-> job</li>
                <li>something(1)  -> realized</li>
              </ul>
          </ul>
        </div>
      );
    }
  }
});
ReactDOM.render(<InstructionComponent />, document.getElementById('instruction-div'));

var ConsequenceComponent = React.createClass({ // fix 20 index button linking
  getInitialState: function() {
    return { linking: false, linkList: [], i:-1 }
  },

  setLink: function() { // i, j, grounding jth word of ith action
    if(this.props.alreadyLinking == false) {
      this.setState({linking: true});
      this.setState({linkList: this.props.cons.trim().split(" ")});
      $('#story').removeClass('noselect');
      this.props.toggleLink();
    }
  },
  
  link: function(i) {
    var word = this.state.linkList[i];
    console.log(word);
    this.refs.linked_element.value = word;
    this.setState({i: i});
  },
  
  saveLink: function() {
    this.props.addLink(20, this.state.i, this.props.selectedText);
    $('#story').addClass('noselect');
    this.setState({linking: false});
    this.props.toggleLink();
  },
  
  render: function() {
    var btnStyle = { marginLeft: 5, marginRight: 0 };
    var groundBtnStyle = { marginLeft: 5, marginRight: 0 };
    var wrapStyle = { display: 'inline-block' };
    var linkedElementStyle = { display: 'inline-block', width: 50, overflow:'hidden', marginBottom:-8, marginLeft:5 };
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
    var linkStyle = {marginTop: 10, textAlign: 'center' };

    var s = this.props.step;
    if(s==1 || this.props.alreadyLinking == true || this.props.linkToggle == true) { // do for regular action and all tokens as well.
      groundBtnStyle['display'] = 'none';
    } else {
      groundBtnStyle['display'] = '';
    }

    if(this.state.linking == true && this.props.step == 2){
      return (
        <div style = {wrapStyle}>
          <div style={linkStyle}>
            <textarea ref='linked_element' rows="1" maxLength="50" placeholder="Linked Element" style={linkedElementStyle} disabled></textarea>
            <span> ==></span>
            <textarea ref='ground' rows="1" maxLength="50" placeholder="Context" value={this.props.selectedText} style={linkedElementStyle} disabled></textarea>
            <button onClick={this.saveLink} className='btn btn-xs link-btn' style={btnStyle}>submit</button>
          </div>
          <div className="actionText" style={divStyle}>
          {
            this.state.linkList.map(function(word, i) {
              if (stopList.includes(word)) {
                return(" " + word + " ");
              } else {
                return (
                  <button key={i} onClick={() => {this.link(i)}} className='btn btn-xs link-btn' style={btnStyle}>{word}</button>
                );
              }
            },this)
          }
          </div>
        </div>
        );
    } else {
      return(
        <div style = {wrapStyle}>
          <div style={linkStyle}>
            <button onClick={this.setLink} className='btn btn-xs link-btn' style={groundBtnStyle}>link</button>
          </div>
            <div ref='consequenceText' className='consequenceText' style={divStyle}>{this.props.cons}</div>
        </div>
      );
    }
  }
});

var ActionComponent = React.createClass({
  getInitialState: function() {
    return { op: this.props.opdefaultValue,
             act: this.props.adefaultValue,
             customValue: false,
             customCustomValue: false,
             linking: false,
             linkList: [],
             i:-1 }
  },
  getAction: function() {
    if(this.state.customValue == true){
      var actionSubject = this.refs.actionSubject.value;
      var actionPredicate = this.refs.actionPredicate.value;
      var actionObject = this.refs.actionObject.value;
      return(actionSubject + " " + actionPredicate + " " + actionObject);
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
    if(this.props.alreadyLinking == false) {
      this.setState({linking: true});
      var action = this.getAction();
      this.setState({linkList: action.trim().split(" ")});
      $('#story').removeClass('noselect');
      this.props.toggleLink();
    }
  },

  link: function(i) {
    this.setState({i: i});
    var word = this.state.linkList[i];
    this.refs.linked_element.value= word;
  },
  
  saveLink: function() {
    this.props.addLink(this.props.index, this.state.i, this.props.selectedText);
    $('#story').addClass('noselect');
    this.setState({linking: false}  );
    this.props.toggleLink();
  },

  render: function() {
    var btnStyle = { marginLeft: 5, marginRight: 0 };
    var objectStyle = {marginRight: 5};
    var groundBtnStyle = { marginLeft: 5, marginRight: 0};
    var wrapStyle = { display: 'inline-block' };
    var linkedElementStyle = { display: 'inline-block', width: 50, overflow:'hidden', marginBottom:-8, marginLeft:5 };
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
    var linkStyle = {marginTop: 10, textAlign: 'center' };
    if(this.props.index == this.props.numActions-1) {
      var selectStyle = { display: 'none' };
    } else {
      selectStyle = {};
    }

    var s = this.props.step;
    if(s==1 || this.props.alreadyLinking == true || this.props.linkToggle == true) {
      groundBtnStyle['display'] = 'none';
    } else {
      groundBtnStyle['display'] = '';
    }
    
    var actionSubjectDefault = this.props.adefaultValue.split(" ")[0];
    var actionPredicateDefault = this.props.adefaultValue.split(" ").slice(1, -1).join(" ");
    var actionObjectDefault = this.props.adefaultValue.split(" ").slice(-1)[0];

    if(this.props.edit == true) {
      if (this.state.customValue == true) {
        return(
          <div style = {wrapStyle}>
            <select ref='actionSubject' defaultValue={actionSubjectDefault} onChange={this.objectChange} style={btnStyle}>
              <option value="someone">someone</option>
              <option value="something">something</option>
              <option value="somewhere">somewhere</option>
              <option value="customOption">[custom variable]</option>
            </select>
            <textarea ref='actionPredicate' rows="1" maxLength="50" placeholder="action" defaultValue={actionPredicateDefault} style={divStyle} onBlur={this.onBlurHandler}></textarea>
            <select ref='actionObject' defaultValue={actionObjectDefault} onChange={this.objectChange} style={objectStyle}>
              <option value="someone">someone</option>
              <option value="something">something</option>
              <option value="somewhere">somewhere</option>
              <option value="customOption">[custom variable]</option>
            </select>
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
              <option value="context">context</option>
              {
                this.props.consList.map(function(consequence) {
                  return(<option key={consequence}
                    value={consequence}>{consequence}</option>);
                })
              }
              <option value="customOption">[custom variable]</option>
            </select>
            <select ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
              <option value="&&">&amp;&amp;</option>
              <option value="||">||</option>
            </select>
          </div>
          );
      }
    } else {
      if(this.state.linking == true  && this.props.step == 2){
        return(
          <div style = {wrapStyle}>
            <div style={linkStyle}>
              <textarea ref='linked_element' rows="1" maxLength="50" placeholder="Linked Element" style={linkedElementStyle} disabled></textarea>
              <span> ==></span>
              <textarea ref='ground' rows="1" maxLength="50" placeholder="Context" value={this.props.selectedText} style={linkedElementStyle} disabled></textarea>
              <button onClick={this.saveLink} className='btn btn-xs link-btn' style={btnStyle}>submit</button>
            </div>
            <div className="actionText" style={divStyle}>
            {
              this.state.linkList.map(function(word, i) {
                if (stopList.includes(word)) {
                  return(" " + word + " ");
                } else {
                  return (
                    <button key={i} onClick={() => {this.link(i)}} className='btn btn-xs link-btn' style={btnStyle}>{word}</button>
                  );
                }
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
              <button ref="linkBtn" onClick={this.setLink} className='btn btn-xs link-btn' style={groundBtnStyle}>link</button>
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
    return { editing: ed, actions: [], ops:[], linking: false }
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
    var consequencePredicate = this.refs.consequencePredicate.value.trim();
    var consequenceSubject = this.refs.consequenceSubject.value.trim();
    var consequenceObject = this.refs.consequenceObject.value.trim();
    for (var i=0;i<actions.length;i++) {
      console.log('action: ' +actions[i]);
      if(actions[i] == "" || consequencePredicate == "") {
        alert("Can't save empty variable");
        return false;
      }
    }
    this.props.updatePredicate(actions, ops, consequenceSubject + " " + consequencePredicate + " " + consequenceObject, this.props.index);
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
  
  setLink: function() {
    var l = this.state.linking
    this.setState({linking: !l});
    this.props.linkToggler();
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
              step={this.props.step}
              toggleLink={this.setLink}
              alreadyLinking={this.state.linking}
              linkToggle = {this.props.linkToggle}>
              </ActionComponent>
              );
          }, this)
        }
        </div>
        <b>==&gt;</b>
        <ConsequenceComponent cons={this.props.cons} step={this.props.step} addLink={this.addLink} selectedText={this.props.selectedText} contextLinks={this.props.contextLinks[20]} toggleLink={this.setLink} alreadyLinking={this.state.linking} linkToggle = {this.props.linkToggle}></ConsequenceComponent>
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
  
  subjectChange: function() { },
  
  objectChange: function() { },

  renderForm: function() {
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
    var inlineBlock = { display: 'inline-block', marginLeft:10 };
    var btnStyle = { marginLeft: 5, marginRight:-10 };
    
    var consequenceSubjectDefault = this.props.cons.split(" ")[0];
    var consequencePredicateDefault = this.props.cons.split(" ").slice(1, -1).join(" ");
    var consequenceObjectDefault = this.props.cons.split(" ").slice(-1)[0];

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
        <select ref='consequenceSubject' style={inlineBlock} defaultValue={consequenceSubjectDefault} onChange={this.subjectChange}>
          <option value="someone">someone</option>
          <option value="something">something</option>
          <option value="somewhere">somewhere</option>
          <option value="customOption">[custom variable]</option>
        </select>
        <textarea ref='consequencePredicate' rows="1" maxLength="50" cols="16" placeholder="consequence" defaultValue={consequencePredicateDefault} style={divStyle}></textarea>
        <select ref='consequenceObject' defaultValue={consequenceObjectDefault} onChange={this.objectChange}>
          <option value="someone">someone</option>
          <option value="something">something</option>
          <option value="somewhere">somewhere</option>
          <option value="customOption">[custom variable]</option>
        </select>
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
      linkToggle: false,
      step: 1,
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
  
  toggleLink: function() {
    var l = this.state.linkToggle;
    this.setState({linkToggle: !l});
  },

  nextStep: function() {
    console.log('next step');
    var s = this.state.step;
    if (s < 2) {
      if(this.state.consList.length < 1) {
        alert('Need at least one rule...');
        return(1);
      }
      s = s+1
      if(s > 1) {
        document.getElementById('context-title').style.display="inline-block";
        document.getElementById('grounding-container').style.display="inline-block";
      }
    }
    this.setState({step: s});
  },

  prevStep: function() {
    console.log('prev step');
    var s = this.state.step;
    if (s > 1) {
      s = s-1;
    }
    if (s == 1) {
      document.getElementById('context-title').style.display="none";
      document.getElementById('grounding-container').style.display="none";
    }
    this.setState({step: s});
  },
  
  render: function() {
    var btnStyle = { display: 'inline-block', marginRight: 10 };
    var description = "";
    if(this.state.step==1) {
      description = "Add rules";
    } else if(this.state.step==2) {
      description = "Ground rules";
    }
    if(this.props.index == this.props.i_x) {
      return(
        <div className="predicates">
        <div className="row">
        <div className="col-md-4 col-md-offset-5">
          <h3>{"Step: " + this.state.step + " " + description}</h3>
          <button onClick={this.prevStep} style={btnStyle} className='btn btn-sm step-bkwd-btn btn-primary'>Previous Step</button>
          <button onClick={this.nextStep} style={btnStyle} className='btn btn-sm step-fwd-btn btn-primary'>Next Step</button>
        </div>
        </div>
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
                step={this.state.step}
                linkToggle={this.state.linkToggle}
                linkToggler={this.toggleLink}>
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

var ContextBoard = React.createClass({
  render: function() {
    var contextStyle = {};//{display: };
    return(
      <div className="contexts" style={contextStyle}>
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

window.app = ReactDOM.render(<StoryBoard />, document.getElementById('predicate-containers'));
var globalState = [];
//$('#next-btn').click(function() { app.setNextBoard(); });
//$('#prev-btn').click(function() { app.setPrevBoard(); });
$('#story-container').click(function(e) {
  var selected_text = $('#story').selection().trim();
  app.setState({selectedText: selected_text});
});