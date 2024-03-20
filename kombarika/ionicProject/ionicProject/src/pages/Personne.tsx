import React, { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap'

function Personne() {
  // const url = 'https://e1l353.api.infobip.com/people/2/';
  const url = 'http://localhost:5106/api/';


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
    const itemDetails = [personne].find(item => item.id === itemKey);
    setSelectedItem(itemDetails);
  };

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
      const response = await fetch(url + '[personne]', {
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
      const response = await fetch(url + '[personne]', {
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
      const response = await fetch(url + '[personne]', {
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

  const handleInputAdresseChange = (event) => {
    setSelectedItem({ ...selectedItem, adresse: event.target.value });
  };

  const handleInputIdChange = (event) => {
    setSelectedItem({ ...selectedItem, id: event.target.value });
  };

  const handleInputNomChange = (event) => {
    setSelectedItem({ ...selectedItem, nom: event.target.value });
  };

  const handleInputPrenomChange = (event) => {
    setSelectedItem({ ...selectedItem, prenom: event.target.value });
  };

  const handleInputDtnChange = (event) => {
    setSelectedItem({ ...selectedItem, dtn: event.target.value });
  };



  useEffect(() => {
    const getPersonne = async () => {
      try {
        const response = await fetch(url + '[personne]');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        };
        const data = await response.json();
        setPersonne(data);
        console.log(data);
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
                Add Personne
              </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Personne</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form action="" method="" id="insert" onSubmit={handleSaveSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Adresse</label>
                    <input className="form-control" type="text" name="adresse" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input className="form-control" type="text" name="nom" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Prenom</label>
                    <input className="form-control" type="text" name="prenom" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Dtn</label>
                    <input className="form-control" type="Date" name="dtn" />
                  </div>

                  <div className="mb-3">
                    <Button variant="primary" type="submit" >
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
                <th> Adresse </th>
                <th> Id </th>
                <th> Nom </th>
                <th> Prenom </th>
                <th> Dtn </th>

                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody id="table-body">
              {personne.map((item) => (
                <tr key={item.id}>
                  <td>{item.adresse}</td>
                  <td>{item.id}</td>
                  <td>{item.nom}</td>
                  <td>{item.prenom}</td>
                  <td>{item.dtn}</td>

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
              <Modal.Title>Update Personne</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form action="" method="" id="update" onSubmit={handleUpdateSubmit}>
                <div className="mb-3">
                  <label className="form-label">Adresse</label>
                  <input className="form-control" type="text" name="adresse" onChange={handleInputAdresseChange} value={selectedItem ? selectedItem.adresse : ''} />
                </div>
                <div className="mb-3">
                  <label className="form-label"></label>
                  <input className="form-control" type="hidden" name="id" onChange={handleInputIdChange} value={selectedItem ? selectedItem.id : ''} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nom</label>
                  <input className="form-control" type="text" name="nom" onChange={handleInputNomChange} value={selectedItem ? selectedItem.nom : ''} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Prenom</label>
                  <input className="form-control" type="text" name="prenom" onChange={handleInputPrenomChange} value={selectedItem ? selectedItem.prenom : ''} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Dtn</label>
                  <input className="form-control" type="Date" name="dtn" onChange={handleInputDtnChange} value={selectedItem ? selectedItem.dtn : ''} />
                </div>

                <div className="mb-3">
                  <Button variant="warning" type="submit" >
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

export default Personne;
