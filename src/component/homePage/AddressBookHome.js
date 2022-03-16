import React, { Component } from 'react'
import '../homePage/AddressBookHome.css'
import editBtn from '../../asset/icons/create-black-18dp.svg'
import deleBtn from '../../asset/icons/delete-black-18dp.svg'
import addBtn from '../../asset/icons/add-24px.svg'
import AddressBookService from '../../service/AddressBookService'
import AddressBookForm from '../formPage/AddressBookForm'

class AddressBookHome extends Component {

    constructor(props) {
        super(props)

        this.state = {
            address: [],
            editStatus: false,
            idToEdit: '',
        }

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);

    }

    onEdit(event) {
        this.setState({
            editStatus: true,
            idToEdit: event.target.id,
        })


    }

    onDelete(event) {
        AddressBookService.deleteAddress(event.target.id).then(res => {
            AddressBookService.getAddressBook()
                .then(res => {
                    this.setState({ address: res.data.data })
                })
        })
    }

    componentDidMount() {
        AddressBookService.getAddressBook()
            .then(res => {
                this.setState({ address: res.data.data })
            })
    }

    render() {

        if (this.state.editStatus == true) {
            return <AddressBookForm addressId={this.state.idToEdit} />
        }

        return (
            <div>
                <div className="main-content">
                    <div className="header-content">
                        <div className="emp-detail-text">
                            Person Detail <div className="emp-content"></div>
                        </div>
                        <a href="/form" className="add-button">
                            <img src={addBtn} alt="" />Add Person</a>
                    </div>

                    <table className="table-main" id="display">

                        <tr>
                            <th>FullName</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th>Phone Number</th>
                        </tr>
                        {this.state.address.map((person) => {
                            return (
                                <tr key={person.id}>
                                    <td>{person.name}</td>
                                    <td>{person.address}</td>
                                    <td>{person.city}</td>
                                    <td>{person.state}</td>
                                    <td>{person.zip}</td>
                                    <td>{person.phone}</td>
                                    <td className="action-content">
                                        <img src={deleBtn} id={person.id} onClick={this.onDelete} alt="delete" />
                                        <img src={editBtn} id={person.id} onClick={this.onEdit} alt="delete" />
                                    </td>
                                </tr>
                            );
                        })}


                    </table>
                </div>

            </div>
        )
    }
}

export default AddressBookHome
