import React, {useState, useEffect} from "react";
import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {
    IonPage,
    IonContent,
    IonButton
} from '@ionic/react';

function Prestation(){
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
    const itemDetails = [prestation].find(item => item.idPrestation === itemKey);
    setSelectedItem(itemDetails);
  };

	const [prestation, setPrestation] = useState([]);
	
	

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
        const response = await fetch(url + '[prestation]', {
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
        const response = await fetch(url + '[prestation]', {
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
      const response = await fetch(url + '[prestation]', {
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

	const handleInputFinEtatChange = (event) => {
		setSelectedItem({ ...selectedItem, finEtat: event.target.value });
	};
	
	const handleInputDebutEtatChange = (event) => {
		setSelectedItem({ ...selectedItem, debutEtat: event.target.value });
	};
	
	const handleInputIdPrestationChange = (event) => {
		setSelectedItem({ ...selectedItem, idPrestation: event.target.value });
	};
	
	const handleInputNomChange = (event) => {
		setSelectedItem({ ...selectedItem, nom: event.target.value });
	};
	
	const handleInputPointChange = (event) => {
		setSelectedItem({ ...selectedItem, point: event.target.value });
	};
	
	

	useEffect(() => {
		const getPrestation = async () => {
			try {
				const response = await fetch(url + 'prestation');
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json();
				setPrestation(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getPrestation();
	}, []);
	

  return (
    <IonPage>
      <IonContent>
          <div className="row justify-content-end">
              <div className="col" >   
                <div className="row">
                  <IonButton onClick={handleShow}>
                      Add Prestation
                  </IonButton>
                </div>    

                  <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                      <Modal.Title>Add Prestation</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <form action="" method="" id="insert" onSubmit={handleSaveSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">Fin Etat</label> 
	 	<input className="form-control" type="number" name="finEtat" />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">Debut Etat</label> 
	 	<input className="form-control" type="number" name="debutEtat" />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">Nom</label> 
	 	<input className="form-control" type="text" name="nom" />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">Point</label> 
	 	<input className="form-control" type="number" name="point" />
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
			<th> Fin Etat </th>
			<th> Debut Etat </th>
			<th> Id Prestation </th>
			<th> Nom </th>
			<th> Point </th>

                          <th></th>
                          <th></th>
                      </tr>
                  </thead>    
                  <tbody id="table-body">
                      {[prestation].map((item) => (
                              <tr key={item.idPrestation}>
		<td>{item.finEtat}</td>
		<td>{item.debutEtat}</td>
		<td>{item.idPrestation}</td>
		<td>{item.nom}</td>
		<td>{item.point}</td>

                              <td>
                                  <IonButton key={item.idPrestation} onClick={() => handleDeleteClick(item)}>
                                      Delete
                                  </IonButton>
                              </td>   
                              <td>
                                  <IonButton key={item.idPrestation} onClick={() => handleSelectItem(item.idPrestation)}>
                                      Update
                                  </IonButton>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              <Modal show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                      <Modal.Title>Update Prestation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>    
                      <form action="" method="" id="update" onSubmit={handleUpdateSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">Fin Etat</label> 
	 	<input className="form-control" type="number" name="finEtat" onChange={handleInputFinEtatChange} value={selectedItem ? selectedItem.finEtat:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">Debut Etat</label> 
	 	<input className="form-control" type="number" name="debutEtat" onChange={handleInputDebutEtatChange} value={selectedItem ? selectedItem.debutEtat:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label"></label> 
	 	<input className="form-control" type="hidden" name="idPrestation" onChange={handleInputIdPrestationChange} value={selectedItem ? selectedItem.idPrestation:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">Nom</label> 
	 	<input className="form-control" type="text" name="nom" onChange={handleInputNomChange} value={selectedItem ? selectedItem.nom:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">Point</label> 
	 	<input className="form-control" type="number" name="point" onChange={handleInputPointChange} value={selectedItem ? selectedItem.point:''} />
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

export default Prestation;
