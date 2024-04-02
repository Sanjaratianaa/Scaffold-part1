import React, {useState, useEffect} from "react";
import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function Pannier(){
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
  const handleSelectItem = (itemKey) => {
    handleShow2();
    const itemDetails = [pannier].find(item => item.id === itemKey);
    setSelectedItem(itemDetails);
  };

	const [pannier, setPannier] = useState([]);
	
	const [poketra, setPoketra] = useState([]);
	
	const [personne, setPersonne] = useState([]);
	
	

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
        const response = await fetch(url + '[pannier]', {
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
        const response = await fetch(url + '[pannier]', {
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
      const response = await fetch(url + '[pannier]', {
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

	const handleSelectPoketraChange = (event) => {
		setSelectedItem({ ...selectedItem, poketra: event.target.value });
	};
	
	const handleSelectPersonneChange = (event) => {
		setSelectedItem({ ...selectedItem, personne: event.target.value });
	};
	
	const handleInputIdChange = (event) => {
		setSelectedItem({ ...selectedItem, id: event.target.value });
	};
	
	

	useEffect(() => {
		const getPannier = async () => {
			try {
				const response = await fetch(url + 'pannier');
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json();
				setPannier(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getPannier();
	}, []);
	useEffect(() => {
		const getPoketra = async () => {
			try {
				const response = await fetch(url + 'poketra');
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json();
				setPoketra(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getPoketra();
	}, []);
	useEffect(() => {
		const getPersonne = async () => {
			try {
				const response = await fetch(url + 'personne');
					if (!response.ok) {
						throw new Error('Network response was not ok');
					};
				const data = await response.json();
				setPersonne(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getPersonne();
	}, []);
	

  return (
    <>
      <div className="container">
          <div className="row justify-content-end">
              <div className="col" >   
                <div className="row">
                  <Button variant="primary" onClick={handleShow}>
                      Add Pannier
                  </Button>
                </div>    

                  <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                      <Modal.Title>Add Pannier</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <form action="" method="" id="insert" onSubmit={handleSaveSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">id</label> 
	 	<select className="form-control" name="poketra" id="select-poketra">
			{poketra.map((elt) => (
				<option value={elt.id}>{elt.nom}</option>
			))}
			
		</select>
	</div><div className="mb-3"> 
	 	<label className="form-label">id</label> 
	 	<select className="form-control" name="personne" id="select-personne">
			{personne.map((elt) => (
				<option value={elt.id}>{elt.nom}</option>
			))}
			
		</select>
	</div>
                              <div className="mb-3">
                                <Button variant="primary" type= "submit" >
                                  Save Changes
                                </Button>
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
			<th> Idpoketra </th>
			<th> Idpersonne </th>
			<th> Id </th>

                          <th></th>
                          <th></th>
                      </tr>
                  </thead>    
                  <tbody id="table-body">
                      {[pannier].map((item) => (
                              <tr key={item.id}>
		<td>{item.poketra.nom}</td>
		<td>{item.personne.nom}</td>
		<td>{item.id}</td>

                              <td>
                                  <Button variant="danger" key={item.id} onClick={() => handleDeleteClick(item)}>
                                      Delete
                                  </Button>
                              </td>   
                              <td>
                                  <Button variant="warning" key={item.id} onClick={() => handleSelectItem(item.id)}>
                                      Update
                                  </Button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              <Modal show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                      <Modal.Title>Update Pannier</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>    
                      <form action="" method="" id="update" onSubmit={handleUpdateSubmit}>
	<div className="mb-3"> 
	 	<label className="form-label">id</label> 
	 	<select className="form-control" name="poketra">
			{poketra.map((elt) => (
		<option value={elt.id}>{elt.nom}</option>
	))}
	
	{personne.map((elt) => (
		<option value={elt.id}>{elt.nom}</option>
	))}
	
	
	</select>
	</div><div className="mb-3"> 
	 	<label className="form-label">id</label> 
	 	<select className="form-control" name="personne">
			{poketra.map((elt) => (
		<option value={elt.id}>{elt.nom}</option>
	))}
	
	{personne.map((elt) => (
		<option value={elt.id}>{elt.nom}</option>
	))}
	
	
	</select>
	</div><div className="mb-3"> 
	 	<label className="form-label"></label> 
	 	<input className="form-control" type="hidden" name="id" onChange={handleInputIdChange} value={selectedItem ? selectedItem.id:''} />
	</div>
	
                          <div className="mb-3">
                            <Button variant="warning" type= "submit" >
                              Save Changes
                            </Button>
                          </div>
                      </form>  
                  </Modal.Body>
                  <Modal.Footer>

                  </Modal.Footer>
              </Modal>
          </div>
      </div>
    </>
  )
}

export default Pannier;
