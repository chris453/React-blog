import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { relative } from 'path';
import { Container } from 'reactstrap';
import style from './style.css';
import FormDialog from './AlertLogin';
import AppBar from './AppBar';

const date = new Date();

const MyComp = () => {
    const [dialogVisible, setDialogVisible] = React.useState(false);

    return (

        <div>

            {dialogVisible && <FormDialog />}
            <Button
                onClick={() => setDialogVisible(true)}
            >
            </Button>
        </div>
    );
}
export default class loginPage extends Component {

    constructor(props) {
        super(props)

        this.state = { email: '', password: '' };
    }




    render() {
        return (

            <div className="container">
                <AppBar />

                <Button color='secondary'>

                </Button>
                <form>
                    Login

                    First name:<br />
                    <input type="text" name="Username" /><br />
                    Last name:<br />
                    <input type="text" name="Password" />
                    <button type="submit" name="Login" >submit</button>
                </form>
            </div>

        );
    }
}

