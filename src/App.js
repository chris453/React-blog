import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Connect from './Config/Database'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getNameKey } from './Action/index';

import AppBar from './AppBar';
import styles from './Styles/styles.css';
import HomePage from './HomePage';
import Login from './login';

class App extends Component {
    constructor() {
        super();
        this.state = ({
            listOfUsernames: [],
            listOfPasswords: [],
            listOfNames: [],
            listOfAvatars: [],
            user: null,
            testUser: '',
            namekey: '',
            check: false
        });
        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        Connect.auth().onAuthStateChanged((user) => {
          // console.log(user.email);
            
            if (user) {
               
                this.setState({ user });
                this.setState({testUser:user.email})
              //  alert(this.state.user);

                this.readUserData();
                localStorage.setItem('user', user.uid);

            } else {
                this.setState({ user: null });
                localStorage.removeItem('user');
            }
        });
    }

    readUserData = () => {
        let array = {}
        var usernameValue = [];
        var passwordTempList = [];
        var nameTempList = [];
        var avatarTempList = [];
        Connect.database().ref('UserAccounts').once('value', (snapshot) => {
            snapshot.forEach(item => {
                var tempUsername = item.val().Username;
                usernameValue.push(tempUsername)
                this.setState({ listOfUsernames: usernameValue })
              //  alert(tempUsername);
               

                var name = item.val().First_Name;
                nameTempList.push(name)
                this.setState({ listOfNames: nameTempList })

                var avatar = item.val().Avatar;
                avatarTempList.push(avatar)
                this.setState({ listOfAvatars: avatarTempList })

            });


            return //console.log(this.state.listOfAvatars);


        }

        );

        this.setState({ check: true });
    
    }

    validateCredentials = () => {
      //  console.log(this.props.nameKey);
       // alert("hey");

            //  alert("heyasas");
            let result = false;
            let tempListOfUsername = this.state.listOfUsernames
            let tempListOfName = this.state.listOfNames
            let tempListOfAvatar = this.state.listOfAvatars
            let nameKey;
            let usernameError = false;
        let passwordError = false;

        // console.log(this.state.listOfUsernames);
        for (let i = 0; i < tempListOfUsername.length && !passwordError; i++) {
                if (this.state.testUser === tempListOfUsername[i]) {
                   nameKey = i;
                   // this.state.namekey = i;
                   console.log(i);
                    this.props.getNameKey(i);
                    //alert(this.props.namekey);
                    passwordError = true;
                  //  break;
                    //  console.log(usernameError)
    
               
            }
            //  alert((tempListOfAvatar[nameKey]));
            //alert(nameKey);
            //alert(tempListOfName[nameKey]);
            //alert( this.props.getAvatar(tempListOfAvatar[nameKey]));
            //alert( this.props.getUserNameNumber(nameKey));
            //alert(this.props.getUser(tempListOfName[nameKey]));

            // this.setRedirect();

        }
    }
    logout() {
        Connect.auth().signOut();
    }
    componentDidUpdate() {
        if (this.state.check) {
        //    if (this.props.)
            this.validateCredentials();
        }


    }
    render() {
        //console.log(this.state.listOfUsernames);
        return (
            <div className="App">
                
                <header className="Blog">
                    <AppBar />

                </header>
              
            </div>

        );
    }
}
function mapStateToProps(state) {
    return {
      namekey:state.namekey
    }
}
export default connect(mapStateToProps, { getNameKey })(App);
