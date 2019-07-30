import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Connect from './Config/Database'

export default class FormDialog extends React.Component {
    state = {
        open: false,
        first: "",
        last: "",
        email: "",
        password: "",
        errorFirst: false,
        errorLast: false,
        errorEmail: false,
        errorPassword: false,
        errorFirstMessage: "First Name",
        errorLastMessage: "Last Name",
        errorEmailMessage: "Email Address",
        errorPasswordMessage: "Password"
    };
    handleOnChange(e) {
        this.setState({ [e.target.id]: e.target.value })

    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    createOnClick = (e) => {
        e.preventDefault();

      var  first = false;
       var  last = false;
        var email = false;
        var password = false;

        if (this.state.first === "") {
            first = false;
            this.setState({ errorFirst: true, errorFirstMessage: "Invalid First Name" })

        } else {
            first = true;
            this.setState({ errorFirst: false, errorFirstMessage: "First Name" })

        }

        if (this.state.last === "") {
            last = false;
            this.setState({ errorLast: true, errorLastMessage: "Invalid Last Name" })

        } else {
            last = true;
            this.setState({ errorLast: false, errorLastMessage: "Last Name" })

        }

        if (this.state.email === "") {
            email = false;
            this.setState({ errorEmail: true, errorEmailMessage: "Invalid Email Address" })

        } else {
            email = true;
            this.setState({ errorEmail: false, errorEmailMessage: "Email Address" })

        }

        if (this.state.password === "") {
            password = false;
            this.setState({ errorPassword: true, errorPasswordMessage: "Invalid Password" })

        } else {
            password = true;
            this.setState({ errorPassword: false, errorPasswordMessage: "Password" })

        }

        if (password && email && first && last) {

           this.signup(e) 
                

            
        }
    }

    signup(e) {
        e.preventDefault();
        Connect.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).then((u) => {
            console.log(u)
            let ref = Connect.database().ref('UserAccounts/')

            let entry = {
                Avatar: "https://firebasestorage.googleapis.com/v0/b/sturdy-plateau-174315.appspot.com/o/default_icon.png?alt=media&token=1e38271f-f758-4d7c-a34e-88d1e4a61689",
                First_Name: this.state.first,
                Last_Name: this.state.last,
                Password: this.state.password,
                Username: this.state.email
            }
            ref.push(entry);
        })
            .catch((error) => {

                console.log(error);
            })
    }

    checkIfEmpty = (state, error, message)=> {
        if (state === "") {
         //   error = true;
            this.setState({ error: true });
            
        }
        else {
            error = false;

        }
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Link variant="outlined" color="primary" onClick={this.handleClickOpen} className="create_user_style" >
                    Create New Account
        </Link>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create New User</DialogTitle>
                    <DialogContent>
                        <Avatar alt="icon"
                            src={"https://firebasestorage.googleapis.com/v0/b/sturdy-plateau-174315.appspot.com/o/default_icon.png?alt=media&token=1e38271f-f758-4d7c-a34e-88d1e4a61689"}

                            />
                        <TextField
                               autoFocus
                            margin="dense"
                            id="first"
                            error={this.state.errorFirst}

                            label={this.state.errorFirstMessage}
                            // type="email"
                            onChange={this.handleOnChange.bind(this)}

                            fullWidth
                        />

                        <TextField
                            //autoFocus
                            margin="dense"
                            id="last"
                            error={this.state.errorLast}

                            label={this.state.errorLastMessage}
                            onChange={this.handleOnChange.bind(this)}

                            //type="email"
                            fullWidth
                        />
                        <TextField
                         //   autoFocus
                            margin="dense"
                            id="email"
                            label={this.state.errorEmailMessage}
                            error={this.state.errorEmail}

                            onChange={this.handleOnChange.bind(this)}

                            type="email"
                            fullWidth
                        />
                        
                        <TextField
                        //    autoFocus
                            margin="dense"
                            error={this.state.errorPassword}

                            id="password"
                            onChange={this.handleOnChange.bind(this)}
                            label={this.state.errorPasswordMessage}
                            type="password"
                            fullWidth
                        />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.createOnClick} color="primary">
                            Create
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}