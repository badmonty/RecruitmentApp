import React, {Fragment, useState} from 'react'
import "./Table.css"
import data from "./mock-data.json"
import {nanoid} from 'nanoid'
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';

function Table() {
    const [contacts , setContacts] = useState(data);
    const [addFormData , setAddFormData] = useState({
      CompanyName: "",
      CompanyWebsite: "",      
      CompanyPhoneNumber: "",
      CompanyAddress: "",
      CompanyCity: "",
      CompanyState: "",
      CompanyCountry: "",
      IndustryList: "",
    });

    const [editFormData , setEditFormData] = useState({
        CompanyName: "",
        CompanyWebsite: "",      
        CompanyPhoneNumber: "",
        CompanyAddress: "",
        CompanyCity: "",
        CompanyState: "",
        CompanyCountry: "",
        IndustryList: "",
    });

     const [editContactId, setEditContactId] = useState(null);

    const handleAddFormChange =(event) =>{
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    };

      const handleEditFormChange =(event) =>{
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = (event) =>{
    event.preventDefault();
      const newContact ={
          id: nanoid(),
        CompanyName: addFormData.CompanyName,
        CompanyWebsite: addFormData.CompanyWebsite,
        CompanyPhoneNumber: addFormData.CompanyPhoneNumber,
        CompanyAddress: addFormData.CompanyAddress,
        CompanyCity: addFormData.CompanyCity,
        CompanyState: addFormData.CompanyState,
        CompanyCountry: addFormData.CompanyCountry,
        IndustryList: addFormData.IndustryList,

      };
      const newContacts =[...contacts, newContact];
        setContacts(newContacts);
    };
       



    const handleEditFormSubmit = (event) =>{
        event.preventDefault();

        const editedContact ={
            id: editContactId,
           CompanyName: editFormData.CompanyName,
           CompanyWebsite: editFormData.CompanyWebsite,
           CompanyPhoneNumber: editFormData.CompanyPhoneNumber,
           CompanyAddress: editFormData.CompanyAddress,
           CompanyCity: editFormData.CompanyCity,
           CompanyState: editFormData.CompanyState,
           CompanyCountry: editFormData.CompanyCountry,
           IndustryList: editFormData.IndustryList,
           };
           const newContacts =[...contacts];
              const index = contacts.findIndex((contact) => contact.id === editContactId);
                newContacts[index] = editedContact;
                setContacts(newContacts);
                setEditContactId(null);
    };

    const handleEditClick =(event, contact) =>{
        event.preventDefault();
        setEditContactId(contact.id);

        const formValues ={
            CompanyName: contact.CompanyName,
            CompanyWebsite: contact.CompanyWebsite,
            CompanyPhoneNumber: contact.CompanyPhoneNumber,
            CompanyAddress: contact.CompanyAddress,
            CompanyCity: contact.CompanyCity,
            CompanyState: contact.CompanyState,
            CompanyCountry: contact.CompanyCountry,
            IndustryList: contact.IndustryList,
        };
        setEditFormData(formValues);
    };
    const handleCancelClick=() => {
        setEditContactId(null);
    };
     const handleDeleteClick =(event, contactId) =>{
         const newContacts = [...contacts];
         const index = contacts.findIndex((contact) => contact.id === contactId);
         newContacts.splice(index, 1);
            setContacts(newContacts);
     }
  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Company Website</th>
                    <th>Company Phone Number</th>
                    <th>Company Address</th>
                    <th>Company City</th>
                    <th>Company State</th>
                    <th>Company Country</th>
                    <th>Industry List</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {contacts.map((contact) => (
                <Fragment>
               {editContactId === contact.id ? ( 
                <EditableRow editFormData={editFormData} handleEditFormChange ={handleEditFormChange} handleCancelClick={handleCancelClick}/>
                ) : ( 
                    <ReadOnlyRow contact={contact}
                        handleEditClick = {handleEditClick}
                        handleDeleteClick = {handleDeleteClick}
                    />
               )}
               
             
              </Fragment>
            ))}
               
           </tbody>
        </table>
        </form>
        <h2>ADD Company</h2>
        <form onSubmit={handleAddFormSubmit}>
            <input type="text" name="CompanyName" required="required" placeholder="Company Name..." onChange={handleAddFormChange}/>
            <input type="text" name="CompanyWebsite" required="required" placeholder="Company Website..." onChange={handleAddFormChange}/>
            <input type="number" name="CompanyPhoneNumber" required="required" placeholder="Company Phone Number..." onChange={handleAddFormChange}/>
            <input type="address" name="CompanyAddress" required="required" placeholder="Company Address..." onChange={handleAddFormChange}/>
            <input type="text" name="CompanyCity" required="required" placeholder="Company City..." onChange={handleAddFormChange}/>
            <input type="text" name="CompanyState" required="required" placeholder="Company State..." onChange={handleAddFormChange}/>
            <input type="text" name="CompanyCountry" required="required" placeholder="Company Country..." onChange={handleAddFormChange}/>
            <input type="text" name="IndustryList" required="required" placeholder="Industry List..." onChange={handleAddFormChange}/>
            <button type="submit">Add Company</button>
        </form>
    </div>
  )
}

export default Table