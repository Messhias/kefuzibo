/**
* Main entry point of application
* @author Fabio William Conceição
* @since 2018-08-09
* @version 1.0
* @return {component} Tables
*/
import React, { Component } from 'react';
import Slider from "react-slick";

import CardForm from './CardForm';

export default class Tables extends Component {
    constructor(props){
    	super(props);
    	this.state = {
            tables: [],
            isUpdate: false,
            isNew: false,
            showCardForm: false,
            cardData: [],
            currentCount: 0
        };

        this.cancelForm = this.cancelForm.bind(this);
        this.sendOperation = this.sendOperation.bind(this);
        this.operation = this.operation.bind(this);
        this.timer = this.timer.bind(this);
        this.removeCard = this.removeCard.bind(this);
    }

    /**
    * React life cycle method
    * @author Fabio William Conceição
    * @since 2018-08-09
    * @version 1.0
    * @return void
    */
    componentWillMount() {

        const tables = JSON.parse(localStorage.getItem('table_list'));

        if (tables["$type"] === 'table_list') {
            this.setState({ tables: tables.tables });
        }
    }


    /**
    * React life cycle method
    * @author Fabio William Conceição
    * @since 2018-08-09
    * @version 1.0
    * @return void
    */
    componentDidMount() {
        const intervalId = setInterval(this.timer, 20000);
        // store intervalId in the state so it can be accessed later:
        this.setState({ intervalId: intervalId });
    }

    /**
    * React life cycle method
    * @author Fabio William Conceição
    * @since 2018-08-09
    * @version 1.0
    * @return void
    */
    componentWillUnmount() {
       // use intervalId from the state to clear the interval
       clearInterval(this.state.intervalId);
    }


    /**
    * Timer to refresh table data
    * @author Fabio William Conceição
    * @since 2018-08-09
    * @version 1.0
    * @return this.setState()
    */
    timer() {
       // setState method is used to update the state
       const tables = JSON.parse(localStorage.getItem('table_list'));

       if (tables["$type"] === 'table_list') {
           this.setState({ tables: tables.tables });
       }
    }

    /**
    * Remove current card data from the table
    * @author Fabio William Conceição
    * @since 2018-08-09
    * @version 1.0
    * @return void
    */
    removeCard(card) {
        const { tables } = this.state;
        tables.forEach((t, index) => {
            if (t.id === card.id) {
                tables.splice(index, 1);
            }
        });

        this.setState({ tables });
    }

    /**
    * send operation to MainApp component
    * @author Fabio William Conceição
    * @since 2018-08-09
    * @version 1.0
    * @return void
    */
    sendOperation(card, operation) {
        const { tables } = this.state;
        if (operation === "new") {
            tables.push(card);
            this.setState({ tables });
        }
        this.props.recieveOperation(card, operation);
    }

    /**
    * operation form method
    * @author Fabio William Conceição
    * @param object card
    * @param bool isNew
    * @param bool update
    * @param bool isDelete
    * @since 2018-08-09
    * @version 1.0
    * @return this.setState react lifecycle
    */
    operation(card, isNew, update, isDelete) {
        let operation = ""

        if (isNew) {
            operation = "new";
        }
        if (update) {
            operation = "update";
        }
        if (isDelete) {
            operation = "delete";
        }

        this.sendOperation(card, operation);
    }


    /**
    * cancel form method
    * @author Fabio William Conceição
    * @since 2018-08-09
    * @version 1.0
    * @return this.setState react lifecycle
    */
    addNewTable() {
        this.setState({
            showCardForm: true,
            isUpdate: false,
            isNew: true
        });
    }

    /**
    * cancel form method
    * @author Fabio William Conceição
    * @since 2018-08-09
    * @version 1.0
    * @return this.setState react lifecycle
    */
    cancelForm() {
        this.setState({
            showCardForm: false,
            isUpdate: false,
            isNew: false
        });
    }

    /**
    * React lyfe cycle method
    * @author Fabio William Conceição
    * @param object card
    * @since 2018-08-09
    * @version 1.0
    * @return React.Component
    */
    cardClick(card) {
        this.setState({
            showCardForm: true,
            cardData: card,
            isUpdate: true,
            isNew: false
        });
    }

    /**
    * Calcule the participants in current
    * @author Fabio William Conceição
    * @param int participants
    * @param int roomID
    * @since 2018-08-09
    * @version 1.0
    * @return array seats
    */
    calculateParticipants(participants, roomID) {
        const vacancy = 12 - participants;
        const seats = [];

        for (let i = 0; i < participants; i++) {
            seats.push(
                <i
                    key={`occupied-seats-${roomID}-${i}`}
                    className="fa fa-users"
                ></i>
            );
        }

        if (vacancy > 0) {
            for (let v = 0; v < vacancy; v++) {
                seats.push(
                    <i
                        key={`free-seats-${roomID}-${v}`}
                        className="fa fa-users free-seat"
                    ></i>
                );
            }
        }

        return seats;
    }

    /**
    * Load tables data
    * @author Fabio William Conceição
    * @since 2018-08-09
    * @version 1.0
    * @return {component} Tables
    */
    loadTablesData() {
        const { tables } = this.state;
        return tables.map((t, index) =>
            <div
                onClick={this.cardClick.bind(this, t)}
                key={t.id || t.name}
                className="col card card-custom">
                    <div className="card-body">
                        <h5 className="card-title">
                            {t.name}
                        </h5>

                        <div className="card-text">
                            {this.calculateParticipants(t.participants, t.id)}
                        </div>
                </div>
            </div>
        );
    }

    /**
    * render CardForm component
    * @author Fabio William Conceição
    * @since 2018-08-09
    * @version 1.0
    * @return {component} CardForm
    */
    renderShowCardForm() {
        const {
            showCardForm,
            cardData,
            isUpdate,
            isNew
        } = this.state;

        if (showCardForm) {
            return (
                <CardForm
                    cardData={cardData}
                    isUpdate={isUpdate}
                    isNew={isNew}
                    cancelForm={this.cancelForm}
                    operation={this.operation}
                    removeCard={this.removeCard}
                />
            );
        }
    }

    /**
    * Render new table button
    * @author Fabio William Conceição
    * @since 2018-08-09
    * @version 1.0
    * @return {component} CardForm
    */
    renderNewButton() {
        const { isUpdate, isNew } = this.state;

        if (!isUpdate && !isNew) {
            return (
                <div className="col-12 mg-top-5">
                    <button
                        type="button"
                        className="btn btn-md btn-success"
                        onClick={this.addNewTable.bind(this)}
                    >
                        Add new table
                    </button>
                </div>
            );
        }
    }

    /**
    * Main render component function
    * @author Fabio William Conceição
    * @since 2018-08-09
    * @version 1.0
    * @return render lifecycle method
    */
    render() {
        const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 3
        };

        return (
            <div>
                <h2> All tables </h2>
                <Slider
                    className="container"
                    {...settings}
                >
                    {this.loadTablesData()}
                </Slider>
                {this.renderNewButton()}
                {this.renderShowCardForm()}
          </div>
        );
    }
}
