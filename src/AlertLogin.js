import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import ForgetPassword from './ForgetPassword'
import Connect from './Config/Database'
import InputAdorment from '@material-ui/core/InputAdornment'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'
import { database } from 'firebase';

export default class FormDialog extends React.Component {
    state = {
        open: false,
        username: '',
        password: '',
        listOfUsernames: {},
        listOfPasswords: {},
        listOfNames: {}
    };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    };

    handleOnChange(e) {
        this.setState( { [e.target.id]: e.target.value })
    
    }

    readUserData = () => {
        let array = {}
        var usernameValue = [];
        var passwordTempList = [];
        var nameTempList = [];

        Connect.database().ref('UserAccounts').once('value',  (snapshot)=> {
            snapshot.forEach(item => {
                var tempUsername =  item.val().Username ;
                usernameValue.push(tempUsername)
                this.setState({ listOfUsernames: usernameValue })

                var passCode = item.val().Password;
                passwordTempList.push(passCode)
                this.setState({ listOfPasswords: passwordTempList })

                var name = item.val().First_Name;
                nameTempList.push(name)
                this.setState({ listOfNames: nameTempList })

            });


            return console.log(this.state.listOfUsernames, this.state.listOfPasswords, this.state.listOfNames)


        }

        );
    }

    validateCredentials = (username,password) => {
        let result = false;
        let tempListOfUsername = this.state.listOfUsernames
        let tempListOfPassword = this.state.listOfPasswords
        let tempListOfName = this.state.listOfNames
        let nameKey;

        for (let i = 0; i < tempListOfUsername.length; i++) {
            if (username === tempListOfUsername[i]) {
                console.log(tempListOfUsername[i] + tempListOfPassword[i])

                if (password === tempListOfPassword[i]) {
                    result = true;
                    nameKey = i;
                    break;
                }


            }
        }
        if (result) {
            alert("Welcome " + tempListOfName[nameKey])

    }
        
    } // chris453@hotmail.com

    componentDidMount() {
        { this.readUserData() }
    }

    render() {

    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
                Login
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Email Address"
              

                        type="email"
                        InputProps={{
                            startAdornment: (
                                <InputAdorment position="start">
                                    <AccountCircle />
                                </InputAdorment>
                            )
                        }}
                        onChange={this.handleOnChange.bind(this)}

              fullWidth
                    />
                    
                        <TextField
              
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        InputProps={{
                            startAdornment: (
                                <InputAdorment position="start">
                                    <Lock />
                                </InputAdorment>
                            )
                        }}
                        onChange={this.handleOnChange.bind(this)}
                        fullWidth
                    />
                    
          
                </DialogContent>
                <ForgetPassword />
  
          <DialogActions>
            <Button onClick={this.handleClose } color="primary">
              Cancel
            </Button>
                    <Button onClick={() =>this.validateCredentials(this.state.username, this.state.password)} color="primary">
              Confirm
            </Button>
          </DialogActions>
            </Dialog>
            { this.state.username + this.state.password }
      </div>
    );
  }
}