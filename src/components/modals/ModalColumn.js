import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ModalColumn extends Component { 
    constructor(props) {
        super(props);
        this.initialStateColumn = {
             title: ''
        };
        this.state = this.initialStateColumn;
    }
    
    handleChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name] : value
        });
    }
    
    submitFormColumn = () => {
      this.props.handleSubmit(this.state);
      this.setState(this.initialStateColumn);
    }
        
    render() { 
        
        const { title } = this.state;
        
        if(!this.props.show) {
          return null;
        }
        
        return (
            <div className="modal" id="modal" data-column="0" data-card="0" data-type="">
              <button onClick={this.props.onClose} className="close-modal">
                Close
              </button>
              <input type="text" placeholder={this.props.title} value={title} className="text-field" name="title" id="title" onChange={this.handleChange} />

              <button type="button" className="submit" id="submitColumn" onClick={this.submitFormColumn}>Добавить колонку</button>
            </div>
        )
    }
}

ModalColumn.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default ModalColumn;