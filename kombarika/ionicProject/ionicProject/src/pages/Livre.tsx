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

function livre(){
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
    const itemDetails = livre.find(item => item.idLivre === itemKey);
    setSelectedItem(itemDetails);
  };


  const [limite, setLimite] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

	const [livre, setLivre] = useState([]);
	
	const [idAuteur, setIdAuteur] = useState([]);
	
	const [idCategories, setIdCategories] = useState([]);
	
	

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
        const response = await fetch(url + '[livre]', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+sessionStorage.getItem('token')
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
          data[key] = { [key]: value };
        } else {
          data[key] = value;
        }
      }
      try {
        const response = await fetch(url + '[livre]', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+sessionStorage.getItem('token')
          },
          body: JSON.stringify(data)
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        handleClose2();
        // If you want to reload the page after success
        // window.location.reload();
      } catch (error) {
        console.error('Error:', error);
      }
  };

//////// DELETE
  const handleDeleteClick = async (item) => {
    try {
      console.log(item);
      const response = await fetch(url + '[livre]', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
            Authorization: 'Bearer '+sessionStorage.getItem('token')
        },
        body: JSON.stringify(item)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // If you want to reload the page after success
      // window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

	const handleInputIdLivreChange = (event) => {
		setSelectedItem({ ...selectedItem, idLivre: event.target.value });
	};
	
	const handleSelectIdAuteurChange = (event) => {
		setSelectedItem({ ...selectedItem, idAuteur: event.target.value });
	};
	
	const handleInputTitreChange = (event) => {
		setSelectedItem({ ...selectedItem, titre: event.target.value });
	};
	
	const handleSelectIdCategoriesChange = (event) => {
		setSelectedItem({ ...selectedItem, idCategories: event.target.value });
	};
	
	const handleInputDescriptionChange = (event) => {
		setSelectedItem({ ...selectedItem, description: event.target.value });
	};
	
	

	useEffect(() => {
		const getLivre = async () => {
			try {
				const response = await fetch(url + '[livre]/'+currentPage , {
	 headers: {
	 "Authorization" : "Bearer " + sessionStorage.getItem('token') 
	} 
	});
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json();
	 const c = response.headers.get('X-Total-Count'); 
	 			 setCount(c); 
	 			setLivre(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getLivre();
	}, [currentPage]);
	useEffect(() => {
		const getIdAuteur = async () => {
			try {
				const response = await fetch(url + '[auteur]/' , {
	 headers: {
	 "Authorization" : "Bearer " + sessionStorage.getItem('token') 
	} 
	});
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json(); 
	 			setIdAuteur(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getIdAuteur();
	}, []);
	useEffect(() => {
		const getIdCategories = async () => {
			try {
				const response = await fetch(url + '[categories]/' , {
	 headers: {
	 "Authorization" : "Bearer " + sessionStorage.getItem('token') 
	} 
	});
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json(); 
	 			setIdCategories(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getIdCategories();
	}, []);
	

  return (
    <IonPage>
      <IonContent>
          <div className="row justify-content-end">
              <div className="col" >   

                  <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                      <Modal.Title>Add livre</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <form action="" method="" id="insert" onSubmit={handleSaveSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">auteur</label> 
	 	<select className="form-control" name="idAuteur" id="select-idAuteur">
			{idAuteur.map((elt) => (
				<option value={elt.idAuteur}>{elt.nom}</option>
			))}
			
		</select>
	</div><div className="mb-3"> 
	 	<label className="form-label">Titre</label> 
	 	<input className="form-control" type="text" name="titre" />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">categories</label> 
	 	<select className="form-control" name="idCategories" id="select-idCategories">
			{idCategories.map((elt) => (
				<option value={elt.idCategories}>{elt.libele}</option>
			))}
			
		</select>
	</div><div className="mb-3"> 
	 	<label className="form-label">Description</label> 
	 	<input className="form-control" type="text" name="description" />
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
			<th> Id Livre </th>
			<th> Id Auteur </th>
			<th> Titre </th>
			<th> Id Categories </th>
			<th> Description </th>

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
                      {livre.map((item) => (
                              <tr key={item.idLivre}>
		<td>{item.idLivre}</td>
		<td>{item.idAuteur.libele}</td>
		<td>{item.titre}</td>
		<td>{item.idCategories.libele}</td>
		<td>{item.description}</td>

                              <td>
                                  <IonButton color="danger  " key={item.idLivre} onClick={() => handleDeleteClick(item)}>
                                      <IonIcon icon={trashBinOutline} />
                                  </IonButton>
                              </td>   
                              <td>
                                  <IonButton key={item.idLivre} onClick={() => handleSelectItem(item.idLivre)}>
                                      <IonIcon icon={pencilSharp} />
                                  </IonButton>
                              </td>
                          </tr>
                      ))}
                      <tr>
                <td>
                  Showing {livre.length} result(s) of {count}
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
                      <Modal.Title>Update livre</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>    
                      <form action="" method="" id="update" onSubmit={handleUpdateSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label"></label> 
	 	<input className="form-control" type="hidden" name="idLivre" onChange={handleInputIdLivreChange} value={selectedItem ? selectedItem.idLivre:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">Auteur</label> 
	 	<select className="form-control" name="auteur">
		{idAuteur.map((elt) => (
		<option value={elt.idCategories}>{elt.nom}</option>
	))}
	
	</select>
	</div><div className="mb-3"> 
	 	<label className="form-label">Titre</label> 
	 	<input className="form-control" type="text" name="titre" onChange={handleInputTitreChange} value={selectedItem ? selectedItem.titre:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">Categories</label> 
	 	<select className="form-control" name="categories">
		{idCategories.map((elt) => (
		<option value={elt.idCategories}>{elt.libele}</option>
	))}
	
	</select>
	</div><div className="mb-3"> 
	 	<label className="form-label">Description</label> 
	 	<input className="form-control" type="text" name="description" onChange={handleInputDescriptionChange} value={selectedItem ? selectedItem.description:''} />
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

export default livre;