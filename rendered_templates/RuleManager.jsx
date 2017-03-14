// Parameters
var stopWordList = "a about above across after again against almost alone along already also although always an and another any as ask asked asking asks at away b back backed backing backs be became because become becomes been before began behind being beings best better between big both but by c came can cannot case cases certain certainly clear clearly come could d did differ different differently do does done down down downed downing downs during e each early either end ended ending ends enough even evenly ever f face faces fact facts far felt few find finds for four full fully further furthered furthering furthers g gave general generally get gets give given gives go going good goods got great greater greatest group h had has have having here herself high high high higher highest how however if important in interest interested interesting interests into is it its itself j just k keep keeps kind knew know known knows l large largely last later latest least less let lets like likely long longer longest m made make making might more most mostly mr mrs much must n necessary need needed needing needs never new new newer newest next not now number numbers o of off often old older oldest on only open opened opening opens or order ordered ordering orders other others our out over p part parted parting parts per perhaps place places point pointed pointing points possible present presented presenting presents put puts q quite r rather really right right room rooms s said same saw say says second seconds see seem seemed seeming seems sees several shall should show showed showing shows side sides since small smaller smallest so some states still still such sure t take taken than that the then there therefore think thinks though thought thoughts three through thus to today too took toward turn turned turning turns two u under until up upon use used uses v very w want wanted wanting wants was way ways well wells went were what when where whether which while who whole whose why will with within without work worked working works would x y year years yet you young younger youngest z";
var defaultObjects = ["someone", "something", "somewhere"];
var defaultPrepositions =["at","in","from","with","by","about","under","along","without","on","before","after","-"]

var FooterInstructionComponent = window.FooterInstructionComponent;
ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={1}/>, document.getElementById('footer-instructions'));

var InstructionComponent = window.InstructionComponent;
ReactDOM.render(<InstructionComponent />, document.getElementById('instruction-div'));

var ExampleComponent = window.ExampleComponent;
ReactDOM.render(<ExampleComponent />, document.getElementById('examples-div'));

var SubHeaderInstructionComponent = window.SubHeaderInstructionComponent;

var PrepphraseComponent = React.createClass({
  getInitialState: function() {
    var pt = "";
    var ps = "";
    var ssinit = false;
    if(this.props.defaultPrep != "") {
      pt = this.props.defaultPrep.trim().split(" ")[0];
      ps = this.props.defaultPrep.trim().split(" ").slice(1,this.props.defaultPrep.trim().length - 1);
      ssinit = true;
    }
    
    return { editing: this.props.editing,
             customSubject: false,
             showSubject: ssinit,
             prepositionType: '',
             prepositionSubject: '',
             prepositionTypeDefault: pt,
             prepositionSubjectDefault: ps
            }
  },
  
  prepositionSubjectChangeHandler: function(event){
    if(event.target.value == 'customOption') {
      this.setState({customSubject: true, prepositionSubject: event.target.value});
    }
    this.setState({prepositionSubject: event.target.value});
    //ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={6} />, document.getElementById('footer-instructions'));
  },
  
  prepositionTypeChangeHandler: function(event){
    if(event.target.value != '--') {
      this.setState({showSubject: true, prepositionType: event.target.value});
    } else {
      this.setState({showSubject: false, prepositionType: event.target.value});
    }
    //ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={6} />, document.getElementById('footer-instructions'));
  },
  
  getPrepPhrase: function() {
    var d = {};
    d['pType'] = this.refs.prepositionType.value;
    d['pObject'] = this.refs.prepositionSubject.value;
    return(d);
  },
  
  render: function() {
    var wrapStyle = { display: 'inline-block', marginBottom: 15};
    var customStyle = { display: 'inline-block', margin: 5, marginBottom: -5, width:'auto' };
    var divStyle = { display: 'inline-block', marginRight: 5, marginBottom: -5, width:'auto', width:105 };
    
    if(this.state.prepositionTypeDefault == "" || this.state.prepositionTypeDefault == null) { // fix
      var prepositionTypeDefault = "preposition";
      var prepositionTypeDefaultValue = "";
    } else {
      var prepositionTypeDefault = this.state.prepositionTypeDefault;
      var prepositionTypeDefaultValue = this.state.prepositionTypeDefault;
    }
    if(this.state.prepositionSubjectDefault == "" || this.state.prepositionSubjectDefault == null) {
      var prepositionSubjectDefault = "subject";
      var prepositionSubjectDefaultValue = "";
    } else {
      var prepositionSubjectDefault = this.state.prepositionSubjectDefault;
      var prepositionSubjectDefaultValue = this.state.prepositionSubjectDefault;
    }
    
    var prepositionSubjectStyle = { display: 'inline-block', marginRight: 5, marginBottom: -5, width:'auto' };
    var subjectShowState = '';
    if(this.state.showSubject == true) {
      subjectShowState = '';
    } else {
      subjectShowState = 'disabled'
    }
    
    if(this.state.editing == true) {
      if(this.state.customSubject == false) {
        return(
          <span style={wrapStyle}>
            <select className='soflow' ref='prepositionType' defaultValue={prepositionTypeDefaultValue} onChange={this.prepositionTypeChangeHandler} style={divStyle}>
              <option value={prepositionTypeDefaultValue} disabled>{prepositionTypeDefault}</option>
              <option value="~at">at</option>
              <option value="~in">in</option>
              <option value="~from">from</option>
              <option value="~with">with</option>
              <option value="~by">by</option>
              <option value="~about">about</option>
              <option value="~under">under</option>
              <option value="~along">along</option>
              <option value="~without">without</option>
              <option value="~on">on</option>
              <option value="~before">before</option>
              <option value="~after">after</option>
              <option value="--">--</option>
            </select>
            
            <select className='soflow' ref='prepositionSubject' defaultValue={prepositionSubjectDefaultValue} onChange={this.prepositionSubjectChangeHandler} style={prepositionSubjectStyle} disabled = {subjectShowState}>
              <option value={prepositionSubjectDefaultValue} disabled>{prepositionSubjectDefault}</option>
              <option value="someone">someone</option>
              <option value="something">something</option>
              <option value="somewhere">somewhere</option>
              <option value="customOption">[custom object]</option>
            </select>
          </span>
        );
      } else {
        return(
          <span style={wrapStyle}>
            <select className='soflow' ref='prepositionType' defaultValue={prepositionTypeDefaultValue} onChange={this.prepositionTypeChangeHandler} style={divStyle}>
              <option value={prepositionTypeDefaultValue} disabled>{prepositionTypeDefault}</option>
              <option value="at">at</option>
              <option value="in">in</option>
              <option value="from">from</option>
              <option value="with">with</option>
              <option value="by">by</option>
              <option value="about">about</option>
              <option value="under">under</option>
              <option value="along">along</option>
              <option value="without">without</option>
              <option value="on">on</option>
              <option value="before">before</option>
              <option value="after">after</option>
              <option value="--">--</option>
            </select>
          
            <textarea ref='prepositionSubject' rows="1" maxLength="50" cols="15" placeholder="subject" onChange={this.prepositionSubjectChangeHandler} defaultValue={prepositionSubjectDefaultValue} style={prepositionSubjectStyle} disabled = {subjectShowState}></textarea>
          </span>
        );
      }
    } else {
      return(
        <span style={wrapStyle}>
          {this.props.prepositionTypeDefault} + " " + {this.props.prepositionSubjectDefault}
        </span>
      );
    }
  }
});

/*
React component containing rendered consequence
*/
var ConsequenceComponent = React.createClass({ // fix 20 index button linking
  getInitialState: function() {
    return { linking: false, // are we currently linking?
             linkList: [],   // words
             i:-1,           // temporary index of linked word
             colors:{},      // array of color links
             customSubject:false,
             customObject:false
            }
  },

  setLink: function() { // i, j, grounding jth word of ith action
    if(this.props.alreadyLinking == false) {
      this.setState({linking: true});
      this.setState({linkList: this.props.cons.trim().split(" ")});
      $('#story').removeClass('noselect');
      $('#story').removeAttr( "disabled" )
      $('#story-ending').removeClass('noselect');
      $('#story-ending2').removeClass('noselect');
      this.props.toggleLink();
    }
  },
  
  link: function(i) {
    var word = this.state.linkList[i];
    this.refs.linked_element.value = word;
    this.setState({i: i});
  },

  saveLink: function() {
    var color = new RColor;
    var c = color.get(true);
    var cols = this.state.colors;
    cols[this.state.i] = c;
    this.setState({colors: cols});
    if(this.props.selectedText == "") {
      alert('You have not selected anything from the story to ground to. It is recommended that you reground this word.');
    }
    this.props.addLink(20, this.state.i, this.props.selectedText,c);
    $('#story').addClass('noselect');
    $('#story').attr('disabled','disabled');
    $('#story-ending').addClass('noselect');
    this.setState({linking: false});
    this.props.toggleLink();
  },
  
  getData: function() {
    var d = {};
    d['cPredicate'] = this.refs.consequencePredicate.value.trim();
    d['cSubject'] = this.refs.consequenceSubject.value.trim();
    d['cObject'] = this.refs.consequenceObject.value.trim();
    return(d);
  },
  
  subjectChange: function(event){
    if(event.target.value == 'customOption') {
      this.setState({customSubject: true});
    }
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={5} />, document.getElementById('footer-instructions'));
  },
  objectChange: function(event){
    if(event.target.value == 'customOption') {
      this.setState({customObject: true});
    }
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={6} />, document.getElementById('footer-instructions'));
  },
  predicateChange: function() {
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={7} />, document.getElementById('footer-instructions'));
  },
  
  render: function() {
    var btnStyle = { marginLeft: 5, marginRight: 0 };
    var groundBtnStyle = { marginLeft: 5, marginRight: 0 };
    var wrapStyle = { display: 'inline-block' };
    var linkedElementStyle = { display: 'inline-block', width: 50, overflow:'hidden', marginBottom:-8, marginLeft:5 };
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5, width:'auto' };
    var linkStyle = {marginTop: 40, textAlign: 'center' };
    var inlineBlock = { marginLeft:10 };
    var s = this.props.step;
    
    // Display grounding button depending if there exists an action we are currently linking
    if(s==1 || this.props.alreadyLinking == true || this.props.linkToggle == true) {
      groundBtnStyle['display'] = 'none';
    } else {
      groundBtnStyle['display'] = '';
    }
    
    if(this.props.consequenceSubjectDefault != "") {
      var consequenceSubjectDefault = this.props.consequenceSubjectDefault;
    } else {
      var consequenceSubjectDefault = "subject"
    }
    if(this.props.consequenceObjectDefault != "") {
      var consequenceObjectDefault = this.props.consequenceObjectDefault;
    } else {
      var consequenceObjectDefault = "object"
    }
    
    if(this.props.edit == true) {
      if(this.state.customSubject == true && this.state.customObject == false) {
        return(
          <span className='consequence-container' style={inlineBlock}>
            <textarea ref='consequenceSubject' rows="1" maxLength="50" cols="10" placeholder="subject" defaultValue={this.props.consequenceSubjectDefault} style={divStyle}></textarea>
            
            <textarea ref='consequencePredicate' rows="1" maxLength="50" cols="15" placeholder="consequence" onChange={this.predicateChange} defaultValue={this.props.consequencePredicateDefault} style={divStyle}></textarea>
            
            <select className='soflow' ref='consequenceObject' defaultValue={consequenceObjectDefault} onChange={this.objectChange}>
              <option value={consequenceObjectDefault} disabled>{consequenceObjectDefault}</option>
              <option value="someone">someone</option>
              <option value="something">something</option>
              <option value="somewhere">somewhere</option>
              <option value="-">-</option>
              <option value="customOption">[custom object]</option>
            </select>
          </span>
        );
      } else if (this.state.customSubject == false && this.state.customObject == true) {
        return(
          <span className='consequence-container' style={inlineBlock}>
            <select className='soflow' ref='consequenceSubject' defaultValue={consequenceSubjectDefault} onChange={this.subjectChange}>
              <option value={consequenceSubjectDefault} disabled>{consequenceSubjectDefault}</option>
              <option value="someone">someone</option>
              <option value="something">something</option>
              <option value="somewhere">somewhere</option>
              <option value="customOption">[custom object]</option>
            </select>
            
            <textarea ref='consequencePredicate' rows="1" maxLength="50" cols="15" placeholder="consequence" onChange={this.predicateChange} defaultValue={this.props.consequencePredicateDefault} style={divStyle}></textarea>
            
            <textarea ref='consequenceObject' rows="1" maxLength="50" cols="10" placeholder="object" defaultValue={this.props.consequenceObjectDefault} style={divStyle}></textarea>
          </span>
        );
      } else if (this.state.customSubject == true && this.state.customObject == true) {
        return(
          <span className='consequence-container' style={inlineBlock}>
            <textarea ref='consequenceSubject' rows="1" maxLength="50" cols="10" placeholder="subject" defaultValue={this.props.consequencePredicateDefault} style={divStyle}></textarea>
            
            <textarea ref='consequencePredicate' rows="1" maxLength="50" cols="15" placeholder="consequence" onChange={this.predicateChange} defaultValue={this.props.consequencePredicateDefault} style={divStyle}></textarea>
            
            <textarea ref='consequenceObject' rows="1" maxLength="50" cols="10" placeholder="object" defaultValue={this.props.consequenceObjectDefault} style={divStyle}></textarea>
          </span>
        );
      } else {
        return(
          <span className='consequence-container' style={inlineBlock}>
            <select className='soflow' ref='consequenceSubject' defaultValue={consequenceSubjectDefault} onChange={this.subjectChange}>
              <option value={consequenceSubjectDefault} disabled>{consequenceSubjectDefault}</option>
              <option value="someone">someone</option>
              <option value="something">something</option>
              <option value="somewhere">somewhere</option>
              <option value="customOption">[custom object]</option>
            </select>
            
            <textarea ref='consequencePredicate' rows="1" maxLength="50" cols="15" placeholder="consequence" onChange={this.predicateChange} defaultValue={this.props.consequencePredicateDefault} style={divStyle}></textarea>
            
            <select className='soflow' ref='consequenceObject' defaultValue={consequenceObjectDefault} onChange={this.objectChange}>
              <option value={consequenceObjectDefault} disabled>{consequenceObjectDefault}</option>
              <option value="someone">someone</option>
              <option value="something">something</option>
              <option value="somewhere">somewhere</option>
              <option value="customOption">[custom object]</option>
            </select>
          </span>
        );
      }
    } else {
      // if the step is 2, display the grounding buttons and remove the rule manipulation buttons
      if(this.state.linking == true && this.props.step == 2){
        return (
          <div style = {wrapStyle}>
            <div style={linkStyle}>
              <textarea ref='linked_element' rows="1" maxLength="50" placeholder="Linked Element" style={linkedElementStyle} disabled></textarea>
              <span> ==></span>
              <textarea ref='ground' rows="1" maxLength="50" placeholder="Story" value={this.props.selectedText} style={linkedElementStyle} disabled></textarea>
              <button onClick={this.saveLink} className='btn btn-xs link-btn btn-success' style={btnStyle}>submit</button>
            </div>
            <div className="actionText" style={divStyle}>
            {
              this.state.linkList.map(function(word, i) {
                if (stopWordList.includes(word)) { // if word is a stopword or has already grounded
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
              <button onClick={this.setLink} className='btn btn-xs link-btn' style={groundBtnStyle}>Ground to Story</button>
            </div>
              <div ref='consequenceText' className='consequenceText' style={divStyle}>{
                this.props.cons.split(" ").map(function(word, i) {
                  var colStyle = {color: this.state.colors[i]}
                  return(<span key={i} style={colStyle}>{word} </span>);
                },this)
              }
              </div>
          </div>
        );
      }
    }
  }
});

/*
React premise component
*/
var PremiseComponent = React.createClass({
  getInitialState: function() {
    var customVal = false;
    if(this.props.predicateIndex == 0) {
      customVal = true;
    } else { customVal = false }
    if(this.props.adefaultValue.trim().slice(-1)[0]  == '--') { // if preposition chosen
      var adefaultValue = this.props.adefaultValue.slice(0, -1);
      var prepdefaultValue = ''
    } else {
      var adefaultValue = this.props.adefaultValue.substring(0, this.props.adefaultValue.indexOf('~'));
      var prepdefaultValue = this.props.adefaultValue.substring(this.props.adefaultValue.indexOf('~'), this.props.adefaultValue.length);
    }
    
    return { op: this.props.opdefaultValue, // default operator value for this premise
             //act: this.props.adefaultValue, // default predicate value for this premise
             act: adefaultValue,
             prep: prepdefaultValue,
             customValue: customVal,        // does the worker want to write his own premise?
             customObject: false,
             customSubject: false,
             customCustomValue: false,
             linking: false,                // are we linking this premise?
             linkList: [],                  // list of words
             i:-1,                          // index for linked word
             colors: []                     // set of colors for linked words
            }
  },
  
  getAction: function() {
    if(this.state.customValue == true){
      var actionSubject = this.refs.actionSubject.value;
      var actionPredicate = this.refs.actionPredicate.value;
      var actionObject = this.refs.actionObject.value;
      var prepPhrase = this.refs.ppcomp.getPrepPhrase();

      return(actionSubject + " " + actionPredicate + " " + actionObject + " " + prepPhrase['pType'] + " " + prepPhrase['pObject']);
    } else {
      return(this.state.act.trim() + " " + this.state.prep.trim());
    }
  },

  getOp: function() {
    if(this.state.op == '' || this.state.op == null) {return("and");}
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
      console.log(action)
      this.setState({linkList: action.trim().split(" ")});
      $('#story').removeClass('noselect');
      $('#story').removeAttr( "disabled" )
      $('#story-ending').removeClass('noselect');
      $('#story-ending2').removeClass('noselect');
      this.props.toggleLink();
    }
  },

  link: function(i) {
    this.setState({i: i});
    var word = this.state.linkList[i];
    ReactDOM.render(<FooterInstructionComponent step={2} substep={1} r={2} />, document.getElementById('footer-instructions'));
    this.refs.linked_element.value= word.replace(/~/gi, ''); // replace prep tag
  },
  
  contextChange: function() {
    ReactDOM.render(<FooterInstructionComponent step={2} substep={1} r={4} />, document.getElementById('footer-instructions'));
  },
  
  saveLink: function() {
    var color = new RColor;
    var c = color.get(true);
    var cols = this.state.colors;
    cols[this.state.i] = c;
    this.setState({colors: cols});
    if(this.props.selectedText == "") {
      alert('You have not selected anything from the story to ground to. It is recommended that you reground this word.');
    }

    this.props.addLink(this.props.index, this.state.i, this.props.selectedText,c);
    $('#story').addClass('noselect');
    $('#story').attr('disabled','disabled');
    $('#story-ending').addClass('noselect');
    $('#story-ending2').addClass('noselect');
    ReactDOM.render(<FooterInstructionComponent step={2} substep={1} r={5} />, document.getElementById('footer-instructions'));
    this.setState({linking: false});
    this.props.toggleLink();
  },
  
  removePremise: function() {
    this.props.removePremise(this.props.index);
  },

  subjectChange: function(event){
    if(event.target.value == 'customOption') {
      this.setState({customSubject: true});
    }
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={2} />, document.getElementById('footer-instructions'));
  },
  objectChange: function(event){
    if(event.target.value == 'customOption') {
      this.setState({customObject: true});
    }
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={3} />, document.getElementById('footer-instructions'));
  },
  predicateChange: function() {
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={4} />, document.getElementById('footer-instructions'));
  },

  render: function() {
    var btnStyle = { marginLeft: 5, marginRight: 0 };
    var objectStyle = {marginRight:5}; //marginRight: 5
    var groundBtnStyle = { marginLeft: 5, marginRight: 0};
    var wrapStyle = { display: 'inline-block', marginBottom: 15};
    var linkedElementStyle = { display: 'inline-block', width: 50, overflow:'hidden', marginBottom:-8, marginLeft:5 };
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5, width:'auto' };
    var linkStyle = { marginTop: -25, textAlign: 'center' };
    var formStyle = { width:120, marginRight: 50 };
    var removePremiseStyle = {marginTop: -20};
    var selectStyle = {}
    
    if(this.props.index == this.props.numActions-1) {selectStyle = {display: 'none'};} else {selectStyle={};}
    if(this.props.numActions == 1) {removePremiseStyle={display: 'none'}}else {removePremiseStyle={};}

    var s = this.props.step;
    if(s==1 || this.props.alreadyLinking == true || this.props.linkToggle == true) {
      groundBtnStyle['display'] = 'none';
    } else {
      groundBtnStyle['display'] = '';
    }
    
    var act = this.state.act.trim()
    
    if(act.split(" ")[0] != "") {
      var actionSubjectDefault = act.split(" ")[0];
    } else {
      var actionSubjectDefault = "subject"
    }
    var actionPredicateDefault = act.split(" ").slice(1, -1).join(" ");
    if(act.trim().split(" ").slice(-1)[0] != "") {
      var actionObjectDefault = act.split(" ").slice(-1)[0];
    } else {
      var actionObjectDefault = "object"
    }

    if(this.props.edit == true) {
      if (this.state.customValue == true || this.props.predicateIndex == 0) { // no options to chose from
        if(this.state.customSubject == true && this.state.customObject == false) {
          return(
            <div style={wrapStyle}>
              <div style={linkStyle}>
                <button onClick={this.removePremise} style={removePremiseStyle} className='btn btn-xs save-predicate-btn'>Remove Premise</button>
              </div>
              
              <span style = {wrapStyle}>
                <textarea ref='actionSubject' rows="1" maxLength="50" cols="10" placeholder="subject" defaultValue={actionSubjectDefault} onChange={this.subjectChange} style={divStyle} onBlur={this.onBlurHandler}></textarea>
                
                <textarea ref='actionPredicate' rows="1" maxLength="50" cols="15" placeholder="action" defaultValue={actionPredicateDefault} onChange={this.predicateChange} style={divStyle} onBlur={this.onBlurHandler}></textarea>
                
                <select className='soflow' ref='actionObject' defaultValue={actionObjectDefault} onChange={this.objectChange} style={objectStyle}>
                  <option value="" disabled>object</option>
                  <option value="someone">someone</option>
                  <option value="something">something</option>
                  <option value="somewhere">somewhere</option>
                  <option value="-">-</option>
                  <option value="customOption">[custom object]</option>
                </select>
                
                <PrepphraseComponent
                  ref='ppcomp'
                  editing={true}
                  defaultPrep={this.state.prep}
                />
                
                <select className='soflow' ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
                  <option value="and">and</option>
                  <option value="or">or</option>
                </select>
              </span>
            </div>
          );
        } else if(this.state.customSubject == false && this.state.customObject == true) {
          return(
            <div style={wrapStyle}>
              <div style={linkStyle}>
                <button onClick={this.removePremise} style={removePremiseStyle} className='btn btn-xs save-predicate-btn'>Remove Premise</button>
              </div>
              
              <span style = {wrapStyle}>
                <select className='soflow' ref='actionSubject' defaultValue={actionSubjectDefault} onChange={this.subjectChange} style={btnStyle}>
                  <option value="" disabled>subject</option>
                  <option value="someone">someone</option>
                  <option value="something">something</option>
                  <option value="somewhere">somewhere</option>
                  <option value="customOption">[custom subject]</option>
                </select>
                
                <textarea ref='actionPredicate' rows="1" maxLength="50" cols="15" placeholder="action" defaultValue={actionPredicateDefault} onChange={this.predicateChange} style={divStyle} onBlur={this.onBlurHandler}></textarea>
                
                <textarea ref='actionObject' rows="1" maxLength="50" cols="10" placeholder="object" defaultValue={actionObjectDefault} onChange={this.objectChange} style={divStyle} onBlur={this.onBlurHandler}></textarea>
                
                <PrepphraseComponent
                  ref='ppcomp'
                  editing={true}
                  defaultPrep={this.state.prep}
                />
                
                <select className='soflow' ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
                  <option value="and">and</option>
                  <option value="or">or</option>
                </select>
              </span>
            </div>
          );
        } else if(this.state.customSubject == true && this.state.customObject == true) {
          return(
            <div style={wrapStyle}>
              <div style={linkStyle}>
                <button onClick={this.removePremise} style={removePremiseStyle} className='btn btn-xs save-predicate-btn'>Remove Premise</button>
              </div>
              <span style = {wrapStyle}>
                <textarea ref='actionSubject' rows="1" maxLength="50" cols="10" placeholder="subject" defaultValue={actionSubjectDefault} onChange={this.subjectChange} style={divStyle} onBlur={this.onBlurHandler}></textarea>
                
                <textarea ref='actionPredicate' rows="1" maxLength="50" cols="15" placeholder="action" defaultValue={actionPredicateDefault} onChange={this.predicateChange} style={divStyle} onBlur={this.onBlurHandler}></textarea>
                
                <textarea ref='actionObject' rows="1" maxLength="50" cols="10" placeholder="object" defaultValue={actionObjectDefault} onChange={this.objectChange} style={divStyle} onBlur={this.onBlurHandler}></textarea>
                
                <PrepphraseComponent
                  ref='ppcomp'
                  editing={true}
                  defaultPrep={this.state.prep}
                />
                
                <select className='soflow' ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
                  <option value="and">and</option>
                  <option value="or">or</option>
                </select>
              </span>
            </div>
          );
        } else {
          return(
            <div style={wrapStyle}>
              <div style={linkStyle}>
                <button onClick={this.removePremise} style={removePremiseStyle} className='btn btn-xs save-predicate-btn'>Remove Premise</button>
              </div>
              
              <span style = {wrapStyle}>
                <select className='soflow' ref='actionSubject' defaultValue={actionSubjectDefault} onChange={this.subjectChange} style={btnStyle}>
                  <option value={actionSubjectDefault} disabled>{actionSubjectDefault}</option>
                  <option value="someone">someone</option>
                  <option value="something">something</option>
                  <option value="somewhere">somewhere</option>
                  <option value="customOption">[custom subject]</option>
                </select>
                
                <textarea ref='actionPredicate' rows="1" maxLength="50" cols="15" placeholder="action" defaultValue={actionPredicateDefault} onChange={this.predicateChange} style={divStyle} onBlur={this.onBlurHandler}></textarea>
                
                <select className='soflow' ref='actionObject' defaultValue={actionObjectDefault} onChange={this.objectChange} style={objectStyle}>
                  <option value={actionObjectDefault} disabled>{actionObjectDefault}</option>
                  <option value="someone">someone</option>
                  <option value="something">something</option>
                  <option value="somewhere">somewhere</option>
                  <option value="-">-</option>
                  <option value="customOption">[custom object]</option>
                </select>
                
                <PrepphraseComponent
                  ref='ppcomp'
                  editing={true}
                  defaultPrep={this.state.prep}
                />
                
                <select className='soflow' ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
                  <option value="and">and</option>
                  <option value="or">or</option>
                </select>
              </span>
            </div>
          );
        }
      } else { // new premise
        return (
          <div style={wrapStyle}>
            <div style={linkStyle}>
              <button onClick={this.removePremise} style={removePremiseStyle} className='btn btn-xs save-predicate-btn'>Remove Premise</button>
            </div>
            <div style={wrapStyle}>
              <select ref='action' style={divStyle} onChange={this.actChangeHandler}>
                  <option selected="selected" defaultValue={this.state.act} disabled>premise</option>
                  {
                  this.props.consList.map(function(consequence) {
                    return(<option key={consequence}
                      value={consequence}>{consequence}</option>);
                  })
                }
                <option value="customOption">[custom premise]</option>
              </select>
              <select ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
                <option value="and">and</option>
                <option value="or">or</option>
              </select>
            </div>
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
              <textarea ref='ground' rows="1" maxLength="50" placeholder="Story" value={this.props.selectedText} style={linkedElementStyle} onChange={this.contextChange} disabled></textarea>
              <button onClick={this.saveLink} className='btn btn-xs link-btn btn-success' style={btnStyle}>submit</button>
            </div>
            <div className="actionText" style={divStyle}>
            {
              this.state.linkList.map(function(word, i) {
                word = word.replace(/~/gi, '');
                if (stopWordList.includes(word) || defaultPrepositions.includes(word)) { // word is a stopword or has already been grounded
                  return(" " + word + " ");
                } else {
                  return (
                    <button key={i} onClick={() => {this.link(i)}} className='btn btn-xs link-btn' style={btnStyle}>{word}</button>
                  );
                }
              },this)
            }
            </div>
            <div style={wrapStyle}>
              <b style={selectStyle}>{this.props.opdefaultValue}</b>
            </div>
          </div>
          );
      } else { // not editing and step 3
          return(
            <div style = {wrapStyle}>
              <div style={linkStyle}>
                <button ref="linkBtn" onClick={this.setLink} className='btn btn-xs link-btn' style={groundBtnStyle}>Ground to Story</button>
              </div>
              <div style = {wrapStyle}>
                <div className="actionText" style={divStyle}>
                {
                  this.props.adefaultValue.split(" ").map(function(word, i) {
                    var colStyle = {color: this.state.colors[i]}
                    word = word.replace(/~/gi, '');
                    return(<span key={i} style={colStyle}>{word} </span>);
                  },this)
                }
                </div>
                <b style={selectStyle}>{this.props.opdefaultValue}</b>
              </div>
            </div>
          );
      }
    }
  }
});

/*
React component for complete rule premise -> consequence
*/
var RuleComponent = React.createClass({
  getInitialState: function() {
    return { editing: true,
             actions: [],
             ops:[],
             linking: false }
  },

  edit: function() {
    this.props.toggleEdit();
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={-1}/>, document.getElementById('footer-instructions'));
    this.setState({editing: true});
  },

  remove: function() {
    if (this.props.numPreds > 0) {
      console.log('removing predicate');
      this.props.removePredicate(this.props.index);
    } else {
      alert("Must provide at least one implication.");
      return false;
    }
  },

  save: function() {
    console.log("saving predicate");
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={9} />, document.getElementById('footer-instructions'));
    var actions = [];
    var ops = [];
    for(var ref in this.refs) {
      if(ref.includes('action')) {
        actions.push(this.refs[ref].getAction());
        ops.push(this.refs[ref].getOp());
      }
    }
    
    var consequence = this.refs.consequence.getData();
    var consequencePredicate = consequence['cPredicate']
    var consequenceSubject = consequence['cSubject']
    var consequenceObject = consequence['cObject']

    if(this.props.index > 0 && consequencePredicate=="" && consequenceSubject=="" && consequenceObject=="" && actions.join().trim() == "") { // discard empty inference rules
      this.props.toggleEdit();
      this.setState({editing: false});
      this.remove();
      return false;
    }
    for (var i=0;i<actions.length;i++) {
      var aContent = actions[i].split(" ");
      if(aContent.length < 3 || consequenceSubject == "" || consequenceObject == "" || consequencePredicate == "") { // partially complete form
        alert("Can't leave empty fields in premise");
        return false;
      }
    }
    this.props.toggleEdit();
    this.props.updatePredicate(actions, ops, consequenceSubject + " " + consequencePredicate + " " + consequenceObject, this.props.index);
    this.setState({editing: false});
  },
  
  resetRule: function() {
    console.log('reset rule')
  },

  addPremise: function() {
    console.log("adding premise");
    var actions = this.state.actions;
    actions.push("");
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={2} />, document.getElementById('footer-instructions'));
    this.setState({actions: actions});
    this.props.addPremise(this.props.index);
  },
  
  removePremise: function(i) { // ith premise
    console.log("removing premise");
    this.props.removePremise(this.props.index,i);
  },

  addLink: function(i, j, grounding,c) { // jth word of ith action and color
    this.props.addLink(this.props.index, i, j, grounding, c);
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
    ReactDOM.render(<FooterInstructionComponent step={2} substep={1} r={1} />, document.getElementById('footer-instructions'));
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
    var editBtnStyle = { display: 'inline-block', margin: 5, backgroundColor:'#008CBA' };
    var removeBtnStyle = { display: 'inline-block', margin: 5, backgroundColor:'red' };
    var btnStyle = { display: btnVisibility, margin: 5};
    var font = { fontSize: 50}

    if(this.props.step==2) {
      return (
        <div className='predicate'>
        <div><b>{'Logical rule ' + (this.props.index+1) + ':'}</b></div>
        <div className='premise-container' style={divStyle}>
        {
          this.props.act.map(function(action, i) {
            return (
              <PremiseComponent
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
              </PremiseComponent>
              );
          }, this)
        }
        </div>
        <b>implies</b>
        <ConsequenceComponent
          ref="consequence"
          cons={this.props.cons}
          step={this.props.step}
          addLink={this.addLink}
          selectedText={this.props.selectedText}
          contextLinks={this.props.contextLinks[20]}
          toggleLink={this.setLink}
          alreadyLinking={this.state.linking}
          linkToggle = {this.props.linkToggle}>
        </ConsequenceComponent>
        <hr></hr>
        </div>
      );
    } else {
      if(this.props.edit == true) {
        return (
          <div className='predicate'>
          <div><b>{'Logical rule ' + (this.props.index+1) + ':'}</b></div>
          <div className='premise-container' style={divStyle}>
          {
            this.props.act.map(function(action, i) {
              return (
                <PremiseComponent
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
                </PremiseComponent>
                );
            }, this)
          }
          </div>
          <b>implies</b>
          <ConsequenceComponent
            ref="consequence"
            cons={this.props.cons}
            step={this.props.step}
            addLink={this.addLink}
            selectedText={this.props.selectedText}
            contextLinks={this.props.contextLinks[20]}>
          </ConsequenceComponent>
          <hr></hr>
          </div>
          );
      } else {
        return (
          <div className='predicate'>
          <div><b>{'Logical rule ' + (this.props.index+1) + ':'}</b></div>
          <div className='premise-container' style={divStyle}>
          {
            this.props.act.map(function(action, i) {
              return (
                <PremiseComponent
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
                </PremiseComponent>
                );
            }, this)
          }
          </div>
          <b>implies</b>
          <ConsequenceComponent
            ref="consequence"
            cons={this.props.cons}
            step={this.props.step}
            edit={this.state.editing}
            addLink={this.addLink}
            selectedText={this.props.selectedText}
            contextLinks={this.props.contextLinks[20]}>
          </ConsequenceComponent>
          <button onClick={this.edit} className='btn btn-xs edit-predicate-btn' style={editBtnStyle}>Edit Rule</button>
          <button onClick={this.remove} className='btn btn-xs remove-predicate-btn' style={removeBtnStyle}>Remove Rule</button>
          <hr></hr>
          </div>
          );
        }
      }
  },

  renderForm: function() {
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
    var inlineBlock = { marginLeft:10 };
    var saveBtnStyle ={ marginLeft:10, backgroundColor:'#008CBA'  };
    var btnStyle = { display: 'inline-block', marginLeft: 5, marginRight:-10, backgroundColor:'#4CAF50' };
    var wrapStyle = { display: 'inline-block' };
    
    var consequenceSubjectDefault = this.props.cons.split(" ")[0];
    var consequencePredicateDefault = this.props.cons.split(" ").slice(1, -1).join(" ");
    var consequenceObjectDefault = this.props.cons.split(" ").slice(-1)[0];

    return (
      <div className='predicate'>
        <div><b>{'Logical rule ' + (this.props.index+1) + ':'}</b></div>
        <button onClick={this.addPremise} className='btn btn-xs add-variable-btn' style={btnStyle}>Add Premise</button>
        <span className='premise-container' style={inlineBlock}>
        {
          this.props.act.map(function(action, i) {
            return (
              <PremiseComponent
                key={i}
                index={i}
                predicateIndex={this.props.index}
                consList={this.props.consList}
                numActions={this.props.act.length}
                adefaultValue={action}
                opdefaultValue={this.props.op[i]}
                edit={this.state.editing}
                ref={'action'+i}
                addLink={this.addLink}
                contextLinks={this.props.contextLinks[i]}
                selectedText={this.props.selectedText}
                step={this.props.step}
                removePremise={this.removePremise}>
              </PremiseComponent>
              );
          }, this)
        }
        </span>
        <span><b>implies&nbsp;&nbsp;</b></span>
        <ConsequenceComponent
          ref="consequence"
          cons={this.props.cons}
          step={this.props.step}
          edit={this.state.editing}
          addLink={this.addLink}
          selectedText={this.props.selectedText}
          consequenceSubjectDefault = {consequenceSubjectDefault}
          consequencePredicateDefault = {consequencePredicateDefault}
          consequenceObjectDefault = {consequenceObjectDefault}
          contextLinks={this.props.contextLinks[20]}>
        </ConsequenceComponent>
        <button onClick={this.save} className='btn btn-xs save-predicate-btn' style={saveBtnStyle}>Save</button>
        <button onClick={this.resetRule} className='btn btn-xs save-predicate-btn' style={saveBtnStyle}>Reset</button>
        <hr></hr>
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
    var predicates = [  // overall state of the hit
                        [ // predicates
                          [""],[""], "", [[],[]] // action list, op list, consequence, list of groundings- per word
                        ]
                      ];
    predicates[0][3][20] = [""];
    return {
      predicates: predicates,
      consList: [],           // consequence list
      story: [document.getElementById("story").value,"",""], // story, ending
      linkToggle: false,      // toggle depending on link state
      step: 0,                // hit step
      edit: true,             // are we editing a rule?
      stepBtn: true
    }
  },

  removePredicate: function (i) {
    console.log('removing rule ' + i);
    var predicates = this.state.predicates;
    predicates.splice(i, 1);
    var consequences = this.state.consList;
    consequences.splice(i,1);
    this.setState({consList: consequences});
    this.setState({predicates: predicates});
  },

  updatePredicate: function(actions,ops,consequence,i) { // predicate is a tuple of array of variables and an implication jth action, ith consequence
    console.log('updating comment ' + i);
    var predicates = this.state.predicates;
    var consequences = this.state.consList;
    predicates[i][0] = actions;
    predicates[i][1] = ops;
    predicates[i][2] = consequence;
    consequences[i] = consequence;
    this.setState({predicates: predicates});
    this.setState({consList: consequences});
    //globalState[this.props.index] = this.state.predicates;
  },

  addPredicate: function() {
    var predicates = this.state.predicates;
    predicates.push([[""],[""],"",[[],[]]]);
    predicates[predicates.length-1][3][20] = [""];
    this.toggleEdit();
    this.setState({predicates: predicates});
  },

  addPremise: function(i) {
    console.log('adding premise');
    var predicates = this.state.predicates;
    predicates[i][0].push("");
    predicates[i][1].push("");
    predicates[i][3].push([[]]);
    predicates[i][3][predicates[i][3].length-20] = [""]; // TODO: fix
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={1} />, document.getElementById('footer-instructions'));
    this.setState({predicates:predicates});
  },
  
  removePremise: function(i, j) { // ith rule, jth premise
    console.log('removing premise: ' + i);
    var predicates = this.state.predicates;

    if (predicates[i][0].length == 1) {
      alert('Rule requires at least one premise.');
      return(1);
    }
    predicates[i][0].splice(j, 1);
    predicates[i][1].splice(j, 1);
    predicates[i][3].splice(j, 1);
    predicates[i][3].splice(j, 1);
    
    this.setState({predicates:predicates});
  },

  addLink: function(i,j,k, grounding ,c) { // ground kth word of the jth action of the ith rule and color
    console.log('grounding element');
    var predicates = this.state.predicates;
    predicates[i][3][j][k] = [grounding,c]; // error here
    this.setState({predicates: predicates});
    ReactDOM.render(<ContextBoard predicates={predicates}></ContextBoard>, document.getElementById('grounding-container'));
  },
  
  toggleLink: function() {
    var l = this.state.linkToggle;
    this.setState({linkToggle: !l});
  },
  
  toggleEdit: function() {
    var ed = this.state.edit;
    ed = !ed;
    this.setState({edit: ed});
  },

  nextStep: function() {
    console.log('next step');
    $('#submit-btn').prop('disabled', false);
    var s = this.state.step;
    if(s == 0) {
      if(this.state.story[1] == "") {
        alert('Please select an ending from the two provided.');
        return(1);
      }
      s = s+1;
    } else if (s == 1) {
      if(this.state.consList.length < 1) {
        alert('Please create one rule before continuing.');
        return(1);
      } else {
        if(this.state.edit == true) {
          alert('please finish editing all rules before continuing.');
          return(1);
        }
      }
      s = s+1;
      if(s > 1) {
        document.getElementById('context-title').style.display="inline-block";
        document.getElementById('grounding-container').style.display="inline-block";
      }
    }
    this.setState({step: s});
    ReactDOM.render(<FooterInstructionComponent step={s} substep={1} r={0} />, document.getElementById('footer-instructions'));
  },

  prevStep: function() {
    console.log('prev step');
    var s = this.state.step;
    if (s > 0) {
      s = s-1;
    }
    if (s < 2) {
      document.getElementById('context-title').style.display="none";
      document.getElementById('grounding-container').style.display="none";
      //this.setState({stepBtn:!this.state.stepBtn});
    }
    this.setState({step: s});
    ReactDOM.render(<FooterInstructionComponent step={s} substep={1} r={1} />, document.getElementById('footer-instructions'));
  },
  
  e1Click: function() { // user clicks ending 1
    this.refs.e1.disabled = true;
    this.refs.e2.disabled = false;
    var e = document.getElementById("story-ending").value;
    var s = this.state.story;
    s[1] = e;
    s[2] = "2";
    this.setState({story: s});
  },
  
  e2Click: function() { // clicks ending 2
    this.refs.e2.disabled = true;
    this.refs.e1.disabled = false;
    var e = document.getElementById("story-ending2").value;
    var s = this.state.story;
    s[1] = e;
    s[2] = "1";
    this.setState({story: s});
  },
  
  render: function() {
    var nextBtnStyle = { display: 'inline-block', marginRight: 10 };
    var prevBtnStyle = { display: 'inline-block', marginRight: 10 };
    var newRuleBtnStyle = {display: 'inline-block',marginLeft: 5, backgroundColor: '#4CAF50'};
    var predicateStyle = {};
    if(this.state.step==0) {
      ReactDOM.render(<FooterInstructionComponent step={0} substep={1} r={1} />, document.getElementById('footer-instructions'));
    }
    else if(this.state.step==1) {
      predicateStyle['display'] = 'inline-block';
      nextBtnStyle['display'] = 'inline-block';
      newRuleBtnStyle['display'] = 'inline-block';
    } else if(this.state.step==2) {
      if(this.state.linkToggle == true) {
        this.refs.prevStep['disabled'] = true;
      } else {
        this.refs.prevStep['disabled'] = false;
      }
      predicateStyle['display'] = 'inline-block';
      nextBtnStyle['display'] = 'none';
    }
    if(this.state.step != 1) {
      newRuleBtnStyle['display'] = 'none'
    }
    
    if(this.props.index == this.props.i_x) {
      if(this.state.step==0) {
        if(this.state.story[2] != "") {
          document.getElementById("ending1").style.display="block";
          document.getElementById("ending2").style.display="block";
        }
        return(
          <div className="predicates">
            <div className="row">
              <SubHeaderInstructionComponent step={this.state.step} />
            </div>
            <div className="row">
              <div className="col-md-4 col-md-offset-4 text-center">
                <button ref={'e1'} onClick={this.e1Click} style={nextBtnStyle} className='btn step-fwd-btn btn-primary'>Ending 1</button>
                <button ref={'e2'} onClick={this.e2Click} style={nextBtnStyle} className='btn step-fwd-btn btn-primary'>Ending 2</button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-md-offset-4 text-center">
                <button ref={'nextStep'} onClick={this.nextStep} style={nextBtnStyle} disabled={!this.state.stepBtn} className='btn step-fwd-btn btn-primary'>Next Step</button>
              </div>
            </div>
          </div>
        );
      } else {
        document.getElementById("ending1").style.display="none";
        document.getElementById("ending2").style.display="none";
        document.getElementById("story").value = this.state.story[0] + " " + this.state.story[1];
        return(
          <div className="predicates">
            <div className="row">
              <SubHeaderInstructionComponent step={this.state.step} />
            </div>
            <div className="row">
              <button ref='addBtn' onClick={this.addPredicate} className='btn btn-s add-predicate-btn' style={newRuleBtnStyle}>Add New Rule</button>
            </div>
            <div style={predicateStyle}>
            {
              this.state.predicates.map(function(predicate, i) {
                return (
                  <RuleComponent
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
                    addPremise={this.addPremise}
                    addLink={this.addLink}
                    selectedText={this.props.selectedText}
                    step={this.state.step}
                    linkToggle={this.state.linkToggle}
                    linkToggler={this.toggleLink}
                    toggleEdit={this.toggleEdit}
                    edit={this.state.edit}
                    removePremise={this.removePremise}>
                  </RuleComponent>
                  );
              }, this)
            }
            </div>
            <div className="row">
              <div className='col-md-8 col-md-offset-2 text-center'>
                <b id='context-title' style={{display: "none"}}><h4>Story Grounding</h4></b>
                <br></br>
                <div id='grounding-container'></div>
              </div>
              <hr></hr>
            </div>
            <div className="row">
              <div className="col-md-4 col-md-offset-4 text-center">
                <button ref={'prevStep'} onClick={this.prevStep} style={prevBtnStyle} disabled={!this.state.stepBtn} className='btn step-fwd-btn btn-primary'>Previous Step</button>
                <button ref={'nextStep'} onClick={this.nextStep} style={nextBtnStyle} disabled={!this.state.stepBtn} className='btn step-fwd-btn btn-primary'>Next Step</button>
              </div>
            </div>
          </div>
          );
        }
    } else {
      return(false);
    }
  }
});

/*
Displays the story logic-context link state
*/
var ContextBoard = React.createClass({
  render: function() {
    var contextStyle = {textAlign: 'left'};
    return(
      <div className="contexts" style={contextStyle}>
      {
        this.props.predicates.map(function(predicate, i) { // ith predicate
          return (
            predicate[3].map(function(action,j) { //jth action
              return(
                action.map(function(mapping,k){ //kth word
                  var colorStyle = {color: mapping[1]};
                  if(mapping != "") {
                    if(j==20){ // if consequence
                      return(
                        <div style={colorStyle}>  {"In predicate "+(i+1) + ", the consequence on the right-hand-side" + ", you mapped: word " + (k+1) +"("+predicate[2].split(" ")[k]+") -> "+mapping[0]} </div>
                        );
                    } else {
                      return(
                        <div style={colorStyle}>  {"In predicate "+(i+1) + ", the premise " +(j+1) + " on the left-hand-side, you mapped: word: " + (k+1) +"("+predicate[0][j].split(" ")[k]+"): -> "+mapping[0]} </div>
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

window.PredicateManager = PredicateManager;