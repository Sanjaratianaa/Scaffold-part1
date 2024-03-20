import React, { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function Poketra() {
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
    const itemDetails = [poketra].find(item => item.id === itemKey);
    setSelectedItem(itemDetails);
  };

  const [poketra, setPoketra] = useState([]);



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
      const response = await fetch(url + '[poketra]', {
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
      const response = await fetch(url + '[poketra]', {
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
      const response = await fetch(url + '[poketra]', {
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

  const handleInputPrixChange = (event) => {
    setSelectedItem({ ...selectedItem, prix: event.target.value });
  };

  const handleInputIdChange = (event) => {
    setSelectedItem({ ...selectedItem, id: event.target.value });
  };

  const handleInputNomChange = (event) => {
    setSelectedItem({ ...selectedItem, nom: event.target.value });
  };



  useEffect(() => {
    const getPoketra = async () => {
      try {
        const response = await fetch(url + '[poketra]');
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


  return (
    <>
      <div className="container">
        <div className="row justify-content-end">
          <div className="col" >
            <div className="row">
              <Button variant="primary" onClick={handleShow}>
                Add Poketra
              </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Poketra</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form action="" method="" id="insert" onSubmit={handleSaveSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Prix</label>
                    <input className="form-control" type="number" name="prix" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input className="form-control" type="text" name="nom" />
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
                <th> Prix </th>
                <th> Id </th>
                <th> Nom </th>

                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody id="table-body">
              {poketra.map((item) => (
                <tr key={item.id}>
                  <td>{item.prix}</td>
                  <td>{item.id}</td>
                  <td>{item.nom}</td>

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
              <Modal.Title>Update Poketra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form action="" method="" id="update" onSubmit={handleUpdateSubmit}>
                <div className="mb-3">
                  <label className="form-label">Prix</label>
                  <input className="form-control" type="number" name="prix" onChange={handleInputPrixChange} value={selectedItem ? selectedItem.prix : ''} />
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

export default Poketra;
