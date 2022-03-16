import React, { Component } from 'react'
import AddressBookService from '../../service/AddressBookService';
import '../formPage/AddessBookForm.css'
import cancelBtn from '../../asset/icons/cancel.svg'
import AddressBookHome from '../homePage/AddressBookHome';


class AddressBookForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nameError: '',
            id: '',
            isUpdated: false,
        }

        this.onSave = this.onSave.bind(this);
        this.onReset = this.onReset.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({ id: this.props.addressId })

        AddressBookService.getAddressById(this.props.addressId)
            .then(res => {
                this.setState({
                    name: res.data.data.name,
                    address: res.data.data.address,
                    city: res.data.data.city,
                    state: res.data.data.state,
                    zip: res.data.data.zip,
                    phone: res.data.data.phone
                })
            })
    }

    onSave(event) {
        event.preventDefault();

        let object = {
            name: this.state.name,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            phone: this.state.phone
        }

        if (this.state.id) {
            AddressBookService.updateAddress(object, this.state.id)
                .then(res => {
                    alert("updated succeddfully")
                    this.setState({
                        name: '',
                        address: '',
                        city: '',
                        state: '',
                        zip: '',
                        phone: '',
                        nameError: '',
                        isUpdated: true,
                    })
                })
        }
        else {
            AddressBookService.addAddress(object)
                .then(res => {
                    alert("saved succeddfully")
                    this.setState({
                        name: '',
                        address: '',
                        city: '',
                        state: '',
                        zip: '',
                        phone: '',
                        nameError: '',
                    })
                    this.onReset();
                })
        }

    }

    onReset() {
        this.setState({
            name: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            nameError: '',
        })
    }

    handleChange(event) {

        if (event.target.name === 'name') {
            let name = RegExp('^[A-Z]{1}[a-z]{3,}$')
            if (name.test(event.target.value))
                this.setState({ nameError: "" })
            else this.setState({ nameError: "Invalid name" })
        }

        this.setState({ [event.target.name]: event.target.value });
    }

    render() {

        if (this.state.isUpdated){
            return <AddressBookHome/>
        }

        return (
            <div>
                <div className="form-content">
                    <div className="form-container">

                        <form action="" className="form" autoComplete="off">
                            <div className="header-row">
                                <div className="form-head">
                                    Person Address form
                                </div>
                                <a href="/"> <img src={cancelBtn} alt="" className="cancel-btn" />
                                </a>

                            </div>

                            <div className="form-rows">
                                <div className="row-content">
                                    <label className="input">Full Name
                                    </label>
                                    <input className="input__field" type="text" placeholder=" " name="name" value={this.state.name} onChange={this.handleChange} />

                                    <error-output className="name-error" >{this.state.nameError}</error-output>
                                </div>

                                <div className="row-content">
                                    <label className="input" >
                                        Phone Number
                                    </label>
                                    <input className="input__field" type="tel" placeholder=" " name="phone" value={this.state.phone} onChange={this.handleChange} />
                                    <error-output className="phone-error" ></error-output>
                                </div>

                                <div className="row-content">
                                    <label className="input" >
                                        Address
                                    </label>
                                    <textarea className="input__field address-field" type="text" placeholder=" "
                                        name="address" value={this.state.address} onChange={this.handleChange}></textarea>
                                    <error-output className="address-error"></error-output>
                                </div>

                                <div className="add-content">
                                    <div className="row-content">
                                        <label className="input">
                                            City
                                        </label>
                                        <select name="city" id="city" className="dropDown" value={this.state.city} onChange={this.handleChange}>
                                            <option value="Select City">Select City</option>
                                            <option value="Salem">Salem</option>
                                            <option value="Coimbatore">Coimbatore</option>
                                        </select>
                                    </div>

                                    <div className="row-content">
                                        <label className="input" >
                                            State
                                        </label>
                                        <select name="state" id="State" className="dropDown" value={this.state.state} onChange={this.handleChange}>
                                            <option value="Select State">Select State</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Kerla">Kerla</option>
                                        </select>
                                    </div>

                                    <div className="row-content zip-content">
                                        <label className="input"  >
                                            Zip Code
                                        </label>
                                        <input className="input__field" type="number" placeholder=" " name="zip" value={this.state.zip} onChange={this.handleChange} />

                                    </div>
                                </div>
                                <div className="buttonParent">
                                    <button className="button submitButton" id="submitButton" onClick={this.onSave}
                                        type="submit">Add</button>
                                    <button className="button resetButton" type="reset"
                                        onClick={this.onReset}>Reset</button>
                                        <button
										className="button submitButton"
										id="submitButton"
										onClick={this.onSave}
										type="submit"
									>
										Update
									</button>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddressBookForm;