import React, { Component } from 'react'
import axios from "axios"
import Form from './Form';
import List from './Listing/List'
let count = 0;
export default class Api extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            students: [],
            name: '',
            email: '',
            phone: '',
            address: '',
            setUpdate: false,
            setUpdateId: '',
            isAccending: false
        }
    }
    async componentDidMount() {
        this.setState({ isLoading: true })
        console.log('componetn did mount')
        await axios.get('http://localhost:5000/students')
            .then((response) => response.data)
            .then(
                (result) => {
                    this.setState({ isLoading: false })
                    console.log(result)
                    this.setState({ students: result });
                }
            )
            .catch(err => {
                this.setState({ isLoading: false })
            })
    }

    setData = async (arg) => {
        if (arg == false) {
            this.setState({ setUpdate: false })
        }
        console.log('this is set data', arg)
        await axios.get('http://localhost:5000/students')
            .then((response) => response.data)
            .then((result) => { this.setState({ students: result }); })
    }

    handleUpdateData = (name, value) => {
        this.setState({ [name]: value })
    }

    handleUpdate = (id) => {
        let editDetails;
        this.state.students.map((val) => { if (val._id === id) editDetails = val; })
        console.log('edit ', editDetails)
        this.setState({
            setUpdate: true,
            setUpdateId: id,
            name: editDetails.name,
            email: editDetails.email,
            phone: editDetails.phone,
            address: editDetails.address
        })
    }
    handleDelete = async (id) => {
        await axios.delete('http://localhost:5000/students/' + id)
            .then(result => this.setState({ students: this.state.students.filter(val => val._id != id) }))
            .catch(err => console.log('Not deleted'))
    }
    afterSort = async (arg) => {
        await axios.get('http://localhost:5000/students')
            .then((response) => response.data)
            .then((result) => { this.setState({ students: arg }); })
    }
    sortByName = async (e) => {
        let myData;
        if (this.state.isAccending) {
            console.log('ass', this.state.isAccending)
            myData = this.state.students
                .sort((a, b) => a.name < b.name ? 1 : -1)
            this.afterSort(myData)
            this.setState({ isAccending: false })
        }
        if (!this.state.isAccending) {
            console.log('des', this.state.isAccending)
            myData = this.state.students
                .sort((a, b) => a.name > b.name ? 1 : -1)
            this.afterSort(myData)
            this.setState({ isAccending: true })
        }
    }
    sortByEmail = async (e) => {
        let myData;
        if (this.state.isAccending) {
            console.log('ass', this.state.isAccending)
            myData = this.state.students
                .sort((a, b) => a.email < b.email ? 1 : -1)
            this.afterSort(myData)
            this.setState({ isAccending: false })
        }
        if (!this.state.isAccending) {
            console.log('des', this.state.isAccending)
            myData = this.state.students
                .sort((a, b) => a.email > b.email ? 1 : -1)
            this.afterSort(myData)
            this.setState({ isAccending: true })
        }
    }
    sortByPhone = async (e) => {
        let myData;
        if (this.state.isAccending) {
            console.log('ass', this.state.isAccending)
            myData = this.state.students
                .sort((a, b) => a.phone < b.phone ? 1 : -1)
            this.afterSort(myData)
            this.setState({ isAccending: false })
        }
        if (!this.state.isAccending) {
            console.log('des', this.state.isAccending)
            myData = this.state.students
                .sort((a, b) => a.phone > b.phone ? 1 : -1)
            this.afterSort(myData)
            this.setState({ isAccending: true })
        }
    }
    sortByAddress = async (e) => {
        let myData;
        if (this.state.isAccending) {
            console.log('ass', this.state.isAccending)
            myData = this.state.students
                .sort((a, b) => a.address < b.address ? 1 : -1)
            this.afterSort(myData)
            this.setState({ isAccending: false })
        }
        if (!this.state.isAccending) {
            console.log('des', this.state.isAccending)
            myData = this.state.students
                .sort((a, b) => a.address > b.address ? 1 : -1)
            this.afterSort(myData)
            this.setState({ isAccending: true })
        }
    }
    render() {
        // console.log('Api render...', ++count)
        return (
            <>
                <Form data={this.state} setData={this.setData} updateData={this.handleUpdateData} />
                {
                    this.state.isLoading &&
                    <p>Loading .....</p>
                }
                <table>
                    <thead className="btn-primary">
                        <tr>
                            <th onClick={this.sortByName}>Name</th>
                            <th onClick={this.sortByEmail}>Email</th>
                            <th onClick={this.sortByPhone}>Phone</th>
                            <th onClick={this.sortByAddress}>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.students.map((val, index) => <List studentData={val} key={val._id} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} />)
                        }
                    </tbody>
                </table>
            </>
        )
    }
}