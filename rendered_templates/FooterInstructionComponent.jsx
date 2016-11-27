/*
React component containing instructions
*/
var FooterInstructionComponent = React.createClass({
  getInitialState: function() {
    var inst = []
    inst.push('READ the story and provided ending.')
    inst.push('Given the above endings, choose an ending that fits the story best.')
    return{ instructions: inst, step: 0, substep: 0, r:1, minimized:false } // step, substep, highlight step
  },
  
  componentWillReceiveProps(nextProps) {
    var inst = []
    if(nextProps.step == 0) {
      inst.push('READ the story and provided ending.');
      inst.push('Given the above endings, choose an ending that fits the story best.');
    } else if(nextProps.step == 1) {
        if(nextProps.substep == 1) {
          inst.push('READ the story and provided ending.')
          inst.push('SELECT a subject placeholder from the dropdown list.')
          inst.push('SELECT an object placeholder from the dropdown list.')
          inst.push('TYPE a predicate - how does the subject interact with the object?')
          inst.push('ADD a new premise if necessary.')
          inst.push('CONSTRUCT a consequence - the result of the sequence of premises constructed?')
          inst.push('SAVE the rule by clicking the \'save rule\' button.')
          inst.push('CONTINUE by clicking the \'next step\' button. \n OR add a new rule.')
        }
    } else if(nextProps.step == 2) {
      if(nextProps.substep == 1) {
        inst.push('SELECT a premise or implication to ground to the context by clicking the associated \'ground to context\' button.')
        inst.push('SELECT an element of the phrase to ground.')
        inst.push('HIGHLIGHT a ground-word or ground-phrase in the context and SUBMIT the grounding.')
        inst.push('REPEAT steps 1 through 4 for all necessary premises/implications.')
      }
    }
    this.setState({instructions:inst})
    // don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.step !== this.state.step) {
      this.setState({ step: nextProps.step });
    }
    if (nextProps.substep !== this.state.substep) {
      this.setState({ substep: nextProps.substep });
    }
    if (nextProps.r !== this.state.r) {
      this.setState({ r: nextProps.r });
    }
  },
  
  minMaximize: function() {
    var m = !this.state.minimized;
    this.setState({minimized: m});
  },
  
  render: function() {
    var instructionStyle = { width: 300, height:200 };
    var btnStyle = {marginLeft: 5};
    if(this.state.minimized == false) { // if minimized
      return(
        <div style={instructionStyle}>
          <b>Recommended Steps</b>
          <button onClick={this.minMaximize} style={btnStyle} className='btn btn-xs'>HIDE</button>
          <ol>
            {this.state.instructions.map(function(instruction, i){
              if(i == this.state.r) {
                return <li key = {i}><mark>{instruction}</mark></li>;
              } else {
                return <li key = {i}>{instruction}</li>;
              }
            },this)}
          </ol>
        </div>
      );
    } else {
      return(
        <div>
            <b>Recommended Steps</b>
            <button onClick={this.minMaximize} style={btnStyle} className='btn btn-xs'>SHOW</button>
        </div>
      );
    }
  }
});
window.FooterInstructionComponent = FooterInstructionComponent;
