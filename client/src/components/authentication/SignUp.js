import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputLabel, Select, Typography, TextField, Button, MenuItem, Radio, RadioGroup, FormControl, FormGroup, FormLabel, FormControlLabel} from '@material-ui/core' 
import './styles.css';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions/AuthAction';
import PropTypes from 'prop-types';
// import { withRouter  } from 'react-router-dom'  

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            gender: '',
            country: '',
            error: '',
            error: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
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

    onSubmit(e) {
        const { onAuth } = this.props;

        e.preventDefault();

        const newUser = {
            userName: this.state.userName,
            password: this.state.password,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            country: this.state.country

        }

        this.props.signUpUser(newUser, onAuth);

    }

    render() {

        const { user } = this.props.auth;
        return (
            <div>
                <Typography variant="h1">
                    Sign Up
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
                    <TextField
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        placeholder="Email Address" />
                    <TextField
                        type="text"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.onChange}
                        placeholder="First Name" />
                    <TextField
                        type="text"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.onChange}
                        placeholder="Last Name" />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.onChange}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.country}
                            onChange={this.onChange}
                            name="country"
                        >
                            <MenuItem value={'India'}>India</MenuItem>
                            <MenuItem value={'USA'}>USA</MenuItem>
                            <MenuItem value={'Africa'}>Africa</MenuItem>
                        </Select>
                    </FormControl>

                    <Button onClick={this.onSubmit} variant="contained" color="primary">
                        Sign Up
                    </Button>

                    <div>Already a User? <Link to="/login">Login</Link></div>
                </form>
                <ToastContainer />
            </div>
        )
    }

}

SignUp.propTypes = {
    signUpUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { signUpUser })(withRouter(SignUp));