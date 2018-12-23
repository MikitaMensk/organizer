import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board';
import ModalColumn from './components/modals/ModalColumn';
import ModalCard from './components/modals/ModalCard';
import BackgroundSelect from './components/BackgroundSelect';

class App extends Component {

  state = {
        columns: [{
                'id': 0,
                'title': 'First',
                'cards': [{
                    'title': 'Sport',
                    'text': 'Chess competition',
                    'color': '#faebd7',
                    'emph': false,
                    'exp': false
                },{
                    'title': 'Flashmob',
                    'text': 'Potato eating',
                    'color': '#faebd7',
                    'emph': false,
                    'exp': false
                }]
            },
            {
                'id': 1,
                'title': 'Second',
                'cards': [{
                    'title': 'Concert',
                    'text': 'Bach music',
                    'color': '#faebd7',
                    'emph': false,
                    'exp': false
                }]
            },
            {
                'id': 2,
                'title': 'Third',
                'cards': [{
                    'title': 'Sport',
                    'text': 'Tennis competition',
                    'color': '#faebd7',
                    'emph':true,
                    'exp': false
                },{
                    'title': 'More than 350 symbols',
                    'text': 'Ut a nisi ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam sodales vel quam eget volutpat. Curabitur gravida est quis sagittis porttitor. Phasellus non euismod quam. In sodales enim mauris, et vehicula urna maximus in. Nulla blandit luctus rhoncus. Proin id ultricies nisl. Aenean malesuada enim vel dolor. Vivamus lobortis vestibulum. Nam placerat quam in nisi maximus, id blandit justo sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                    'color': '#faebd7',
                    'emph': false,
                    'exp': false
                }]
            },
            {
                'id': 3,
                'title': 'Fourth',
                'cards': [{
                    'title': 'Reading',
                    'text': 'The black arrow',
                    'color': '#faebd7',
                    'emph': false,
                    'exp': false
                },{
                    'title': 'Course',
                    'text': 'Dance on the floor',
                    'color': '#faebd7',
                    'emph': false,
                    'exp': false
                }]
        }],
        isOpen: false,
        isOpenColumn: false,
        modals: [{
            title: 'Title',
            text: 'Text',
            color: '#7FDBFF'
        }],
        modalColumn: [{
            title: 'Enter title of column'
        }],
  };

  componentDidMount() {
    window.addEventListener('load', this.handleLoad());
    this.updateCardText();
  }

  componentDidUpdate() {
    this.updateCardText();
  }

  handleLoad() {
    setInterval(() => this.recordRegularState(), 25000);
  }

  recordRegularState = () => {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  updateCardText() {
    const letterWidth = 350;
    const allCards = document.getElementsByClassName('card-text');
    for(var i = 0; i < allCards.length;i++){
      let allCardsText = allCards[i].innerText;
      let allCardsTrimText = this.trimText(allCardsText, letterWidth);
      allCards[i].innerText = allCardsTrimText;
    }
  }

 trimText(text,letterWidth){
    let trimString = text.slice(0, letterWidth);
    let stringLength = text.length;
    if(stringLength > letterWidth){
      trimString = trimString + '...';
    }
    return trimString;
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleModalColumn = () => {
    this.setState({
      isOpenColumn: !this.state.isOpenColumn
    });
  }

  addCard = (index, newCardobj) => {
      const { columns } = this.state;

      const arrayCopy = columns.slice();
      const thisColumn = arrayCopy[index];
      const cardList = thisColumn.cards;
      cardList.push(newCardobj);
      arrayCopy[index].cards = cardList;
      this.setState({
        columns: arrayCopy
    });
  }

  editCard = (columnIndex, cardIndex, newCardobj) => {
      const { columns } = this.state;
      const arrayCopy = columns.slice();

      arrayCopy[columnIndex].cards[cardIndex].title = newCardobj.title;
      arrayCopy[columnIndex].cards[cardIndex].text = newCardobj.text;
      arrayCopy[columnIndex].cards[cardIndex].color = newCardobj.color;
      arrayCopy[columnIndex].cards[cardIndex].exp = false;

      this.setState({
        columns: arrayCopy
      });
  }

  deleteCard = (cardIndex, e, columnIndex ) => {
      e.stopPropagation();

      const { columns } = this.state;
      const arrayCopy = columns.slice();
      const thisColumn = arrayCopy[columnIndex];
      const cardList = thisColumn.cards;
      const columnsLength = arrayCopy.length;
      cardList.splice(cardIndex,1);

      arrayCopy[columnIndex].cards = cardList;

      if(arrayCopy[columnsLength - 1].cards.length === 0){
          arrayCopy.splice(columnsLength - 1,1);
          this.setState({
              columns: arrayCopy
          });
      }
      else {
         this.setState({
            columns: arrayCopy
          });
      }
  }

  emphasizeCard = (cardIndex, e, columnIndex ) => {
      e.stopPropagation();

      const { columns } = this.state;
      const arrayCopy = columns.slice();
      const thisColumn = arrayCopy[columnIndex];
      const currentColumn = thisColumn.cards.slice();
      const emphCard = currentColumn[cardIndex];
      let emphCardStatus = emphCard.emph;

      if(emphCardStatus === true){
        emphCardStatus = false;
      }
      else {
        emphCardStatus = true;
      }

      for(let s = 0;s<arrayCopy.length;s++){
        for(let m = 0;m<arrayCopy[s].cards.length;m++){
          arrayCopy[s].cards[m].emph = false;
        }
      }

      arrayCopy[columnIndex].cards[cardIndex].emph = emphCardStatus;
      this.setState({
          columns: arrayCopy
      });
  }

  expandList = (cardIndex, e, columnIndex) => {
      e.stopPropagation();

      const { columns } = this.state;
      const arrayCopy = columns.slice();
      const currentColumn = arrayCopy[columnIndex].cards.slice();
      const expCard = currentColumn[cardIndex];
      let expCardStatus = expCard.exp;

      if(expCardStatus === true){
        expCardStatus = false;
      }
      else {
        expCardStatus = true;
      }

      for(let s = 0;s<arrayCopy.length;s++){
        for(let m = 0;m<arrayCopy[s].cards.length;m++){
          arrayCopy[s].cards[m].exp = false;
        }
      }

      arrayCopy[columnIndex].cards[cardIndex].exp = expCardStatus;
      this.setState({
        columns: arrayCopy
      });
  }

  addColumn = (modal) => {
      const { columns } = this.state;
      const arrayCopy = columns.slice();
      const nextColumnIndex = arrayCopy.length;
      const addindArray = {
          'id': nextColumnIndex,
          'title': modal.title,
          'cards': []
      };
      arrayCopy.push(addindArray);
      this.setState({
         columns: arrayCopy
      });
  }

  moveUp() {
      const { columns } = this.state;
      const arrayCopy = columns.slice();
      let emphasizedColumn =  0;
      let emphasizedCard =  0;

      for(let i = 0;i<arrayCopy.length;i++){
        for(let j = 0;j<arrayCopy[i].cards.length;j++){
          if(arrayCopy[i].cards[j].emph === true){
            emphasizedColumn =  i;
            emphasizedCard =  j;
          }
        }
      }
      const thisCard = arrayCopy[emphasizedColumn].cards[emphasizedCard];

      const previousCardIndex = emphasizedCard - 1;
      if(previousCardIndex >= 0){
        const previousCard = arrayCopy[emphasizedColumn].cards[previousCardIndex];
        arrayCopy[emphasizedColumn].cards[previousCardIndex] = thisCard;
        arrayCopy[emphasizedColumn].cards[emphasizedCard] = previousCard;

        this.setState({
            columns: arrayCopy
        });
      }
  }

  moveDown() {
      const { columns } = this.state;
      const arrayCopy = columns.slice();
      let emphasizedColumn =  0;
      let emphasizedCard =  0;

      for(let i = 0;i<arrayCopy.length;i++){
        for(let j = 0;j<arrayCopy[i].cards.length;j++){
          if(arrayCopy[i].cards[j].emph === true){
            emphasizedColumn =  i;
            emphasizedCard =  j;
          }
        }
      }
      const thisCard = arrayCopy[emphasizedColumn].cards[emphasizedCard];

      const nextCardIndex = emphasizedCard + 1;
      if(nextCardIndex < arrayCopy[emphasizedColumn].cards.length){
        const nextCard = arrayCopy[emphasizedColumn].cards[nextCardIndex];
        arrayCopy[emphasizedColumn].cards[nextCardIndex] = thisCard;
        arrayCopy[emphasizedColumn].cards[emphasizedCard] = nextCard;

        this.setState({
            columns: arrayCopy
        });
      }
  }

  moveLeft() {
      const { columns } = this.state;
      const arrayCopy = columns.slice();
      let emphasizedColumn =  0;
      let emphasizedCard =  0;

      for(let i = 0;i<arrayCopy.length;i++){
        for(let j = 0;j<arrayCopy[i].cards.length;j++){
          if(arrayCopy[i].cards[j].emph === true){
            emphasizedColumn =  i;
            emphasizedCard =  j;
          }
        }
      }
      const thisCard = arrayCopy[emphasizedColumn].cards[emphasizedCard];

      const previousColumnIndex = emphasizedColumn - 1;
      if(previousColumnIndex >= 0){
        arrayCopy[emphasizedColumn].cards.splice(emphasizedCard,1);

        arrayCopy[previousColumnIndex].cards.splice(emphasizedCard,0,thisCard);
        this.setState({
            columns: arrayCopy
        });
      }
  }

  moveRight() {
      const { columns } = this.state;
      const arrayCopy = columns.slice();
      let emphasizedColumn =  0;
      let emphasizedCard =  0;

      for(let i = 0;i<arrayCopy.length;i++){
        for(let j = 0;j<arrayCopy[i].cards.length;j++){
          if(arrayCopy[i].cards[j].emph === true){
            emphasizedColumn =  i;
            emphasizedCard =  j;
          }
        }
      }
      const thisCard = arrayCopy[emphasizedColumn].cards[emphasizedCard];

      const nextColumnIndex = emphasizedColumn + 1;
      if(nextColumnIndex < arrayCopy.length){
        arrayCopy[emphasizedColumn].cards.splice(emphasizedCard,1);

        arrayCopy[nextColumnIndex].cards.splice(emphasizedCard,0,thisCard);
        this.setState({
            columns: arrayCopy
        });
      }
  }

  modalInvoke = (columnIndex, type, cardIndex)  => {
      this.toggleModal();
      sessionStorage.setItem('column', columnIndex);
      sessionStorage.setItem('card', cardIndex);
      sessionStorage.setItem('type', type);
      if(type === 'EDIT'){
          const { columns } = this.state;
          const arrayCopy = columns.slice();
          const thisCard = arrayCopy[columnIndex].cards[cardIndex];
          let modalObj = {};
          modalObj.title = thisCard.title;
          modalObj.text = thisCard.text;
          modalObj.color = thisCard.color;
          thisCard.exp = false;

          this.setState({
              modals: [modalObj]
          });
      }
  }

  modalColumnInvoke = (columnIndex)  => {
      this.toggleModalColumn();
      sessionStorage.setItem('column-index', columnIndex);

      const { columns } = this.state;
      const arrayCopy = columns.slice();
      const thisColumn = arrayCopy[columnIndex];
      let modalObj = {};
      modalObj.title = thisColumn.title;

      this.setState({
         modalColumn: [modalObj]
      });
  }

  modalSubmit = modal => {
      const columnIndex = sessionStorage.getItem('column');
      const cardIndex = sessionStorage.getItem('card');
      const type = sessionStorage.getItem('type');

      if(type === 'ADD'){
        //this.setState({modals: [modal]});
        this.addCard(columnIndex, modal);
      }
      else if(type === 'EDIT'){
        //this.setState({modals: [modal]});
        this.editCard(columnIndex, cardIndex, modal);
      }

      this.toggleModal();
      sessionStorage.clear();
  }

  modalSubmitColumn = modal => {
      this.setState({modalColumn: [modal]});
      this.addColumn(modal);
      this.toggleModalColumn();
  }

  render() {

    const that = this;

    document.onkeydown = checkKey;
    function checkKey(e) {
        e = e || window.event;
        if (e.keyCode === 38) {
            that.moveUp();
        }
        else if (e.keyCode === 40) {
            that.moveDown();
        }
        else if (e.keyCode === 37) {
           that.moveLeft();
        }
        else if (e.keyCode === 39) {
           that.moveRight();
        }
        else if (e.keyCode === 13) {
            const { columns } = that.state;
            const arrayCopy = columns.slice();
            let emphasizedColumn =  0;
            let emphasizedCard =  0;
            for(let i = 0;i<arrayCopy.length;i++){
              for(let j = 0;j<arrayCopy[i].cards.length;j++){
                 if(arrayCopy[i].cards[j].emph === true){
                    emphasizedColumn =  i;
                    emphasizedCard =  j;
                 }
              }
           }
           that.modalInvoke(emphasizedColumn, 'EDIT', emphasizedCard);
        }

    }

    return (
      <div className="container">
        <header className="header">
          <button onClick={this.toggleModalColumn} className="add-button">Add column</button>
          <BackgroundSelect />
          <h2 className="title">Planning</h2><img className="logo" width="40" src={logo} alt="" />
        </header>

        <Board columnsData={this.state.columns} modalInvoke={this.modalInvoke} deleteCard={this.deleteCard} expandList={this.expandList} emphasizeCard={this.emphasizeCard}   />
        <ModalColumn show={this.state.isOpenColumn} onClose={this.toggleModalColumn} handleSubmit={this.modalSubmitColumn} title={this.state.modalColumn[0].title} />
        <ModalCard show={this.state.isOpen} onClose={this.toggleModal} handleSubmit={this.modalSubmit} title={this.state.modals[0].title} text={this.state.modals[0].text} />
      </div>
    );
  }

}
export default App;
