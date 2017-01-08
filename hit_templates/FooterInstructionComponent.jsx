/*
React component containing instructions
*/
var FooterInstructionComponent = React.createClass({
  getInitialState: function() {
    var instructions = [] // list of instructions
    instructions.push('READ the story and provided ending.')
    instructions.push('Given the above endings, choose an ending that fits the story best.')
    return{ instructions: instructions, step: 0, substep: 0, r:1, minimized:false } // step, substep, r is the current highlighted step
  },
  
  componentWillReceiveProps(nextProps) {
    var instructions = []
    if(nextProps.step == 0) {
      instructions.push('READ the story and provided ending.');
      instructions.push('Given the above endings, choose an ending that fits the story best.');
    } else if(nextProps.step == 1) {
        if(nextProps.substep == 1) {
          instructions.push('READ the story and provided ending.')
          instructions.push('SELECT a subject placeholder from the dropdown list.')
          instructions.push('SELECT an object placeholder from the dropdown list.')
          instructions.push('TYPE a predicate - how does the subject interact with the object?')
          instructions.push('ADD a new premise if necessary OR CONSTRUCT a consequence.')
          instructions.push('CONSTRUCT a consequence - the result of the sequence of premises constructed?')
          instructions.push('SAVE the rule by clicking the \'save rule\' button.')
          instructions.push('CONTINUE by clicking the \'next step\' button. \n OR add a new rule.')
        }
    } else if(nextProps.step == 2) {
      if(nextProps.substep == 1) {
        instructions.push('SELECT a premise or implication to ground to the story by clicking the associated \'ground to story\' button.')
        instructions.push('SELECT an element of the phrase to ground.')
        instructions.push('HIGHLIGHT a ground-word or ground-phrase in the story and SUBMIT the grounding.')
        instructions.push('REPEAT steps 1 through 4 for all necessary premises/implications.')
      }
    }
    this.setState({instructions:instructions})
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
