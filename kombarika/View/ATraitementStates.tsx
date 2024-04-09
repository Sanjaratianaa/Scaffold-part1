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

function aTraitementStates(){
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
    const itemDetails = aTraitementStates.find(item => item.id === itemKey);
    setSelectedItem(itemDetails);
  };


  const [limite, setLimite] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

	const [aTraitementStates, setA_traitement_states] = useState([]);
	
	const [refTraitement, setRefTraitement] = useState([]);
	
	const [state, setState] = useState([]);
	
	

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
          data[key] = { id: value };
        } else {
          data[key] = value;
        }
      }
  
      try {
        const response = await fetch(url + '[aTraitementStates]', {
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
          data[key] = { id: value };
        } else {
          data[key] = value;
        }
      }
      try {
        const response = await fetch(url + '[aTraitementStates]', {
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
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
      }
  };

//////// DELETE
  const handleDeleteClick = async (item) => {
    try {
      console.log(item);
      const response = await fetch(url + '[aTraitementStates]', {
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
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

	const handleSelectRefTraitementChange = (event) => {
		setSelectedItem({ ...selectedItem, refTraitement: event.target.value });
	};
	
	const handleInputIdChange = (event) => {
		setSelectedItem({ ...selectedItem, id: event.target.value });
	};
	
	const handleSelectStateChange = (event) => {
		setSelectedItem({ ...selectedItem, state: event.target.value });
	};
	
	

	useEffect(() => {
		const getA_traitement_states = async () => {
			try {
				const response = await fetch(url + '[aTraitementStates]/'+currentPage , {
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
	 			setA_traitement_states(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getA_traitement_states();
	}, [currentPage]);
	useEffect(() => {
		const getRefTraitement = async () => {
			try {
				const response = await fetch(url + '[traitement]/' , {
	 headers: {
	 "Authorization" : "Bearer " + sessionStorage.getItem('token') 
	} 
	});
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json(); 
	 			setRefTraitement(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getRefTraitement();
	}, []);
	useEffect(() => {
		const getState = async () => {
			try {
				const response = await fetch(url + '[states]/' , {
	 headers: {
	 "Authorization" : "Bearer " + sessionStorage.getItem('token') 
	} 
	});
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json(); 
	 			setState(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getState();
	}, []);
	

  return (
    <IonPage>
      <IonContent>
          <div className="row justify-content-end">
              <div className="col" >   

                  <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                      <Modal.Title>Add aTraitementStates</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <form action="" method="" id="insert" onSubmit={handleSaveSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">id</label> 
	 	<select className="form-control" name="refTraitement" id="select-refTraitement">
			{refTraitement.map((elt) => (
				<option value={elt.id}>{elt.reference}</option>
			))}
			
		</select>
	</div><div className="mb-3"> 
	 	<label className="form-label">id</label> 
	 	<select className="form-control" name="state" id="select-state">
			{state.map((elt) => (
				<option value={elt.id}>{elt.reference}</option>
			))}
			
		</select>
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
			<th> Ref Traitement </th>
			<th> Id </th>
			<th> State </th>

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
                      {aTraitementStates.map((item) => (
                              <tr key={item.id}>
		<td>{item.refTraitement.reference}</td>
		<td>{item.id}</td>
		<td>{item.state.reference}</td>

                              <td>
                                  <IonButton color="danger  " key={item.id} onClick={() => handleDeleteClick(item)}>
                                      <IonIcon icon={trashBinOutline} />
                                  </IonButton>
                              </td>   
                              <td>
                                  <IonButton key={item.id} onClick={() => handleSelectItem(item.id)}>
                                      <IonIcon icon={pencilSharp} />
                                  </IonButton>
                              </td>
                          </tr>
                      ))}
                      <tr>
                <td>
                  Showing {aTraitementStates.length} result(s) of {count}
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
                      <Modal.Title>Update aTraitementStates</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>    
                      <form action="" method="" id="update" onSubmit={handleUpdateSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">id</label> 
	 	<select className="form-control" name="traitement">
			{refTraitement.map((elt) => (
		<option value={elt.id}>{elt.reference}</option>
	))}
	
	{state.map((elt) => (
		<option value={elt.id}>{elt.reference}</option>
	))}
	
	
	</select>
	</div><div className="mb-3"> 
	 	<label className="form-label"></label> 
	 	<input className="form-control" type="hidden" name="id" onChange={handleInputIdChange} value={selectedItem ? selectedItem.id:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">id</label> 
	 	<select className="form-control" name="states">
			{refTraitement.map((elt) => (
		<option value={elt.id}>{elt.reference}</option>
	))}
	
	{state.map((elt) => (
		<option value={elt.id}>{elt.reference}</option>
	))}
	
	
	</select>
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

export default aTraitementStates;
