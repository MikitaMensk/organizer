import React, {Component} from 'react';


const Cards = (props) => {

    const cards = props.cardsList.map((row, index) => {

        return (
            <div className={row.emph ? 'card emphas' : 'card'} style={{backgroundColor: row.color}} key={index} onClick={(e) => props.emphasizeCard(index,e,props.columnId)}>
                <button className="expand-button" onClick={(e) => props.expandList(index,e,props.columnId)}>...</button>
                <ul className={row.exp ? 'expand-list exp' : 'expand-list'}>
                    <li className={'menuBean'} onClick={(e) => props.deleteCard(index,e,props.columnId)}>Delete</li>
                    <li className={'menuBean'} onClick={(e) => props.modalInvoke(props.columnId,'EDIT',index)}>Edit</li>
                </ul>
                <h4 className='card-name'>{row.title}</h4>
                <p className='card-text'>{row.text}</p>

            </div>
        );
    });

    return (
       <div>
            {cards}
       </div>
    );

}

const Columns = (props) => {

    const columns = props.columnsData.map((row, index) => {

        return (
            <div className='column' key={index}>
                <h3>{row.title}</h3>
                <Cards columnId={row.id} cardsList={row.cards} modalInvoke={props.modalInvoke} emphasizeCard={props.emphasizeCard} expandList={props.expandList} deleteCard={props.deleteCard} />
                <button onClick={() => props.modalInvoke(index,'ADD')}>Add card</button>
            </div>
        );

    });

    return (
        <div className='column-wrap'>
            {columns}
        </div>
    );

}

class Board extends Component {

    render() {

        const columnsData = this.props.columnsData;
        const modalInvoke = this.props.modalInvoke;
        const deleteCard = this.props.deleteCard;
        const emphasizeCard = this.props.emphasizeCard;
        const expandList = this.props.expandList;

        return (
            <div>
                <Columns columnsData={columnsData} modalInvoke={modalInvoke} emphasizeCard={emphasizeCard} expandList={expandList} deleteCard={deleteCard} />
            </div>
        );
    }
}

export default Board;
