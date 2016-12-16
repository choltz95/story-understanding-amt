/*
React component containing instructions
*/
var InstructionComponent = React.createClass({
  getInitialState: function() {
    return { minimized: false }
  },
  
  minMaximize: function() {
    var m = !this.state.minimized;
    this.setState({minimized: m});
  },
  
  render: function() {
    /*
    Instruction color styling
    */
    var bStyle = {color: 'blue'},
        rStyle = {color: 'red'},
        pStyle = {color: 'purple'},
        gStyle = {color: 'green'},
        oStyle = {color: 'orange'},
        yStyle = {color: 'yellow'},
        mStyle = {color: 'magenta'},
        olStyle = {color: 'olive'}
    
    var instructionStyle = {border: "1px solid black", marginTop: 15};
    var ulStyle = {textAlign: 'left'};
    var headerStyle = {display: 'inline-block', textAlign: 'center', marginLeft: 15};
    var btnStyle = {marginLeft: 5};
    var paragraphStyle = {marginRight: 30, marginLeft: -5};
    var divStyle = {paddingTop: 15};
    
    if(this.state.minimized == true) {
      return(
        <div style={instructionStyle}>
            <h4 style = {headerStyle}><span style={{'fontWeight': 'bold'}}>Instructions and Examples</span></h4>
            <button onClick={this.minMaximize} className='btn btn-xs' style={btnStyle}>SHOW</button>
        </div>
      );
    }  else {
      return(
        <div style={instructionStyle}>
          <h4 style = {headerStyle}><span style={{'fontWeight': 'bold'}}>Instructions and Examples</span>[Please read CAREFULLY]</h4>
          <button onClick={this.minMaximize} className='btn btn-xs' style={btnStyle}>HIDE</button>
          <ul>
            <p style={paragraphStyle}>
            <b><u>Imagine that you want to <span style={rStyle}>explain to a 6-year old kid why a short story ends in the way it does</span></u></b> as opposed to having a different conclusion. <b><u>Your task is to derive and ground general logical rules from the story</u></b> to explain why an arbitrary fifth-sentence ending logically follows a four-sentence story. Your logical rules are the basic logical reasoning that we all do on a daily basis: it has a few <b>left-hand-side premises</b> which imply <b>some right-hand-side consequence.</b>
            </p>
            <h4><span style={{'fontWeight': 'bold'}}>Your task has three steps:</span></h4>
			
			
			<li><b>Step 1- Choose the correct ending:</b> You will be shown two alternative endings to the story. Choose the one that you think is the right ending to the story.
			</li>
			
            <li><b>Step 2- Add a few general logical rules:</b> You should add a few general rules which logically explain your choice of ending in the previous step. Each rule is composed of a few left-hand-side premises and one right-hand-side consequence. Your rules should be as <b>general</b> as possible, something that is generally true no matter what the details of the story. You will add each rule in two steps:
              <ul style = {ulStyle}>
                <li><i><b>Step 2.1, construct the left-hand-side of the 'implies' symbol (=>)</b>: Here you can construct one or a few premises. For each presmise you should select a subject</i>, <i>write</i> a predicate, and then <i>select</i> an object.
				</li>
                <li>
				<i><b>Step 2.2, construct the right-hand-side of the 'implies' symbol (=>)</b>:</i>
				Here you should construct one consequence. For the consequence, you should select a subject, <i>write</i> a predicate, and then <i>select</i> an object.
				</li>
              </ul>
			</li>
			           
            <li><b>Step 3- Ground your general logical rules to the story:</b> You should ground your generic rules from previous step to the story in order to make them specific. You will do this by linking parts of your logical rules to the phrases in either the story or the given ending of the story.
			</li>
			
            <p style={paragraphStyle}>Properties of good rules and groundings are provided below.</p>
            
			
            <h4><span style={{'fontWeight': 'bold'}}>Consider the following example:</span></h4>
            <p><b>Story Context:</b> "It was Karen's final performance in marching band. Karen was playing the snare drum in the band. She played Thriller and Radar Love. The performance was flawless."</p>
            <p><b>Ending 1:</b> "She was very proud of her performance."</p>
			<p><b>Ending 2:</b> "She was really ashamed of how it went."</p>
			
			<li><b>Step 1- Choose the correct ending: </b>Here clearly Ending 1 is the right ending, so choose that.</li>
			<li><b>Step 2- Add a few general logical rules: </b>
			<u>Logical rules are very generic rules (without any specific elements of the story)</u>, that you connect together for logically explaining your choice of ending. For this example, only one logical rule can explain the choice of ending. However, <u>you can use multiple rules and chain them together whenever needed</u>.</li>
			
              <ul style = {ulStyle}>
                <li>

				<span style={mStyle}>(Someone</span> plays in <span style={rStyle}>something</span>) <b>and</b> (<span style={rStyle}>something</span> was flawless) <b> implies </b> (<span style={mStyle}>someone</span> is proud of <span style={rStyle}>something</span>)
				
				</li>
              </ul>
             
			<li><b>Step 3- Ground your general logical rules to the story: </b>
			Now for each logical rule, <u>try to make it specific for this story by grounding generic terms to the story terms</u>. You should try to <u>map all the characters, items, and concepts to the original story as much as possible</u>.</li>
              <ul style = {ulStyle}>
                <li><span style={mStyle}>someone -> Karen</span></li>
				<li><span style={rStyle}>something -> Performance</span></li>
              </ul>
          </ul>
        </div>
      );
    }
  }
});
window.InstructionComponent = InstructionComponent;
