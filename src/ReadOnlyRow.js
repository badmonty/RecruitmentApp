import React from 'react'

function ReadOnlyRow({contact , handleEditClick , handleDeleteClick}) {
  return (
 
          <tr>
                    <td>{contact.CompanyName}</td>
                    <td>{contact.CompanyWebsite}</td>
                    <td>{contact.CompanyPhoneNumber}</td>
                    <td>{contact.CompanyAddress}</td>
                    <td>{contact.CompanyCity}</td>
                    <td>{contact.CompanyState}</td>
                    <td>{contact.CompanyCountry}</td>
                    <td>{contact.IndustryList}</td>
                    <td>
                    <button type ="button" onClick={(event) => handleEditClick (event , contact)}>Edit Company</button>
                    <button type ="button" onClick={(event) => handleDeleteClick(event , contact.id)}>Delete Company</button>
                  </td>
         </tr>
   
  )
}

export default ReadOnlyRow