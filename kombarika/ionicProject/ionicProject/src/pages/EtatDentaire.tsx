import React, {useState, useEffect} from "react";
import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {
    IonPage,
    IonContent,
    IonButton
} from '@ionic/react';

function Etat Dentaire(){
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
    const itemDetails = [etatDentaire].find(item => item.idClient === itemKey);
    setSelectedItem(itemDetails);
  };

	const [etat_dentaire, setEtat_dentaire] = useState([]);
	
	const [dent, setDent] = useState([]);
	
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
        const response = await fetch(url + '[etatDentaire]', {
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
        const response = await fetch(url + '[etatDentaire]', {
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
      const response = await fetch(url + '[etatDentaire]', {
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

	const handleSelectDentChange = (event) => {
		setSelectedItem({ ...selectedItem, dent: event.target.value });
	};
	
	const handleSelectClientChange = (event) => {
		setSelectedItem({ ...selectedItem, client: event.target.value });
	};
	
	const handleInputEtatChange = (event) => {
		setSelectedItem({ ...selectedItem, etat: event.target.value });
	};
	
	

	useEffect(() => {
		const getEtat_dentaire = async () => {
			try {
				const response = await fetch(url + 'etat_dentaire');
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json();
				setEtat_dentaire(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getEtat_dentaire();
	}, []);
	useEffect(() => {
		const getDent = async () => {
			try {
				const response = await fetch(url + 'dent');
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json();
				setDent(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getDent();
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
                      Add Etat Dentaire
                  </IonButton>
                </div>    

                  <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                      <Modal.Title>Add Etat Dentaire</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <form action="" method="" id="insert" onSubmit={handleSaveSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">Etat</label> 
	 	<input className="form-control" type="number" name="etat" />
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
			<th> Numero </th>
			<th> Id Client </th>
			<th> Etat </th>

                          <th></th>
                          <th></th>
                      </tr>
                  </thead>    
                  <tbody id="table-body">
                      {[etatDentaire].map((item) => (
                              <tr key={item.idClient}>
		<td>{item.dent.numero}</td>
		<td>{item.client.numero}</td>
		<td>{item.etat}</td>

                              <td>
                                  <IonButton key={item.idClient} onClick={() => handleDeleteClick(item)}>
                                      Delete
                                  </IonButton>
                              </td>   
                              <td>
                                  <IonButton key={item.idClient} onClick={() => handleSelectItem(item.idClient)}>
                                      Update
                                  </IonButton>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              <Modal show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                      <Modal.Title>Update Etat Dentaire</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>    
                      <form action="" method="" id="update" onSubmit={handleUpdateSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label"></label> 
	 	<input className="form-control" type="hidden" name="numero" onChange={handleInputNumeroChange} value={selectedItem ? selectedItem.numero:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label"></label> 
	 	<input className="form-control" type="hidden" name="idClient" onChange={handleInputIdClientChange} value={selectedItem ? selectedItem.idClient:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">Etat</label> 
	 	<input className="form-control" type="number" name="etat" onChange={handleInputEtatChange} value={selectedItem ? selectedItem.etat:''} />
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

export default Etat Dentaire;
