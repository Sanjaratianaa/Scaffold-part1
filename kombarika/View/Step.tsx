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

function step(){
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
    const itemDetails = step.find(item => item.idStep === itemKey);
    setSelectedItem(itemDetails);
  };


  const [limite, setLimite] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

	const [step, setStep] = useState([]);
	
	const [minState, setMinState] = useState([]);
	
	const [maxState, setMaxState] = useState([]);
	
	const [traitementToDo, setTraitementToDo] = useState([]);
	
	

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
        const response = await fetch(url + '[step]', {
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
        const response = await fetch(url + '[step]', {
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
      const response = await fetch(url + '[step]', {
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

	const handleInputIdStepChange = (event) => {
		setSelectedItem({ ...selectedItem, idStep: event.target.value });
	};
	
	const handleSelectMinStateChange = (event) => {
		setSelectedItem({ ...selectedItem, minState: event.target.value });
	};
	
	const handleInputPriorityChange = (event) => {
		setSelectedItem({ ...selectedItem, priority: event.target.value });
	};
	
	const handleSelectMaxStateChange = (event) => {
		setSelectedItem({ ...selectedItem, maxState: event.target.value });
	};
	
	const handleSelectTraitementToDoChange = (event) => {
		setSelectedItem({ ...selectedItem, traitementToDo: event.target.value });
	};
	
	

	useEffect(() => {
		const getStep = async () => {
			try {
				const response = await fetch(url + '[step]/'+currentPage , {
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
	 			setStep(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getStep();
	}, [currentPage]);
	useEffect(() => {
		const getMinState = async () => {
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
	 			setMinState(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getMinState();
	}, []);
	useEffect(() => {
		const getMaxState = async () => {
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
	 			setMaxState(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getMaxState();
	}, []);
	useEffect(() => {
		const getTraitementToDo = async () => {
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
	 			setTraitementToDo(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getTraitementToDo();
	}, []);
	

  return (
    <IonPage>
      <IonContent>
          <div className="row justify-content-end">
              <div className="col" >   

                  <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                      <Modal.Title>Add step</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <form action="" method="" id="insert" onSubmit={handleSaveSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">idStep</label> 
	 	<select className="form-control" name="minState" id="select-minState">
			{minState.map((elt) => (
				<option value={elt.idStates}>{elt.stateName}</option>
			))}
			
		</select>
	</div><div className="mb-3"> 
	 	<label className="form-label">Priority</label> 
	 	<input className="form-control" type="number" name="priority" />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">idStep</label> 
	 	<select className="form-control" name="maxState" id="select-maxState">
			{maxState.map((elt) => (
				<option value={elt.idStates}>{elt.stateName}</option>
			))}
			
		</select>
	</div><div className="mb-3"> 
	 	<label className="form-label">idStep</label> 
	 	<select className="form-control" name="traitementToDo" id="select-traitementToDo">
			{traitementToDo.map((elt) => (
				<option value={elt.idStates}>{elt.stateName}</option>
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
			<th> Id Step </th>
			<th> Min State </th>
			<th> Priority </th>
			<th> Max State </th>
			<th> Traitement To Do </th>

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
                      {step.map((item) => (
                              <tr key={item.idStep}>
		<td>{item.idStep}</td>
		<td>{item.minState.stateName}</td>
		<td>{item.priority}</td>
		<td>{item.maxState.stateName}</td>
		<td>{item.traitementToDo.stateName}</td>

                              <td>
                                  <IonButton color="danger  " key={item.idStep} onClick={() => handleDeleteClick(item)}>
                                      <IonIcon icon={trashBinOutline} />
                                  </IonButton>
                              </td>   
                              <td>
                                  <IonButton key={item.idStep} onClick={() => handleSelectItem(item.idStep)}>
                                      <IonIcon icon={pencilSharp} />
                                  </IonButton>
                              </td>
                          </tr>
                      ))}
                      <tr>
                <td>
                  Showing {step.length} result(s) of {count}
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
                      <Modal.Title>Update step</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>    
                      <form action="" method="" id="update" onSubmit={handleUpdateSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label"></label> 
	 	<input className="form-control" type="hidden" name="idStep" onChange={handleInputIdStepChange} value={selectedItem ? selectedItem.idStep:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">idStep</label> 
	 	<select className="form-control" name="states">
			{minState.map((elt) => (
		<option value={elt.idStates}>{elt.stateName}</option>
	))}
	
	{maxState.map((elt) => (
		<option value={elt.idStates}>{elt.stateName}</option>
	))}
	
	{traitementToDo.map((elt) => (
		<option value={elt.idStates}>{elt.stateName}</option>
	))}
	
	
	</select>
	</div><div className="mb-3"> 
	 	<label className="form-label">Priority</label> 
	 	<input className="form-control" type="number" name="priority" onChange={handleInputPriorityChange} value={selectedItem ? selectedItem.priority:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">idStep</label> 
	 	<select className="form-control" name="states">
			{minState.map((elt) => (
		<option value={elt.idStates}>{elt.stateName}</option>
	))}
	
	{maxState.map((elt) => (
		<option value={elt.idStates}>{elt.stateName}</option>
	))}
	
	{traitementToDo.map((elt) => (
		<option value={elt.idStates}>{elt.stateName}</option>
	))}
	
	
	</select>
	</div><div className="mb-3"> 
	 	<label className="form-label">idStep</label> 
	 	<select className="form-control" name="traitement">
			{minState.map((elt) => (
		<option value={elt.idStates}>{elt.stateName}</option>
	))}
	
	{maxState.map((elt) => (
		<option value={elt.idStates}>{elt.stateName}</option>
	))}
	
	{traitementToDo.map((elt) => (
		<option value={elt.idStates}>{elt.stateName}</option>
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

export default step;
