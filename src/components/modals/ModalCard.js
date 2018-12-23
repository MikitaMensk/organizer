import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ModalCard extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
             title: 'title',
             text: 'Text',
             color: ''
        };
        this.state = this.initialState;
    }

    retrieveTitleValue = event => {
      let value = event.target.value;
      return value;
    }

    handleChange = event => {
        const {name, value} = event.target;
        console.log(name,value);
        this.setState({
            [name] : value
        });
    }

    submitForm = () => {
      this.props.handleSubmit(this.state);
      this.setState(this.initialState);
    }

    render() {

        const { title, text } = this.state;

        if(!this.props.show) {
          return null;
        }


        return (
            <div className="modal" id="modal" data-column="0" data-card="0" data-type="">
              <button onClick={this.props.onClose} className="close-modal">
                Close
              </button>
              <input type="text" placeholder={this.props.title} value={title} className="text-field" name="title" id="title" onChange={this.handleChange} />
              <textarea type="text" rows="7" placeholder={this.props.text} value={text} className="text-area" name="text" id="text" onChange={this.handleChange}></textarea>
              <select id="color-select" name="color" onChange={this.handleChange}>
                  <option value="#faebd7">--Please choose a color--</option>
                  <option value="#7FDBFF">Blue</option>
                  <option value="#3D9970">Green</option>
                  <option value="#FF4136">Red</option>
                  <option value="#FF851B">Yellow</option>
                  <option value="#0074D9">Darkblue</option>
              </select>
              <button type="button" className="submit" id="submit" onClick={this.submitForm}>Добавить</button>
            </div>
        )
    }
}

ModalCard.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default ModalCard;
