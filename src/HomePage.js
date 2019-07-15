import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';

import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Send from '@material-ui/icons/Send';
import Clear from '@material-ui/icons/Clear';
import Connect from './Config/Database'
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

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
            listOfEntries: [],
            listOfEdit: 0,
            listOfDelete: 0,
            errorTitle: false,
            errorPost: false,
            errorTitleMessage: "Title",
            errorPostMessage: "Post",
            listOfKeys: [],
            prevAvatar: '',
            open: false,
            openEdit: false,
            buttonPressed: '0',
            editTitle:'',
            editPost:'',
        };
    }
    handleOnChange(e) {
        this.setState({ [e.target.id]: e.target.value })

    }

    clear() {
    }
    handleClickOpen = (e) => {
        this.setState({ open: true, buttonPressed:e });
        
    };

    handleClickOpenEdit = (e) => {
        this.setState({ openEdit: true, buttonPressed: e, editPost: this.state.listOfEntries[e].post, editTitle: this.state.listOfEntries[e].title });

    };

    handleClose = () => {
        this.setState({ errorTitle: false, errorTitleMessage: "Title" })
        this.setState({ errorPost: false, errorPostMessage: "Post" })

        this.setState({ open: false, openEdit:false });
    };

    handleOnClick() {

        let array = {}
        var usernameValue = [];
        var passwordTempList = [];
        var nameTempList = [];
        var avatarTempList = [];
        var resultTitle = false;
        var resultPost = false;
        if (this.state.title === "") {
            this.setState({ errorTitle: true, errorTitleMessage: "Invalid Title" })
            resultTitle = false;
        }
        else {
            resultTitle = true;
            this.setState({ errorTitle: false, errorTitleMessage: "Title"})

        }
        if (this.state.post === "") {
            resultPost = false;
            this.setState({ errorPost: true, errorPostMessage: "Invalid Post" })

        } else {
            resultPost = true;
            this.setState({  errorPost: false, errorPostMessage: "Post" })

        }
        if (resultPost && resultTitle) {
            this.setState({ errorTitle: false, errorTitleMessage: "Title", errorPost: false, errorPostMessage: "Post" })

            let ref = Connect.database().ref('Entries/' + this.props.usernamenumber)
            let time = new Date().toLocaleString();

            let entry = {
                title: this.state.title,
                post: this.state.post,
                date: time,
                icon: this.props.avatar
            }
            ref.push(entry);
            this.setState({ title: "", post: "" })
            this.readUserData() 

        }

    }

    editPost = () => {
        var resultTitle = false;
        var resultPost = false;
    if (this.state.editTitle === "") {
        this.setState({ errorTitle: true, errorTitleMessage: "Invalid Title" })
        resultTitle = false;
    }
    else {
        resultTitle = true;
        this.setState({ errorTitle: false, errorTitleMessage: "Title" })

    }
    if (this.state.editPost === "") {
        resultPost = false;
        this.setState({ errorPost: true, errorPostMessage: "Invalid Post" })

    } else {
        resultPost = true;
        this.setState({ errorPost: false, errorPostMessage: "Post" })

        }

        if (resultPost && resultTitle) {
            this.setState({ errorTitle: false, errorTitleMessage: "Title", errorPost: false, errorPostMessage: "Post" })
            var tempKey = this.state.listOfKeys[this.state.buttonPressed];

            Connect.database().ref('Entries/' + this.props.usernamenumber).child(tempKey).update({ post: this.state.editPost, title: this.state.editTitle });

            this.readUserData()
            this.handleClose()
        }
        

}
    componentDidUpdate() {
        if (this.props.avatar !== this.state.prevAvatar) {
            this.readUserData()
            this.setState({ prevAvatar: this.props.avatar })

        }
    }
    
      componentDidMount() {
     }
    readUserData = () => {

        let array = {}
            var entriesTempList = [];
        var keyTempList = [];
        Connect.database().ref('Entries/' + this.props.usernamenumber).once('value', (snapshot) => {

            snapshot.forEach(item => {
                var entries = item.val();
                keyTempList.push(item.key);
                entriesTempList.push(entries)
            });
            keyTempList.reverse();
            entriesTempList.reverse();
            this.setState({ listOfEntries: entriesTempList, listOfKeys: keyTempList })
            

        }

        );
    }
    cancelOnClick = () => {
        this.setState({ title: "", post: "", errorPost: false, errorTitle: false, errorTitleMessage: "Title", errorPostMessage: "Post"})

    }
    confirm = (id) => {
        let tempListOfKey = this.state.listOfKeys;

        var tempKey = tempListOfKey[id];
        Connect.database().ref('Entries/' + this.props.usernamenumber).child(tempKey).remove();

        this.readUserData()
        this.handleClose()
    }
    delete = (id) => {
        alert(id);
        this.handleClickOpen();
        alert(this.state.open);
        return (
            <div>
        
                </div>
        );

    }
    render() {
        console.log(this.state.listOfEntries);

       // console.log(this.listOfKeys);
        var temp = this.props.avatar
        if (this.open) {
            console.log("true");
        }
        return (
            <div className="container">
                {this.props.avatar !== '' ?

                    <div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <Grid container spacing={16} justify="center">
                            <Avatar alt="lanlan icon"
                                src={this.props.avatar}
                                className="avatar_post_style" />
                            <Grid item xs={10}>


                                <form autoComplete="off">
                                    <TextField
                                        id="title"
                                        label={this.state.errorTitleMessage}
                                        error={this.state.errorTitle}
                                        value={this.state.title}
                                        style={{ margin: 8 }}
                                        placeholder="Enter Title here"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleOnChange.bind(this)}

                                    />

                                    <TextField
                                        id="post"
                                        value={this.state.post}

                                        label="what is on your mind?"
                                        style={{ margin: 8 }}
                                        multiline={true}
                                        rows={10}
                                        label={this.state.errorPostMessage}
                                        error={this.state.errorPost}

                                        onChange={this.handleOnChange.bind(this)}

                                        rowsMax={15}
                                        placeholder="Enter thoughts here"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"

                                    />

                                    <Button onClick={this.cancelOnClick} color="secondary" variant="contained" size="large" >
                                        Cancel <Clear className="style" />
                                    </Button>
                                    &nbsp;
                            <Button color="primary" variant="contained" size="large" onClick={() => this.handleOnClick()} >
                                        Post <Send className="style" />
                                    </Button>


                                </form>


                                <br />
                                <br />
                                <br />
                                <br />

                           





                                {Object.values(this.state.listOfEntries).map((post, index) => {

                                    
                            return (<div>
                         
                                <Avatar alt="icon"
                                    src={post.icon}
                                    className="avatar_post_style_icon" />
                                <Edit className="edit_style" id={index} onClick={() => this.handleClickOpenEdit(index)} />
                                <Delete className="edit_style" id={index} onClick={() => this.handleClickOpen(index)} />
                                <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    aria-labelledby="form-dialog-title"
                                >
                                    <DialogTitle id="form-dialog-title">Are you sure?</DialogTitle>

                                    <DialogActions>
                                        <Button onClick={this.handleClose} color="primary">
                                            Cancel
            </Button>
                                        <Button onClick={() => { this.confirm(this.state.buttonPressed) }} color="primary">
                                            Confirm
            </Button>
                                    </DialogActions>

                                </Dialog>

                                <Dialog
                                    open={this.state.openEdit}
                                    onClose={this.handleClose}
                                    aria-labelledby="form-dialog-title"
                                >
                                    <DialogTitle id="form-dialog-title">Edit Post?</DialogTitle>
                                    <DialogContent>

                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="editTitle"
                                            value={(this.state.editTitle)}
                                        //    label={(this.state.editTitle)}
                                            label={this.state.errorTitleMessage}
                                            error={this.state.errorTitle}
                                            type="email"
                                           
                                        onChange={this.handleOnChange.bind(this)}

                                            fullWidth
                                        />

                                        <TextField

                                            margin="dense"
                                            id="editPost"

                                            value={(this.state.editPost)}
                                        //    label={(this.state.editPost)}
                                            label={this.state.errorPostMessage}

                                            error={this.state.errorPost}
                                          //  type="password"
                                       
                                            onChange={this.handleOnChange.bind(this)}

                                            fullWidth
                                        />


                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleClose} color="primary">
                                            Cancel
            </Button>
                                        <Button onClick={() => { this.editPost() }} color="primary">
                                            Save
            </Button>
                                    </DialogActions>

                                </Dialog>
                                <h1>{post.title}
                                </h1>
                                
                                <small className="clock_post_style">{post.date}</small>

                                <p className="post_style">{post.post}</p>
                            </div>
                            );
                        })}

                            </Grid>

                        </Grid>

                    </div>

                    : ''}

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