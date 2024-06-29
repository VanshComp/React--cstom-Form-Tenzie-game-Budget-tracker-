import React, { useState } from 'react';

export default function Form() {
    const data = {
        name: '',
        age: '',
        dateOfBirth: {
            day: '',
            month: '',
            year: ''
        },
        gender: '',
        paymentMethod: '',
        paymentDetails: {
            creditCard: {
                cardNumber: '',
                cvv: ''
            },
            paypal: {
                email: '',
                uid: ''
            }
        },
        salary: '',
        hobby: [],
        termsAndConditions: false
    }
    const [hobby, setHobby] = useState("");
    const [formData, setFormData] = useState(data);

    const handleValueChangename = (key, value) => {
        if (/^[a-zA-Z\s]*$/.test(value)) {  
            setFormData((prev) => ({ ...prev, [key]: value }));
        } else {
            alert("Please enter a valid name (letters and spaces only)");
        }
    };

    const handleValueChange = (key, value) => {
        if (isNaN(value)) {
            alert("Please enter a numerical value");
        } else {
            setFormData((prev) => ({ ...prev, [key]: value }));
        }
    };

    const handleValueChangeage = (key, value) => {
        if (isNaN(value)){
            alert("Please enter a numerical value");
        } else {
            setFormData((prev) => ({ ...prev, [key]: value }));
        }
    };

    const DateOfBirthChange = (key, value) => {
        setFormData((prev) => ({ ...prev, dateOfBirth: { ...prev.dateOfBirth, [key]: value } }));
    };


    const PaymentMethodChange = (method) => {
        setFormData((prev) => ({ ...prev, paymentMethod: method }));
    };

    const PaymentDetailsChange = (method, key, value) => {
        setFormData((prev) => ({ ...prev, paymentDetails: { ...prev.paymentDetails, [method]: { ...prev.paymentDetails[method], [key]: value } } }));
    };
    const PaymentDetailsChangeCC = (method, key, value) => {
        if(isNaN(value)){
            alert("Please enter in numerical way")
        }else{
            setFormData((prev) => ({ ...prev, paymentDetails: { ...prev.paymentDetails, [method]: { ...prev.paymentDetails[method], [key]: value } } }));
        }
    };
    const PaymentDetailsChangeCCV = ( method,key, value) => {
        if (isNaN(value)) {
            alert("Please enter in numerical way and Cvv should contain only 3 digits")
        }else{
            setFormData((prev) => ({ ...prev, paymentDetails: { ...prev.paymentDetails, [method]: { ...prev.paymentDetails[method], [key]: value } } }));
        }
    };

    const handleValueChangegender = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }))
    }
    const handleValueChangehobby = (value) => {
        if(value!==' ' && value!==''){
            setFormData((prev) => ({ ...prev, hobby: [...prev.hobby, value] }))
        }else{
            alert("Please input hobby")
        }
        
    }
    const deletehobby = (i) => {
        console.log(i);
        setFormData((prev) => ({ ...prev, hobby: [...prev.hobby.filter((item, index) => i !== index)] }))
    }
    const handleSubmit = () => {
        console.log("Form submitted");
        console.log(formData);
        setFormData(data);
    };
    console.log(formData);

    return (
        <div className="ctrlqFormContentWrapper">
        <div className="ctrlqHeaderMast"></div>
        <div className='body'>
            <div className="form">
                <div className="header">
                    <p className="header-p">Form</p>
                    <p className="header-p1">Please! Fill details down below:</p>
                </div>
                <div className="main">
                    <p className="main-p">Name</p>
                    <input className="main-input" type="text" value={formData.name} onChange={(e) => handleValueChangename('name', e.target.value)} placeholder="Type here" />
                    <hr className='hr'/>
                    <p className="main-p">Age</p>
                    <input className="main-input" type="text" value={formData.age} onChange={(e) => handleValueChangeage('age', e.target.value)} placeholder="Type here" />
                    <hr className='hr'/>
                    <p className="main-p">Date of Birth</p>
                    <select className='day-select' value={formData.dateOfBirth.day} onChange={(e) => DateOfBirthChange('day', e.target.value)}>
                        <option value="" disabled>DD</option>
                        {[...Array(31).keys()].map((item, index) => (
                            <option key={index} value={item + 1}>
                                {item + 1}
                            </option>
                        ))}
                    </select>
                    <select className='day-select' value={formData.dateOfBirth.month} onChange={(e) => DateOfBirthChange('month', e.target.value)}>
                        <option value="" disabled>Month</option>
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <select className='day-select' value={formData.dateOfBirth.year} onChange={(e) => DateOfBirthChange('year', e.target.value)}>
                        <option value="" disabled>Year</option>
                        {[...Array(37).keys()].map((item, index) => (
                            <option key={index} value={item + 1999}>
                                {item + 1999}
                            </option>
                        ))}
                    </select>
                    <p className="main-p">Gender</p>
                    <button className='gender-button' style={{ backgroundColor: formData.gender === 'male' ? "rgba(206, 208, 153, 0.647)" : "grey" }} onClick={() => handleValueChangegender('gender', 'male')}>
                        Male
                    </button>
                    <button className='gender-button' style={{ backgroundColor: formData.gender === 'female' ? "rgba(206, 208, 153, 0.647)" : "grey" }} onClick={() => handleValueChangegender('gender', 'female')}>
                        Female
                    </button>
                    <p className="main-p">Payment Details</p>
                    <div>
                        <input className='payment-method1' type="radio" id="creditCard" name="paymentMethod" checked={formData.paymentMethod === 'creditCard'} onChange={() => PaymentMethodChange('creditCard')} />
                        <label className='payment-label' htmlFor="creditCard">Credit Card</label>
                        {formData.paymentMethod === 'creditCard' && (
                            <>
                                <input className='payment-input' value={formData.paymentDetails.creditCard.cardNumber} onChange={(e) => PaymentDetailsChangeCC('creditCard', 'cardNumber', e.target.value)} placeholder="Enter your Card number" />
                                <hr className='payment-hr3'/>
                                <input type='password' className='payment-input1'  value={formData.paymentDetails.creditCard.cvv} onChange={(e) => PaymentDetailsChangeCCV('creditCard', 'cvv', e.target.value)} placeholder="Enter CVV" />
                                <hr className='payment-hr4'/>
                            </>
                        )}
                    </div>
                    <div>
                        <input className='payment-method2' type="radio" id="paypal" name="paymentMethod" checked={formData.paymentMethod === 'paypal'} onChange={() => PaymentMethodChange('paypal')} />
                        <label className='payment-label' htmlFor="paypal">Paypal</label>
                        {formData.paymentMethod === 'paypal' && (
                            <>
                                <input className='payment-input' value={formData.paymentDetails.paypal.email} onChange={(e) => PaymentDetailsChange('paypal', 'email', e.target.value)} placeholder="Enter your Paypal email" />
                                <hr className='payment-hr1'/>
                                <input type='password' className='payment-input1' value={formData.paymentDetails.paypal.uid} onChange={(e) => PaymentDetailsChangeCC('paypal', 'uid', e.target.value)} placeholder="Enter UID" />
                                <hr className='payment-hr2'/>
                            </>
                        )}
                    </div>
                    <p className="main-p">Salary</p>
                    <input className="main-input" type="text" value={formData.salary} onChange={(e) => handleValueChange('salary', e.target.value)} placeholder="Type here" />
                    <hr className='hr'/>
                    <p className="main-p">Hobby</p>
                    <input className="main-input" value={hobby} onChange={(e) => setHobby(e.target.value)} type="text" onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleValueChangehobby(e.target.value)
                            setHobby('')
                        }
                    }} placeholder="Type here(*maximum 5*)" />
                    <hr className='hr'/>

                    <>
                        {formData.hobby.map((hobby, index) => (
                            <div key={`hobyy_${index}`}>
                                <div className='hobby'>
                                    <li className='hobby-list' key={index}>{hobby}</li>
                                    <button className='hobby-delete' onClick={() => deletehobby(index)}>Delete Hobby</button>
                                </div>
                            </div>
                        ))}
                    </>
                    <div className='terms'>
                        <input className='terms-input' type='checkbox' checked={formData.termsAndConditions} onChange={(e) => handleValueChange('termsAndConditions', e.target.checked)} />
                        <label className='terms-label'>Terms and Conditions</label>
                    </div>
                </div>
                <div className="footer">
                    <button className="footer-button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
        </div>
        
    );
}