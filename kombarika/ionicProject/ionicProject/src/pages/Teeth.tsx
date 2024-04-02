import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/react";
import { addCircleOutline, arrowBack, arrowForward, pencilOutline, trashBinOutline } from "ionicons/icons";
import 'bootstrap';
function teeth() {
  const url = "http://localhost:5106/api/";

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
    const itemDetails = teeth.find((item) => item.id === itemKey);
    setSelectedItem(itemDetails);
  };

  const [limite, setLimite] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [teeth, setTeeth] = useState([]);

  const [type, setType] = useState([]);

  const getPage = () => {
    return Math.floor(count / limite);
  };

  const nextResult = (event) => {
    const requiredPage = getPage();
    const element = event.target;
    const prevButton = document.getElementById("prev-button");
    prevButton?.setAttribute("disabled", false);
    if (currentPage == requiredPage) {
      element.setAttribute("disabled", "");
      console.log("Going to next Page man finished");
    } else {
      setCurrentPage(currentPage + 1);
      console.log("Going to next Page man");
    }
  };

  const prevResult = (event) => {
    const element = event.target;
    const nextButton = document.getElementById("next-button");
    nextButton?.setAttribute("disabled", "false");
    if (currentPage == 1) {
      element.setAttribute("disabled", "");
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
      if (form.elements[key].tagName === "SELECT") {
        data[key] = { id: value };
      } else {
        data[key] = value;
      }
    }

    try {
      const response = await fetch(url + "[teeth]", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      handleClose();
      // If you want to reload the page after success
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  //////// UPDATE
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      if (form.elements[key].tagName === "SELECT") {
        data[key] = { id: value };
      } else {
        data[key] = value;
      }
    }
    try {
      const response = await fetch(url + "[teeth]", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      handleClose2();
      // If you want to reload the page after success
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //////// DELETE
  const handleDeleteClick = async (item) => {
    try {
      console.log(item);
      const response = await fetch(url + "[teeth]", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // If you want to reload the page after success
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputNumeroChange = (event) => {
    setSelectedItem({ ...selectedItem, numero: event.target.value });
  };

  const handleInputTeethNameChange = (event) => {
    setSelectedItem({ ...selectedItem, teethName: event.target.value });
  };

  const handleInputIdChange = (event) => {
    setSelectedItem({ ...selectedItem, id: event.target.value });
  };

  const handleSelectTypeChange = (event) => {
    setSelectedItem({ ...selectedItem, type: event.target.value });
  };

  useEffect(() => {
    const getTeeth = async () => {
      try {
        const response = await fetch(url + "[teeth]/" + currentPage);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const c = response.headers.get("X-Total-Count");
        setCount(c);
        setTeeth(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getTeeth();
  }, [currentPage]);
  useEffect(() => {
    const getType = async () => {
      try {
        const response = await fetch(url + "[teethType]/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setType(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getType();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <div className="row justify-content-end">
          <div className="col">
            {/* <div className="row"> */}
              <IonButton onClick={handleShow}>
                {/* Add */}
                <IonIcon slot="icon-only" icon={addCircleOutline} aria-hidden="true"/>
              </IonButton>
            {/* </div> */}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add teeth</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form
                  action=""
                  method=""
                  id="insert"
                  onSubmit={handleSaveSubmit}
                >
                  <div className="mb-3">
                    <label className="form-label">Numero</label>
                    <input
                      className="form-control"
                      type="number"
                      name="numero"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teeth Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="teethName"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">id</label>
                    <select
                      className="form-control"
                      name="teethType"
                      id="select-teethType"
                    >
                      {type.map((elt) => (
                        <option value={elt.teethType}>{elt.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <IonButton type="submit" color={"success"}>Save Changes</IonButton>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead id="">
              <tr>
                <th> Numero </th>
                <th> Teeth Name </th>
                <th> Id </th>
                <th> Type </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody id="">
              {teeth.map((item) => (
                <tr key={item.id}>
                  <td>{item.numero}</td>
                  <td>{item.teethName}</td>
                  <td>{item.id}</td>
                  <td>{item.type.name}</td>

                  <td>
                    <IonButton
                      key={item.id}
                      onClick={() => handleDeleteClick(item)}
                      color={"danger"}
                    >
                      <IonIcon icon={trashBinOutline} />
                    </IonButton>
                  </td>
                  <td>
                    <IonButton
                      key={item.id}
                      onClick={() => handleSelectItem(item.id)}
                      color={"primary"}
                    >
                      <IonIcon icon={pencilOutline} />
                    </IonButton>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>
                  Showing {teeth.length} result(s) of {count}
                </td>
                
                {/* <td></td>
                <td></td> */}
                {/* <td></td> */}
                <td>
                  <IonButton
                    disabled={currentPage == 1 ? "true" : "false"}
                    id="prev-button"
                    onClick={(event) => prevResult(event)}
                  >
                    {/* {" "}
                    Prev{" "} */}
                    <IonIcon icon={arrowBack}></IonIcon>
                  </IonButton>
                </td>
                <td>
                  <IonButton
                    id="next-button"
                    onClick={(event) => nextResult(event)}
                  >
                    {/* {" "}
                    Next{" "} */}
                    <IonIcon icon={arrowForward}></IonIcon>
                  </IonButton>
                </td>
              </tr>
            </tbody>
          </table>
          <Modal show={show2} onHide={handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>Update teeth</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                action=""
                method=""
                id="update"
                onSubmit={handleUpdateSubmit}
              >
                <div className="mb-3">
                  <label className="form-label">Numero</label>
                  <input
                    className="form-control"
                    type="number"
                    name="numero"
                    onChange={handleInputNumeroChange}
                    value={selectedItem ? selectedItem.numero : ""}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teeth Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="teethName"
                    onChange={handleInputTeethNameChange}
                    value={selectedItem ? selectedItem.teethName : ""}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label"></label>
                  <input
                    className="form-control"
                    type="hidden"
                    name="id"
                    onChange={handleInputIdChange}
                    value={selectedItem ? selectedItem.id : ""}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">id</label>
                  <select className="form-control" name="teethType">
                    {type.map((elt) => (
                      <option value={elt.teethType}>{elt.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <IonButton type="submit">Save Changes</IonButton>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default teeth;
