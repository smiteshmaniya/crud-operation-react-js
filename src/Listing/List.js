import React, { Component } from 'react'

let count = 0;
export default class List extends Component {
    ondelete = async (e) => {
        // console.log(e.target.className)
        const id = e.target.className;
        this.props.handleDelete(id)

    }
    onUpdate = async (e) => {
        const id = e.target.className;
        this.props.handleUpdate(id)
    }
    render() {
        // console.log('List render...', ++count)
        return (
            <>
                <tr>
                    <td>{this.props.studentData.name}</td>
                    <td>{this.props.studentData.email}</td>
                    <td>{this.props.studentData.phone}</td>
                    <td>{this.props.studentData.address}</td>
                    <td><button onClick={this.ondelete} className={this.props.studentData._id}>Delete</button>
                        <button onClick={this.onUpdate} className={this.props.studentData._id}>Edit</button>
                    </td>
                </tr>

            </>
        )
    }
}
