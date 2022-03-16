import axios from 'axios';
import React from 'react'
class AddressBookService extends React.Component {
    baseUrl = `http://localhost:8080/addressbook/`;

    addAddress = (data) => {
        return axios.post(this.baseUrl + 'create', data)
    }

    getAddressBook = () => {
        return axios.get(this.baseUrl + 'get')
    }

    getAddressById = (id) => {
        return axios.get(this.baseUrl + 'get/' + id)
    }

    updateAddress = (data, id) => {
        return axios.put(this.baseUrl + 'update/' + id, data)
    }

    deleteAddress = (data) => {
        return axios.delete(this.baseUrl + 'delete/' + data)
    }
}

export default new AddressBookService();