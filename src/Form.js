import React, { Component } from 'react'
import axios from "axios"

let count = 0;
export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            address: ''
        }
    }

    createUser = async (e) => {
        e.preventDefault();
        let data;
        let {
            name,
            email,
            phone,
            address,
        } = this.state;

        if (this.props.data.setUpdate) {
            data = {
                name: this.props.data.name,
                email: this.props.data.email,
                phone: this.props.data.phone,
                address: this.props.data.address,
            }
            await axios.patch('http://localhost:5000/students/' + this.props.data.setUpdateId, data)
                .then(result => alert('Your Detail is Updated'))
                .catch(error => alert('User Detail is not updated'))
            this.props.setData(false)
        }
        else {
            data = { name, email, phone, address }
            await axios.post('http://localhost:5000/students', data)
                .then(result => alert('Your Detail Saved Successfully.'))
                .catch(error => alert('Please Enter Your Detail Again.'))

            this.props.setData('added successfully...')
        }

        this.setState({
            name: '',
            email: '',
            phone: '',
            address: ''
        })
    }
    inputEvent = (e) => {
        const { value, name } = e.target;
        this.props.data.setUpdate ? this.props.updateData(name, value) : this.setState({ [name]: value })
    }
    render() {
        // console.log('form render ', ++count)
        return (
            <div>
                <form>
                    <h2>{this.props.data.setUpdate ? "Update Your Details:" : "Fill The Below Form:"}</h2>
                    <div>
                        name <input type="text" name="name" value={this.props.data.setUpdate ? this.props.data.name : this.state.name} onChange={this.inputEvent}></input><br /><br />

                        email <input type="text" name="email" value={this.props.data.setUpdate ? this.props.data.email : this.state.email} onChange={this.inputEvent} ></input><br /><br />

                        phone <input type="Number" name="phone" value={this.props.data.setUpdate ? this.props.data.phone : this.state.phone} onChange={this.inputEvent} ></input><br /><br />

                        address <input type="text" name="address" value={this.props.data.setUpdate ? this.props.data.address : this.state.address} onChange={this.inputEvent} ></input><br /><br />
                        <button onClick={this.createUser}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
