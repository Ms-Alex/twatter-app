// responsible for routing logic
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import MessageForm from '../containers/MessageForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';
import ProfilePage from './ProfilePage';

const Main = (props) => {

    const { authUser, errors, removeError, currentUser } = props;
    return (
        <div className="container">
            <Switch>
                <Route exact path='/' render={ (props) => <Homepage currentUser={currentUser} {...props} /> } />

                <Route exact path='/signin' render={ (props) => {
                    return (
                        <AuthForm removeError={removeError} errors={errors} onAuth={authUser} {...props} buttonText="Log In" heading="Welcome back." />
                    )
                } } />
                
                <Route exact path='/signup' render={(props) => {
                    return (
                        <AuthForm removeError={removeError} errors={errors} onAuth={authUser} signUp {...props} buttonText="Sign Up" heading="Join Twatter today." />
                    )
                }} />

                <Route exact path='/users/:id/messages/new' component={withAuth(MessageForm)} />

                {/* <Route exact path='/users/:id/profile' render={(props) => <ProfilePage {...props} /> } /> */}
                <Route exact path='/users/:id/profile' component={withAuth(ProfilePage)} />
            </Switch>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors,
    }
}

//get props from router to component. components will be able to use history object to redirect
export default withRouter(
  connect(
    mapStateToProps,
    { authUser, removeError }
  )(Main)
);
