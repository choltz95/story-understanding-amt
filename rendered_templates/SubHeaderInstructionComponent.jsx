/*
React component containing sub-header instructions
*/
var SubHeaderInstructionComponent = React.createClass({
  getInitialState: function() {
    var inst = []
    inst.push('READ the story and provided ending.')
    inst.push('Given the above endings, choose an ending that fits the story best.')
    return{ instructions: inst } // step, substep, highlight step
  },
  
  render: function() {
    var header = ""; // Instruction header
    var instructions = []; // List of instruction bullets
    if(this.props.step==0) {
      header = "Add rules";
      instructions = ["Select one of the two endings that logically follows the context.", "Make sure you have selected the best ending before continuing.", "You will not be able to return to this step."];
    } else if(this.props.step==1) {
      header = "Add rules";
      instructions = ["Construct rules by specifying premises.", "Select a subject and object from the drop down lists and type a predicate implied in the story.", "Add premises by clicking the \'Add Premise\' button.", "Save the inference rule by clicking \'Save Rule\'.", "Make sure you have created all inference rules before continuing.", "You will not be able to return to this step."];
    } else if(this.props.step==2) {
      header = "Ground rules";
      instructions = ["Ground premise elements by clicking the \'Ground to Context\' button.", "Select a token from the premise and ground it to a word or phrase in the context or 5th sentence by highlighting the word/phrase with your mouse.", "Click the \'Submit\' button to save the link."];
    }
    return (
      <div className="col-md-4 col-md-offset-4 text-center">
        <h3><b>{"Step: " + (this.props.step+1) + " " + header}</b></h3>
        <ol >
        {
          instructions.map(function(bullet,i) {
            return(<li key={i}>{bullet}</li>);
          })
        }
        </ol>
      </div>
    );
  }
});
window.SubHeaderInstructionComponent = SubHeaderInstructionComponent;
