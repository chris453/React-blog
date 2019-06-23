import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { relative } from 'path';
import { Container } from 'reactstrap';
import FormDialog from './AlertLogin';
import AppBar from './AppBar';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Send from '@material-ui/icons/Send';
import Clear from '@material-ui/icons/Clear';
import Connect from './Config/Database'

const date = new Date();

const MyComp = () => {
    const [dialogVisible, setDialogVisible] = React.useState(false);

    return (

        <div>


        </div>
    );
}
class HomePage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            title: '',
            post: '',
            username: '',
            listOfEntries: '',
        };
    }
    handleOnChange(e) {
        this.setState({ [e.target.id]: e.target.value })

    }


    handleOnClick() {

        let array = {}
        var usernameValue = [];
        var passwordTempList = [];
        var nameTempList = [];
        var avatarTempList = [];
        let ref = Connect.database().ref('Entries/' + this.props.usernamenumber)
        let time = new Date().toLocaleString();

        let entry = {
            title: this.state.title,
            post: this.state.post,
            date: time,
            icon: this.props.avatar
        }
        ref.push(entry);


    }
    componentDidUpdate() {
        { this.readUserData() }
    }
    readUserData = () => {
        let array = {}
        var entriesTempList = [];
        Connect.database().ref('Entries/' + this.props.usernamenumber).once('value', (snapshot) => {
            snapshot.forEach(item => {


                var entries = item.val();
                entriesTempList.push(entries)

            });

            this.setState({ listOfEntries: entriesTempList })

            return 

        }

        );
    }

    render() {
        console.log(this.props.usernamenumber);
        return (
            <div className="container">
                <br />
                <br />
                <br />
                <br />
                <Grid container spacing={16} justify="center">
                    <Avatar alt="lanlan icon"
                        src={this.props.avatar}
                        className="avatar_post_style"/>
                    <Grid item xs={10}>

                
                <form autoComplete = "off">
                    <TextField
                        id="title"
                        label="title"
                        style={{ margin: 8 }}
                        placeholder="Enter Title here"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                                onChange={this.handleOnChange.bind(this)}

                            />

                            <TextField
                                id="post"
                                label="what is on your mind?"
                                style={{ margin: 8 }}
                                multiline={true}
                                rows={10}
                                onChange={this.handleOnChange.bind(this)}

                                rowsMax={15}
                                placeholder="Enter thoughts here"
                                fullWidth
                                margin="normal"
                                variant="outlined"

                            />

                            <Button onClick={this.handleClose} color="secondary" variant="contained" size="large">
                                Cancel <Clear className ="style"/>
            </Button>
                            &nbsp;
                            <Button color="primary" variant="contained" size="large" onClick={() => this.handleOnClick()} >
                                Post <Send className = "style"/>
            </Button>


                        </form>

               
                <br />
                <br />
                <br />
                    <br />
                    {Object.values(this.state.listOfEntries).map (post => {
                        return (<div>
                        <h1>{post.title} </h1>
                        <h3>{post.date}</h3>
                        <p>{post.post}</p>
                    </div>
                    );
                    })}

                    </Grid>

                </Grid>
                <AppBar />


               
            </div>

        );
    }

}

function mapStateToProps(state) {
    return {
        avatar: state.avatar,
        usernamenumber: state.usernamenumber
    }
}

export default connect(mapStateToProps)(HomePage);