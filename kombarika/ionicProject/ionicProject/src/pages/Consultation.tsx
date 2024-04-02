import React, {useState, useEffect} from "react";
import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {
    IonPage,
    IonContent,
    IonButton
} from '@ionic/react';

function Consultation(){
  const url = 'http://localhost:5106/api';
  
  const [loading, setLoading] = useState(true);
  
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [show2, setShow2] = useState(false);
  
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
   const [isOpen, setIsOpen] = useState(false);
  const handleSelectItem = (itemKey) => {
    handleShow2();
    const itemDetails = [consultation].find(item => item.idConsultation === itemKey);
    setSelectedItem(itemDetails);
  };

	const [consultation, setConsultation] = useState([]);
	
	const [client, setClient] = useState([]);
	
	

//////// SAVE
  const handleSaveSubmit = async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const data = {};
  
      for (let [key, value] of formData.entries()) {
        if (form.elements[key].tagName === 'SELECT') {
          data[key] = { id: value };
        } else {
          data[key] = value;
        }
      }
  
      try {
        const response = await fetch(url + '[consultation]', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        handleClose();
        // If you want to reload the page after success
        window.location.reload();
      } catch (error) {
        console.log('Error:', error);
      }
  };

//////// UPDATE
  const handleUpdateSubmit = async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const data = {};
      for (let [key, value] of formData.entries()) {
        if (form.elements[key].tagName === 'SELECT') {
          data[key] = { id: value };
        } else {
          data[key] = value;
        }
      }
      try {
        const response = await fetch(url + '[consultation]', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        handleClose2();
        // If you want to reload the page after success
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
      }
  };

//////// DELETE
  const handleDeleteClick = async (item) => {
    try {
      console.log(item);
      const response = await fetch(url + '[consultation]', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // If you want to reload the page after success
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

	const handleInputDateConsultationChange = (event) => {
		setSelectedItem({ ...selectedItem, dateConsultation: event.target.value });
	};
	
	const handleSelectClientChange = (event) => {
		setSelectedItem({ ...selectedItem, client: event.target.value });
	};
	
	const handleInputIdConsultationChange = (event) => {
		setSelectedItem({ ...selectedItem, idConsultation: event.target.value });
	};
	
	

	useEffect(() => {
		const getConsultation = async () => {
			try {
				const response = await fetch(url + 'consultation');
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json();
				setConsultation(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getConsultation();
	}, []);
	useEffect(() => {
		const getClient = async () => {
			try {
				const response = await fetch(url + 'client');
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json();
				setClient(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getClient();
	}, []);
	

  return (
    <IonPage>
      <IonContent>
          <div className="row justify-content-end">
              <div className="col" >   
                <div className="row">
                  <IonButton onClick={handleShow}>
                      Add Consultation
                  </IonButton>
                </div>    

                  <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                      <Modal.Title>Add Consultation</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <form action="" method="" id="insert" onSubmit={handleSaveSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">Date Consultation</label> 
	 	<input className="form-control" type="Date" name="dateConsultation" />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">idConsultation</label> 
	 	<select className="form-control" name="client" id="select-client">
			{client.map((elt) => (
				<option value={elt.idClient}>{elt.idClient}</option>
			))}
			
		</select>
	</div>
                              <div className="mb-3">
                                <IonButton type= "submit" >
                                  Save Changes
                                </IonButton>
                              </div>
                          </form>
                      </Modal.Body>
                      <Modal.Footer>
                      </Modal.Footer>
                  </Modal>
              </div>
              
          </div>
          <div className="row">
              <table className="table">
                  <thead id="table-head">
                      <tr>
			<th> Date Consultation </th>
			<th> Id Client </th>
			<th> Id Consultation </th>

                          <th></th>
                          <th></th>
                      </tr>
                  </thead>    
                  <tbody id="table-body">
                      {[consultation].map((item) => (
                              <tr key={item.idConsultation}>
		<td>{item.dateConsultation}</td>
		<td>{item.client.idClient}</td>
		<td>{item.idConsultation}</td>

                              <td>
                                  <IonButton key={item.idConsultation} onClick={() => handleDeleteClick(item)}>
                                      Delete
                                  </IonButton>
                              </td>   
                              <td>
                                  <IonButton key={item.idConsultation} onClick={() => handleSelectItem(item.idConsultation)}>
                                      Update
                                  </IonButton>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              <Modal show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                      <Modal.Title>Update Consultation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>    
                      <form action="" method="" id="update" onSubmit={handleUpdateSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">Date Consultation</label> 
	 	<input className="form-control" type="Date" name="dateConsultation" onChange={handleInputDateConsultationChange} value={selectedItem ? selectedItem.dateConsultation:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">idConsultation</label> 
	 	<select className="form-control" name="client">
			{client.map((elt) => (
		<option value={elt.idClient}>{elt.idClient}</option>
	))}
	
	
	</select>
	</div><div className="mb-3"> 
	 	<label className="form-label"></label> 
	 	<input className="form-control" type="hidden" name="idConsultation" onChange={handleInputIdConsultationChange} value={selectedItem ? selectedItem.idConsultation:''} />
	</div>
	
                          <div className="mb-3">
                            <IonButton type= "submit" >
                              Save Changes
                            </IonButton>
                          </div>
                      </form>  
                  </Modal.Body>
                  <Modal.Footer>

                  </Modal.Footer>
              </Modal>
          </div>
      </IonContent>
    </IonPage>
  )
}

export default Consultation;
