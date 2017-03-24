/*
React component containing sub-header instructions
*/
var SubHeaderInstructionComponent = React.createClass({
  getInitialState: function() {
    var instructions = []
    instructions.push('READ the story and the provided endings.')
    instructions.push('Given the above endings, choose an ending that fits the story best.')
    return{ instructions: instructions } // step, substep, highlight step
  },
  
  render: function() {
    var header = ""; // Instruction header
    var instructions = []; // List of instruction bullets
    if(this.props.step==0) {
      header = "Choose the correct ending";
      instructions = ["Make sure you select the correct ending before continuing."];
    } else if(this.props.step==1) {
      header = "Add general logical rules";
      instructions.push("Construct one rule at a time.");
      instructions.push("You can add a new rule after you 'save' the first one.");
      instructions.push("Each rule can have multiple premises on the left-hand-side, you can add new premises by clickling on 'Add Premise'.");
      instructions.push("There is one cosequence for each rule, for which you should choose an approporiate 'subject' and an 'object' and type the action in text field.");
      instructions.push("The consequence of each rule you save, becomes available as one of the left-hand-side premises of any new rule you might add.");
      instructions.push("See the 'recommended steps' tab for more specific instructions.");
    } else if(this.props.step==2) {
      header = "Ground your rules to the story";
      instructions.push("Grounding your premise elements to the text.");
      instructions.push("Select a word from the premise that you want to ground by simply clicking on it.  Then scroll up to the `story' and highlight the word/phrase with your mouse. This word/phrase will be copied as your grounding.");
      instructions.push("Then Click the 'Submit' button to save this mapping.");
      instructions.push("Continue the above until you have grounded all the characters, items, and concepts from the rules to the story.");
      instructions.push("See the 'recommended steps' tab for more specific instructions.");
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
