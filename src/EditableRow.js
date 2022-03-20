import React from 'react'

function EditableRow({editFormData , handleEditFormChange , handleCancelClick}) {
  return (
    <tr>
        <td>
            <input type="text" required ="required" name="CompanyName" placeholder="Company Name" value={editFormData.CompanyName} onChange={handleEditFormChange}/>
            
        </td>
        <td>
            <input type="text" required ="required" name="CompanyWebsite" placeholder="Company Website" value ={editFormData.CompanyWebsite}onChange ={handleEditFormChange}/>
        </td>
        <td>
            <input type="text" required ="required" name="CompanyPhoneNumber" placeholder="Company Phone Number" value={editFormData.CompanyPhoneNumber} onChange ={handleEditFormChange}/>
        </td>
        <td>
            <input type="text" required ="required" name="CompanyAddress" placeholder="Company Address" value={editFormData.CompanyAddress} onChange ={handleEditFormChange}/>
        </td>
        <td>
            <input type="text" required ="required" name="CompanyCity" placeholder="Company City" value={editFormData.CompanyCity} onChange ={handleEditFormChange}/>
        </td>
        <td>
            <input type="text" required ="required" name="CompanyState" placeholder="Company State" value={editFormData.CompanyState} onChange ={handleEditFormChange}/>
        </td>
        <td>
            <input type="text" required ="required" name="CompanyCountry" placeholder="Company Country" value={editFormData.CompanyCountry} onChange ={handleEditFormChange}/>
        </td>
        <td>
            <input type="text" required ="required" name="IndustryList" placeholder="Industry List" value={editFormData.IndustryList} onChange ={handleEditFormChange}/>
        </td>
        <td>
            <button type="submit">Save Company</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </td>
    </tr>
  )
}

export default EditableRow