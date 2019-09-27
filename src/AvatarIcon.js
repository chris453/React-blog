import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ChangeAvatar from './ChangeAvatar'


class AvatarIcon extends React.Component {

    state = {
    }
    render() {
      //  console.log(this.props.avatar);
        if (this.props.avatar !== "") {

            return (
              /*  <PopupState variant="popover" popupId="demo-popup-menu">
                    {popupState => (
                        <React.Fragment>
                      
                            <div>
                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" 

                                    {...bindTrigger(popupState)}
                                    

                                />
                            </div>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={<ChangeAvatar/> }>Change Avatar</MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
                */
  
                //   <Grid container justify="center" alignItems="center">
                <div>
                    <Avatar alt="icon"
                        src= {this.props.avatar}
                        className="avatar_style" />


                </div>

            
            )
        
        } else {
           // alert("hey");
            return (
                //   <Grid container justify="center" alignItems="center">
                <div>
                    <Avatar alt="icon"
                        src="https://firebasestorage.googleapis.com/v0/b/sturdy-plateau-174315.appspot.com/o/default_icon.png?alt=media&token=1e38271f-f758-4d7c-a34e-88d1e4a61689"
                        className="avatar_style" />


                </div>

            )
        }
    }

}
function mapStateToProps(state) {
    return {
        avatar: state.avatar,
    }
}
export default connect(mapStateToProps)(AvatarIcon);
