/*
React component containing sub-header instructions
*/
var SubHeaderInstructionComponent = React.createClass({
  getInitialState: function() {
    var inst = []
    inst.push('READ the story and the provided endings.')
    inst.push('Given the above endings, choose an ending that fits the story best.')
    return{ instructions: inst } // step, substep, highlight step
  },
  
  render: function() {
    var header = ""; // Instruction header
    var instructions = []; // List of instruction bullets
    if(this.props.step==0) {
      header = "Choose the correct ending";
      instructions = ["Make sure you select the correct ending before continuing."];
    } else if(this.props.step==1) {
      header = "Add general logical rules";
      instructions = ["Construct one rule at a time. You can add a new rule after you 'save' the first one.","Each rule can have multiple premises on the left-hand-side, you can add new premises by clickling on 'Add Premise'.", "For each premise, Choose an approporiate 'subject' and an 'object' from the drop down list (you can also write your own subject and object. If 'object' does not apply, choose '-') and type the action in text field.", "There is one cosequence for each rule, for which you should choose an approporiate 'subject' and an 'object' and type the action in text field.", "Save the logical rule by clicking \'Save Rule\'.", "The consequence of each rule you save, becomes available as one of the left-hand-side premises of any new rule you might add.", "Make sure you have created all the logical rules you need for your explanation before continuing."];
    } else if(this.props.step==2) {
      header = "Ground your rules to the story";
      instructions = ["Start grounding your premise elements by clicking the \'Ground to Story\' button.", "Simply select a word from the premise that you want to ground by simply clicking on it.  Then scroll up to the `story' and highlight the word/phrase with your mouse. This word/phrase will be copied as your grounding.", "Then Click the \'Submit\' button to save this mapping.","Continue the above until you have grounded all the characters, items, and concepts from the rules to the story."];
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
