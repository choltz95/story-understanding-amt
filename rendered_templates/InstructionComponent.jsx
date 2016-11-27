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
          <h4 style = {headerStyle}><span style={{'fontWeight': 'bold'}}>Instructions and Examples</span></h4>
          <button onClick={this.minMaximize} className='btn btn-xs' style={btnStyle}>HIDE</button>
          <ul>
            <p style={paragraphStyle}>
            <b><u>Imagine that you want to describe to a 5-year old kid why a short story ends in the way it does</u></b> as opposed to having a different conclusion. <b><u>Your task is to derive and ground general inference rules from the context</u></b> to explain why an arbitrary fifth-sentence ending logically follows a four-sentence context. An inference rule has an easy basic logical reasoning that we all do on a daily basis: it has a few <b>left-hand-side premises</b> which result in (an implication) <b>some right-hand-side consequence.</b>  Please see below for more examples.
            </p>
            <h4>Your task has TWO steps:</h4>
            <li><b>1- Construct</b> some inference rules (Step 1) by:</li>
              <ul style = {ulStyle}>
                <li><i>Selecting a subject</i>, <i>writing</i> a predicate, and <i>selecting</i> an object on the left-hand-side of an implication-symbol</li>
                <li><i>Constructing</i> an implication to the right hand side</li>
              </ul>
            <p style={paragraphStyle}> Remember, your rules should be easily <b>derivable</b> from the context and should be focused on answering <b><i>why</i></b> the given fifth sentence is correct. Each rule should be composed of a <b>subject</b>, a <b>predicate</b>, and an <b>object</b> and should be as <b>general</b> as possible. Do not include specific elements from the context in your rule. To simplify the process, a number of sample objects/subjects are provided for you.</p>
           
            <li><b>2- Ground</b> these rules to the story to make them specific. Do this by linking terms to phrases in either the context or the given fifth sentence (Step 2).</li>
            
            <p style={paragraphStyle}>Properties of good rules and groundings are provided below.</p>
            
            <h4><span style={{'fontWeight': 'bold'}}>Example</span></h4>
            <h4>The given story is as follows:</h4>
            <li>Context: Karen was assigned a roommate her first year of college. Her roommate asked her to go to a nearby city for a concert. Karen agreed happily. The show was absolutely exhilarating.</li>
            <li>correct 5th sentence: Karen became good friends with her roommate. </li>
            <h4><span style={{'fontWeight': 'bold'}}>Step 1 (construct rules)</span></h4><p style={paragraphStyle}> - the rules you construct should follow logically from the context and ending.</p>
            <li>Good, generic inference rules for the above: </li>
              <ul style = {ulStyle}>
                <li><span style={bStyle}>Someone</span> is not friends with <span style={rStyle}>someone</span> <b>and</b> <span style={pStyle}>someone</span> goes out with <span style={gStyle}>someone</span> <b>and</b> <span style={oStyle}>someone</span> enjoys <span style={yStyle}>it</span> <b>=></b> <span style={mStyle}>someone</span> becomes friends with <span style={olStyle}>someone</span></li>
              </ul>
            <li>Bad inference rules: </li>
              <ul style = {ulStyle}>
                <li>Someone(Karen's roommate) asks out someone(Karen) <b>and</b> something(this show) was exhilarating <b>=></b> someone(roommate) agrees happily</li>
              </ul>
            <h4><span style={{'fontWeight': 'bold'}}>Step 2 (grounding elements)</span></h4><p style={paragraphStyle}> - The context and rule elements you link between should be logically related. You should associate characters, items, and ideas.</p>
            <li>Good links: </li>
              <ul style = {ulStyle}>
                <li><span style={bStyle}>someone -> Karen</span></li>
                <li><span style={rStyle}>someone -> Karen's roommate</span></li>
                <li><span style={pStyle}>someone -> Karen</span></li>
                <li><span style={gStyle}>someone -> Karen's roommate</span></li>
                <li><span style={oStyle}>someone -> Karen</span></li>
                <li><span style={yStyle}>it &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> going out</span></li>
                <li><span style={mStyle}>someone -> Karen</span></li>
                <li><span style={olStyle}>someone -> Karen's roommate</span></li>
              </ul>
            <li>Bad links: </li>
              <ul style = {ulStyle}>
                <li>someone  &nbsp;&nbsp;-> goes out</li>
                <li>something  -> becomes</li>
              </ul>
          </ul>
        </div>
      );
    }
  }
});
window.InstructionComponent = InstructionComponent;
