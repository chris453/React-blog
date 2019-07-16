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

export default class FormDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Link variant="outlined" color="primary" onClick={this.handleClickOpen}>
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
                            id="first name"
                            label="first name"
                            // type="email"
                            fullWidth
                        />

                        <TextField
                            //autoFocus
                            margin="dense"
                            id="last name"
                            label="last name"
                            //type="email"
                            fullWidth
                        />
                        <TextField
                         //   autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        
                        <TextField
                        //    autoFocus
                            margin="dense"
                            id="password"
                            label="password"
                            type="password"
                            fullWidth
                        />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Subscribe
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}