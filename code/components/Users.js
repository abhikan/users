import React, {Component} from 'react';
import {fetchUsers} from '../actions';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

class Users extends Component {

    constructor(props){
        super(props)
        this.state = {selectedUsers: [], confirm: false}
    }

    componentDidMount(){
          this.props.fetchUsers();
    }

    toggleCheckbox = (index) => {

        const itemIndex = this.state.selectedUsers.indexOf(index);
        const selectedUsers = this.state.selectedUsers;
        // If checkbox is already selected remove it
        if( itemIndex > -1){
            selectedUsers.splice(itemIndex,1)
        } else {
            selectedUsers.push(index)
        }

        this.setState({selectedUsers});
    }

    confirm = () => {
        this.setState({confirm: true})
    }

    showUsersList = () => (
        <div style={{padding: 10}}>
        { this.state.selectedUsers.map((userIndex) => (
            <div>
                { this.props.users[userIndex].name }
            </div>
        )) }
        </div>
    )

    renderUsers = () => (
             this.props.users.map((user, index) => (
                <div>
                    <div style={{width: '100%', height: 80, display: 'inline-flex', borderWidth: 1, borderColor: 'grey', borderStyle:'solid'}}>
                        <div style={{width: '5%',backgroundColor: 'grey' }}>
                            <input type="checkbox" id="user" name="user"
                            onClick={() => this.toggleCheckbox(index)}
                             style={{marginTop:20, marginLeft:'50%'}}/>
                        </div>
                        <div style={{width: '95%'}}>
                            <div style={{height:35, backgroundColor: 'lightgray', padding:5}}>
                                {user.name}
                            </div>
                            <div style={{height:35, padding:5}}>
                                {user.email}
                            </div>
                        </div>
                    </div>
                    <div style={{paddingBottom: 10}}>
                    </div>

                  </div>
            ))
        )

    render(){
        return(
            <div style={{width: '100%', height: '100%'}}>
                <div style={{padding: 20}}>
                {this.state.selectedUsers.length >0 ?
                    <div style={{padding: 5}}>
                        {`${this.state.selectedUsers.length} of ${this.props.users.length} Selected`}
                    </div>
                :
            ''}
                    {this.renderUsers()}
                <div>
                    <input type="button" value="Confirm" onClick={this.confirm}
                    style={{backgroundColor: 'cyan', width: 150, height: 40, fontSize:15}}
                    disabled = {this.state.selectedUsers.length <= 0} />
                </div>
                { this.state.confirm ?
                    this.showUsersList()
                    :
                ''}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users
    }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    fetchUsers
  }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(Users);
