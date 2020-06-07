import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography ,TextField, Button } from '@material-ui/core'
import './styles.css';
import { loginAction } from '../../actions/AuthAction';  
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            error: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
        if (nextProps.auth.error) {
            this.setState({ error: nextProps.auth.error }, () => {
                toast.error(this.state.error);
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        const { onAuth } = this.props;

        e.preventDefault();

        this.props.loginAction({
            userName: this.state.userName,
            password: this.state.password
        }, onAuth);
    }

    render() {
        return (
            <div>
                <Typography variant="h1">
                    Login
                </Typography>
                <form className="form-group">
                    <TextField
                        type="text"
                        name="userName"
                        value={this.state.userName}
                        onChange={this.onChange}
                        placeholder="User Name" />
                    <TextField
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        placeholder="Password" />
                    <Button onClick={this.onSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                    <p>New User? <Link to="/signup">SignUp</Link></p>
                </form>
                <ToastContainer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { loginAction })(withRouter(Login));