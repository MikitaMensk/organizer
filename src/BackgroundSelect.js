import React, {Component} from 'react';

class BackgroundSelect extends Component {    
    
    changeBackground() {
        let backPicture = document.getElementById('background-select');
        let backValue = backPicture.value;
        let backElement = document.getElementsByClassName('container')[0];
        backElement.className = 'container';
        backElement.className = 'container '+backValue;
    }
    
    render() {
        return (
            <select id="background-select" onChange={() => this.changeBackground()}>
              <option value="">--Please choose an image--</option>
              <option value="Chrysanthemum">Chrysanthemum</option>
              <option value="Desert">Desert</option>
              <option value="Hydrangeas">Hydrangeas</option>
              <option value="Jellyfish">Jellyfish</option>
              <option value="Koala">Koala</option>
              <option value="Lighthouse">Lighthouse</option>
              <option value="Penguins">Penguins</option>
              <option value="Tulips">Tulips</option>
          </select>
        );
    }
}

export default BackgroundSelect;