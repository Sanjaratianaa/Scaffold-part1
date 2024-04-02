import React, {useState, useEffect} from "react";
import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {
    IonPage,
    IonContent,
    IonButton
} from '@ionic/react';

function aClientTeeth(){
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
    const itemDetails = aClientTeeth.find(item => item.id === itemKey);
    setSelectedItem(itemDetails);
  };


  const [limite, setLimite] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

	const [aClientTeeth, setA_client_teeth] = useState([]);
	
	const [idClient, setIdClient] = useState([]);
	
	const [numberTeeth, setNumberTeeth] = useState([]);
	
	

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
        const response = await fetch(url + '[aClientTeeth]', {
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
        const response = await fetch(url + '[aClientTeeth]', {
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
      const response = await fetch(url + '[aClientTeeth]', {
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

	const handleSelectIdClientChange = (event) => {
		setSelectedItem({ ...selectedItem, idClient: event.target.value });
	};
	
	const handleInputIdChange = (event) => {
		setSelectedItem({ ...selectedItem, id: event.target.value });
	};
	
	const handleInputStateChange = (event) => {
		setSelectedItem({ ...selectedItem, state: event.target.value });
	};
	
	const handleSelectNumberTeethChange = (event) => {
		setSelectedItem({ ...selectedItem, numberTeeth: event.target.value });
	};
	
	

	useEffect(() => {
		const getA_client_teeth = async () => {
			try {
				const response = await fetch(url + '[aClientTeeth]/'+currentPage);
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json();
	 const c = response.headers.get('X-Total-Count'); 
	 			 setCount(c); 
	 			setA_client_teeth(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getA_client_teeth();
	}, [currentPage]);
	useEffect(() => {
		const getIdClient = async () => {
			try {
				const response = await fetch(url + '[client]/');
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json(); 
	 			setIdClient(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getIdClient();
	}, []);
	useEffect(() => {
		const getNumberTeeth = async () => {
			try {
				const response = await fetch(url + '[teeth]/');
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json(); 
	 			setNumberTeeth(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getNumberTeeth();
	}, []);
	

  return (
    <IonPage>
      <IonContent>
          <div className="row justify-content-end">
              <div className="col" >   
                <div className="row">
                  <IonButton onClick={handleShow}>
                      Add aClientTeeth
                  </IonButton>
                </div>    

                  <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                      <Modal.Title>Add aClientTeeth</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <form action="" method="" id="insert" onSubmit={handleSaveSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">id</label> 
	 	<select className="form-control" name="client" id="select-client">
			{idClient.map((elt) => (
				<option value={elt.idClient}>{elt.nom}</option>
			))}
			
		</select>
	</div><div className="mb-3"> 
	 	<label className="form-label">State</label> 
	 	<input className="form-control" type="number" name="state" />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">id</label> 
	 	<select className="form-control" name="teeth" id="select-teeth">
			{numberTeeth.map((elt) => (
				<option value={elt.idClient}>{elt.nom}</option>
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
			<th> Id Client </th>
			<th> Id </th>
			<th> State </th>
			<th> Number Teeth </th>

                          <th></th>
                          <th></th>
                      </tr>
                  </thead>    
                  <tbody id="table-body">
                      {aClientTeeth.map((item) => (
                              <tr key={item.id}>
		<td>{item.idClient.nom}</td>
		<td>{item.id}</td>
		<td>{item.state}</td>
		<td>{item.numberTeeth.nom}</td>

                              <td>
                                  <IonButton key={item.id} onClick={() => handleDeleteClick(item)}>
                                      Delete
                                  </IonButton>
                              </td>   
                              <td>
                                  <IonButton key={item.id} onClick={() => handleSelectItem(item.id)}>
                                      Update
                                  </IonButton>
                              </td>
                          </tr>
                      ))}
                      <tr>
                <td>
                  Showing {teeth.length} result(s) of {count}
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
                      <Modal.Title>Update aClientTeeth</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>    
                      <form action="" method="" id="update" onSubmit={handleUpdateSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">id</label> 
	 	<select className="form-control" name="client">
			{idClient.map((elt) => (
		<option value={elt.idClient}>{elt.nom}</option>
	))}
	
	{numberTeeth.map((elt) => (
		<option value={elt.idClient}>{elt.nom}</option>
	))}
	
	
	</select>
	</div><div className="mb-3"> 
	 	<label className="form-label"></label> 
	 	<input className="form-control" type="hidden" name="id" onChange={handleInputIdChange} value={selectedItem ? selectedItem.id:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">State</label> 
	 	<input className="form-control" type="number" name="state" onChange={handleInputStateChange} value={selectedItem ? selectedItem.state:''} />
	</div>
	<div className="mb-3"> 
	 	<label className="form-label">id</label> 
	 	<select className="form-control" name="teeth">
			{idClient.map((elt) => (
		<option value={elt.idClient}>{elt.nom}</option>
	))}
	
	{numberTeeth.map((elt) => (
		<option value={elt.idClient}>{elt.nom}</option>
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
      </IonContent>
    </IonPage>
  )
}

export default aClientTeeth;
