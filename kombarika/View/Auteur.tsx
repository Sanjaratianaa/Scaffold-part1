import React, {useState, useEffect} from "react";
import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import {
    IonPage,
    IonContent,
    IonButton,
    IonIcon
} from '@ionic/react';

import { addCircleOutline, pencilOutline, pencilSharp, trashBinOutline } from "ionicons/icons";

function auteur(){
  const url = 'http://localhost:5106/api/';
  
  const [loading, setLoading] = useState(true);
  
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [show2, setShow2] = useState(false);
  const [count, setCount] = useState(0);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
   const [isOpen, setIsOpen] = useState(false);
  const handleSelectItem = (itemKey) => {
    handleShow2();
    const itemDetails = auteur.find(item => item.idAuteur === itemKey);
    setSelectedItem(itemDetails);
  };


  const [limite, setLimite] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

	const [auteur, setAuteur] = useState([]);
	
	

 const getPage = () => {
    return Math.floor(count / limite);
  };

  const nextResult = (event) => {
    const requiredPage = getPage();
    const element = event.target;
    const prevButton = document.getElementById('prev-button');
    prevButton?.setAttribute('disabled', false);
    if (currentPage == requiredPage) {
      element.setAttribute("disabled", '');
      console.log('Going to next Page man finished');
    } else {
      setCurrentPage(currentPage + 1);
      console.log('Going to next Page man');
    }
  };

  const prevResult = (event) => {
    const element = event.target;
    const nextButton = document.getElementById('next-button');
    nextButton?.setAttribute('disabled', 'false');
    if (currentPage == 1) {
      element.setAttribute('disabled', '');
    } else {
      setCurrentPage(currentPage - 1);
      // nextButton?.setAttribute('disabled', 'false');
    }
  };


//////// SAVE
  const handleSaveSubmit = async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const data = {};
  
      for (let [key, value] of formData.entries()) {
        if (form.elements[key].tagName === 'SELECT') {
          data[key] = { [key]: value };
        } else {
          data[key] = value;
        }
      }
  
      try {
        const response = await fetch(url + '[auteur]', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+sessionStorage.getItem('token')
          }
        });
  
        if (!response.ok) {
          //throw new Error('Network response was not ok');
        }
  
        handleClose();
        setLoading(true);
        // If you want to reload the page after success
        // window.location.reload();
      } catch (error) {
        console.log('Error:', error);
        alert(error);
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
          data[key] = { [key]: value };
        } else {
          data[key] = value;
        }
      }
      try {
        const response = await fetch(url + '[auteur]', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+sessionStorage.getItem('token')
          },
          body: JSON.stringify(data)
        });
  
        if (!response.ok) {
          //throw new Error('Network response was not ok');
        }
        handleClose2();
        setLoading(true);
        // If you want to reload the page after success
        // window.location.reload();
      } catch (error) {
        alert(error);
      }
  };

//////// DELETE
  const handleDeleteClick = async (item) => {
    try {
      console.log(item);
      const response = await fetch(url + '[auteur]', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
            Authorization: 'Bearer '+sessionStorage.getItem('token')
        },
        body: JSON.stringify(item)
      });
      if (!response.ok) {
        //throw new Error('Network response was not ok');
      }
      setLoading(true);
      // If you want to reload the page after success
      // window.location.reload();
    } catch (error) {
      //console.error('Error:', error);
      alert(error);
    }
  };

	const handleInputIdAuteurChange = (event) => {
		setSelectedItem({ ...selectedItem, idAuteur: event.target.value });
	};
	
	const handleInputNomChange = (event) => {
		setSelectedItem({ ...selectedItem, nom: event.target.value });
	};
	
	const handleInputPrenomChange = (event) => {
		setSelectedItem({ ...selectedItem, prenom: event.target.value });
	};
	
	

	useEffect(() => {
		const getAuteur = async () => {
			try {
				const response = await fetch(url + '[auteur]/'+currentPage , {
	 headers: {
	 "Authorization" : "Bearer " + sessionStorage.getItem('token') 
	} 
	});
					if (!response.ok) {
						//throw new Error('Network response was not ok');
					};
				const data = await response.json();
	 const c = response.headers.get('X-Total-Count'); 
	 			 setCount(c); 
	 			setAuteur(data);
			} catch (error) {
				alert(error);
			} finally {
				setLoading(false);
			}
		};
		getAuteur();
	}, [currentPage, loading]);
	

  return (
    <IonPage>
      <IonContent>
          <div className="row justify-content-end">
              <div className="col" >   

                  <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                      <Modal.Title>Add auteur</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <form action="" method="" id="insert" onSubmit={handleSaveSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">Nom</label> 
	 	<input className="form-control" type="text" name="nom" />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">Prenom</label> 
	 	<input className="form-control" type="text" name="prenom" />
	</div>
	
                              <div className="mb-3">
                                <IonButton color="success" type= "submit" >
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
          <div className="table-responsive">
              <table className="table">
                  <thead id="table-head">
                      <tr>
			<th> Id Auteur </th>
			<th> Nom </th>
			<th> Prenom </th>

                          <th></th>
                          <th></th>
                          <th>
                            <IonButton onClick={handleShow}>
                                  <IonIcon icon={addCircleOutline} />
                            </IonButton>
                          </th>
                      </tr>
                  </thead>    
                  <tbody id="table-body">
                      {auteur.map((item) => (
                              <tr key={item.idAuteur}>
		<td>{item.idAuteur}</td>
		<td>{item.nom}</td>
		<td>{item.prenom}</td>

                              <td>
                                  <IonButton color="danger  " key={item.idAuteur} onClick={() => handleDeleteClick(item)}>
                                      <IonIcon icon={trashBinOutline} />
                                  </IonButton>
                              </td>   
                              <td>
                                  <IonButton key={item.idAuteur} onClick={() => handleSelectItem(item.idAuteur)}>
                                      <IonIcon icon={pencilSharp} />
                                  </IonButton>
                              </td>
                          </tr>
                      ))}
                      <tr>
                <td>
                  Showing {auteur.length} result(s) of {count}
                </td>
                <td>
                  <IonButton disabled={ (currentPage == 1) ? 'true' : 'false' } id="prev-button" onClick={(event) => prevResult(event)}> Prev </IonButton>
                </td>
                <td>
                  <IonButton id="next-button" onClick={(event) => nextResult(event)}> Next </IonButton>
                </td>
              </tr>
                  </tbody>
              </table>
              <Modal show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                      <Modal.Title>Update auteur</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>    
                      <form action="" method="" id="update" onSubmit={handleUpdateSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label"></label> 
	 	<input className="form-control" type="hidden" name="idAuteur" onChange={handleInputIdAuteurChange} value={selectedItem ? selectedItem.idAuteur:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">Nom</label> 
	 	<input className="form-control" type="text" name="nom" onChange={handleInputNomChange} value={selectedItem ? selectedItem.nom:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">Prenom</label> 
	 	<input className="form-control" type="text" name="prenom" onChange={handleInputPrenomChange} value={selectedItem ? selectedItem.prenom:''} />
	</div>
	
                          <div className="mb-3">
                            <IonButton color="success" type= "submit" >
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

export default auteur;
