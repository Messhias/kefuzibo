/**
* Main entry point of application
* @author Fabio William Conceição
* @since 2018-08-09
* @version 1.0
* @return {component} CardForm
*/
import React, { Component } from 'react';

export default class CardForm extends Component {
    constructor(props){
    	super(props);
    	this.state = {
            newTable: {
                name: '',
                participants: 0
            },
            card: this.props.cardData
        };
    }

    /**
    * send operation to parent component
    * @author Fabio William Conceição
    * @param object card
    * @param bool isNew
    * @param bool isUpdate
    * @param bool isDelete
    * @since 2018-08-09
    * @version 1.0
    * @return this.setState react lifecycle
    */
    onChangeInputValue(e) {
        let { newTable, card } = this.state;
        const { isUpdate, isNew } = this.props;
        if (isUpdate) {
            card[e.target.name] = e.target.value;
        } else if (isNew) {
            newTable[e.target.name] = e.target.value;
        }

        this.setState({ newTable, card });
    }

    /**
    * send operation to parent component
    * @author Fabio William Conceição
    * @param object card
    * @param bool isNew
    * @param bool isUpdate
    * @param bool isDelete
    * @since 2018-08-09
    * @version 1.0
    * @return this.setState react lifecycle
    */
    sendOperation(card, isNew, isUpdate, isDelete) {
        if (isNew) {
            const { newTable } = this.state;
            card = newTable;
        }
        if (isDelete) {
            this.props.removeCard(card);
        }
        this.props.operation(card, isNew, isUpdate, isDelete);
        this.props.cancelForm();
    }

    /**
    * React lyfe cycle method
    * @author Fabio William Conceição
    * @param object card
    * @since 2018-08-09
    * @version 1.0
    * @return Form
    */
    loadForm() {
        const { isUpdate, isNew } = this.props;
        const { newTable, card } = this.state;

        return (
            <div className="col-12 mg-top-5">
                <form key='room-form'>
                    <div className="form-group">
                        <label htmlFor="name">Room name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Type room name"
                            value={isUpdate ? card.name : newTable.name}
                            onChange={this.onChangeInputValue.bind(this)}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="participants">Room participants</label>
                        <input
                            type="number"
                            min="0"
                            max="12"
                            className="form-control"
                            id="participants"
                            name="participants"
                            placeholder="Participants number"
                            value={isUpdate ? card.participants : newTable.participants}
                            onChange={this.onChangeInputValue.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                            <button
                                type="button"
                                className="btn btn-md btn-primary"
                                onClick={this.sendOperation.bind(this, card, isNew, isUpdate, false)}
                            >
                                {
                                    isNew ? "Add new table" : "Update table"
                                }
                            </button>
                            {
                                isUpdate ?
                                    <button
                                        type="button"
                                        className="btn btn-md btn-danger"
                                        onClick={this.sendOperation.bind(this, card, isNew, isUpdate, true)}
                                    >
                                        Delete this room
                                    </button>
                                :
                                    null
                            }

                            <button
                                type="button"
                                className="btn btn-md btn-default"
                                onClick={this.props.cancelForm}
                            >
                                Cancel
                            </button>
                    </div>
                </form>
            </div>
        );
    }

    /**
    * Main render component function
    * @author Fabio William Conceição
    * @since 2018-08-09
    * @version 1.0
    * @return render lifecycle method
    */
    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.loadForm()}
                </div>
            </div>
        );
    }
}
