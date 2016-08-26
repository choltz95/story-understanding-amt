      /*log('adding predicate');
          this.props.addVariable();
        },

        render: function() {
          var divStyle = { display: 'inline-block', margin: 5 };
          return (<div className="actionText" style={divStyle}>{this.props.action}</div>);
        }
      });*/

      var PredicateComponent = React.createClass({
        getInitialState: function() {
          return { editing: true, predicates: [""] }
        },

        edit: function() {
          this.setState({editing: true});
        },

        remove: function() {
          if (this.props.index != 0) {
            console.log('removing predicate');
            this.props.removePredicate(this.props.index);
          } else {
            return;
          }
        },

        save: function() {
          console.log("saving predicate");
          var action = this.refs.action.value.trim();
          var consequence = this.refs.consequence.value.trim();
          if(action == "" || consequence == "") {
            return;  
          } else {
            console.log(action);
            this.props.updatePredicate(action,consequence,this.props.index);
            this.setState({editing: false});
          }
        },

        addVariable: function() {
          console.log("adding variable");
        },        

        add: function() {
          console.log('adding predicate');
          this.props.addPredicate();
        },

        renderNormal: function() {
          var btnVisibility = ""
          if(this.props.index==this.props.numPreds-1) {
            btnVisibility="inline-block";
          } else {
            btnVisibility="none";
          }
          var divStyle = { display: 'inline-block', margin: 5 };
          var btnStyle = { display: btnVisibility, margin: 5 }; //prop todo 
          return (
            <div className='predicate'>
              <div className="actionText" style={divStyle}>{this.props.act}</div>
              <select>
                <option value="==>">==&gt;</option>
                <option value="&&">&&</option>
                <option value="||">||</option>
              </select>
              <div className='consequenceText' style={divStyle}>{this.props.cons}</div>
                <button onClick={this.edit} className='btn btn-xs edit-predicate-btn' style={divStyle}>~</button>
                <button onClick={this.remove} className='btn btn-xs remove-predicate-btn' style={divStyle}>&#8211;</button>
                <button ref='addBtn' onClick={this.add} className='btn btn-xs add-predicate-btn' style={btnStyle}>+</button>
            </div> 
          );
        },

        renderForm: function() {
          var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
          return (
            <div className='predicate'>
              <button onClick={this.addVariable} className='btn btn-xs add-variable-btn'>+</button>
              <textarea ref='action' rows="1" maxLength="50" placeholder="action" defaultValue={this.props.act} style={divStyle}></textarea>
              <select>
                <option value="==>">==&gt;</option>
                <option value="&&">&&</option>
                <option value="||">||</option>
              </select>
              <textarea ref='consequence' rows="1" maxLength="50" placeholder="consequence" defaultValue={this.props.cons} style={divStyle}></textarea>
              <button onClick={this.save} className='btn btn-xs save-predicate-btn'>~</button>
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
        getInitialState: function() {
          return {
            predicates: [
              []
            ]
          }
        }, 

        removePredicate: function (i) {
          console.log('removing comment ' + i);
          var arr = this.state.predicates;
          arr.splice(i, 1);
          this.setState({predicates: arr});
        },

        updatePredicate: function(actions,consequence,i) { // predicate is a tuple of array of variables and an implication
          console.log('updating comment' + i);
          var arr = this.state.predicates;
          arr[i] = new Array(actions, consequence);
          this.setState({predicates: arr});
          console.log("current state: ");
          console.log(this.state.predicates);
        },

        addPredicate: function() {
          var arr = this.state.predicates;
          arr.push({"":""});
          this.setState({predicates: arr});
        },

        render: function() {
          return(
            <div className="pcontainer">
            {
              this.state.predicates.map(function(predicate, i) {
                return (
                  <PredicateComponent key={i} index={i} numPreds={this.state.predicates.length} act={predicate[0]} cons={predicate[1]} updatePredicate={this.updatePredicate} removePredicate={this.removePredicate} addPredicate={this.addPredicate}>
                  </PredicateComponent>
                );
              }, this)
            }
            </div>
          );
        }
      });

      ReactDOM.render(<PredicateManager />, document.getElementById('predicate-container'));