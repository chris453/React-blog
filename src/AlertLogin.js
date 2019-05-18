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
import HomePage from './HomePage'
import { Redirect } from 'react-router-dom'

export default class FormDialog extends React.Component {
    state = {
        open: false,
        username: '',
        password: '',
        listOfUsernames: {},
        listOfPasswords: {},
        listOfNames: {},
        errorUsername: false,
        errorPassword: false,
        errorUsernameMessage: "Username",
        errorPasswordMessage: "Password",
        redirect: false,
        isLogin: false,
        loggedin: 'Login',
        welcomeMessage: ''
        
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/HomePage' />
        }
    }

   // handler for if it should send you to login component or login out  
    handleClickOpen = () => {
        if (this.state.loggedin === 'Logout') {
            this.logOut();
            this.setState({ welcomeMessage: '' });
        } else {
            this.setState({ open: true });
        }
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


            //return console.log(this.state.listOfUsernames, this.state.listOfPasswords, this.state.listOfNames)


        }

        );
    }
   
    logOut = () => {
        if (this.state.isLogin) {
            this.setState({ loggedin: "Login", isLogin: false })
            this.handleClose();

        }
    }
    validateCredentials = (username, password) => {
        
            let result = false;
            let tempListOfUsername = this.state.listOfUsernames
            let tempListOfPassword = this.state.listOfPasswords
            let tempListOfName = this.state.listOfNames
            let nameKey;
            let usernameError = false;
            let passwordError = false;
            for (let i = 0; i < tempListOfUsername.length && !result; i++) {
                if (username === tempListOfUsername[i]) {
                    usernameError = false;
                    console.log(usernameError)

                    if (password === tempListOfPassword[i]) {
                        passwordError = false;
                        result = true;
                        nameKey = i;
                        break;

                    } else {
                        passwordError = true;
                        break;
                    }


                } else {
                    usernameError = true;
                }
            }
            if (result) {
                usernameError = false;
                passwordError = false;
                this.setState({
                    errorUsername: usernameError, errorPassword: passwordError,
                    errorUsernameMessage: "Username",
                    errorPasswordMessage: "Password"
                });

                alert("Welcome " + tempListOfName[nameKey])

                this.setState({ isLogin: true, loggedin: "Logout", welcomeMessage: "Welcome " + tempListOfName[nameKey] + ' ' });
                //this.setRedirect();
                this.handleClose();

                return <HomePage />


            } else {

                this.setState({ errorUsername: usernameError, errorPassword: passwordError });
                if (usernameError) {
                    this.setState({ errorUsernameMessage: "Invalid Username" })
                } else this.setState({ errorUsernameMessage: "Username" })

                if (passwordError) {
                    this.setState({ errorPasswordMessage: "Invalid Password" })
                } else this.setState({ errorPasswordMessage: "Password" })


                console.log(this.state.errorPassword + this.state.errorUsername)
            } // chris453@hotmail.com

        
    }

    componentDidMount() {
        { this.readUserData() }
    }

    render() {

        return (
       
            <div>
                {this.state.welcomeMessage}
                <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
                    {this.state.loggedin}
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
                        label={this.state.errorUsernameMessage}
              

                        type="email"
                        error={this.state.errorUsername}
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
                        label={this.state.errorPasswordMessage}
                        error={this.state.errorPassword  }
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
                    {this.renderRedirect()}

          </DialogActions>
            </Dialog>
            { this.state.username + this.state.password }
      </div>
    );
  }
}