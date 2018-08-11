/**
* Main entry point of application
* @author Fabio William Conceição
* @since 2018-08-07
* @version 1.0
* @return {component} MainApp
*/
import React, { Component } from 'react';

import Header from '../Components/Layout/Header';
import Tables from '../Components/Tables';

import Request from '../Requests/Request';

export default class MainApp extends Component {
    constructor(props){
    	super(props);
        this.state = {
            loading: true,
            refresh: false
        }
        this.recieveOperation = this.recieveOperation.bind(this);
    }

    /**
    * ReactJS Life Cycle method
    * @author Fabio William Conceição
    * @since 2018-08-07
    * @version 1.0
    * @return {component} MainApp
    */
    componentWillMount() {
        Request.setup({
            "$type": "subscribe_tables"
        });

        this.loading();
    }

    /**
    * Loading
    * @author Fabio William Conceição
    * @since 2018-08-07
    * @version 1.0
    * @return {component} MainApp
    */
    loading() {
        this.setState({ loading: false, refresh: true });
    }

    /**
    * Proccess the operations send by child components
    *
    * @author Fabio William Conceição
    * @param object card
    * @param string operation
    * @since 2018-08-07
    * @version 1.0
    * @return {component} MainApp
    */
    recieveOperation(card, operation) {
        switch (operation) {
            case 'new':
                if (card.name !== '' && card.participants > 0) {
                    Request.setup({
                        "$type": "add_table",
                        "after_id": 1,
                        "table": card
                    });
                }
            break;

            case 'update':
                if (card.name !== '' && card.participants > 0) {
                    Request.setup({
                        "$type": "update_table",
                        "table": card
                    });
                }
            break;

            case 'delete':
                if (card.id !== 0) {
                    Request.setup({
                        "$type": "remove_table",
                        "id": card.id
                    });
                }
            break;

            default:
                this.componentWillMount();
        }
    }

    /**
    * React Render method
    * @author Fabio William Conceição
    * @since 2018-08-07
    * @version 1.0
    * @return {component} MainApp
    */
    render() {
        const { loading, refresh } = this.state;

        if (loading) {
            return (
                <div>
                    <div>
                        <Header />
                    </div>
                    <div className="container">
                        <div className="row">
                            <h1>
                                Loading tables... <i className="fa fa-gear fa-spin"></i>
                            </h1>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div>
                    <Header />
                </div>
                <div className="container">
                    <div className="row">
                        <Tables
                            recieveOperation={this.recieveOperation}
                            refresh={refresh}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
