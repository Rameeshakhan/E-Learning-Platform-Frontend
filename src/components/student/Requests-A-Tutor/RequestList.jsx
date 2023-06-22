import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaClock, FaEdit, FaTrash } from "react-icons/fa";
import styles from "../../../assets/css/request.module.css";
import Modal from "../../UI/Modal";
import { fetchRequests, deleteRequest, updateRequest } from "../../../redux/slices/RequestsSlice";
import { getProposals, updateProposal } from "../../../redux/slices/ProposalSlice";
import { toast, ToastContainer } from "react-toastify";

const RequestList = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const userID = JSON.parse(user).id;

  const requests = useSelector((state) => state.request.list || []);
  const [userRequests, setUserRequests] = useState([]);
  const proposals = useSelector((state) => state.proposal.proposals || []);
  const [showProposals, setShowProposals] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isProposalModalOpen, setProposalModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [reloadComponent, setReloadComponent] = useState(false);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  useEffect(() => {
    const filteredRequests = requests.filter((data) => data.userID === userID);
    setUserRequests(filteredRequests);
  }, [requests, userID]);

  const openModal = () => {
    setEditModalOpen(true);
    setShowProposals([]); // Reset the showProposals state
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    // setToastVisible(true);
  };

  const closeProposalModal = () => {
    setProposalModalOpen(false);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const getStatusColor = (status) => {
    return status === "pending" ? styles.pending : styles.accepted;
  };

  const getStatusIcon = (status) => {
    return status === "pending" ? <FaClock /> : <FaCheckCircle />;
  };

  const handleEditRequest = (requestId) => {
    const request = userRequests.find((data) => data._id === requestId);
    if (request) {
      setEditingRequest(request);
      setSubject(request.subject);
      setDescription(request.description);
      setEditModalOpen(true);
    }
  };

  const openDeleteConfirmation = (requestId) => {
    const request = userRequests.find((data) => data._id === requestId);
    if (request) {
      setRequestToDelete(request);
      setDeleteConfirmationOpen(true);
    }
  };

  const closeDeleteConfirmation = () => {
    setRequestToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteRequest = (requestId) => {
    openDeleteConfirmation(requestId);
  };

  const confirmDeleteRequest = () => {
    if (requestToDelete) {
      dispatch(deleteRequest(requestToDelete._id));
    }
    closeDeleteConfirmation();
    setReloadComponent(true);
  };

  const handleUpdateRequest = () => {
    const updatedRequest = {
      _id: editingRequest._id,
      subject,
      description,
    };

    dispatch(updateRequest({ requestId: editingRequest._id, requestData: updatedRequest }));

    const updatedUserRequests = userRequests.map((request) =>
      request._id === editingRequest._id ? { ...request, ...updatedRequest } : request
    );
    setUserRequests(updatedUserRequests);
    closeEditModal();
    setReloadComponent(true);
  };

  useEffect(() => {
    if (reloadComponent) {
      dispatch(fetchRequests());
      setReloadComponent(false);
    }
  }, [dispatch, reloadComponent]);

  const handleSeeProposalBtn = (requestId) => {
    dispatch(getProposals(requestId));
    const filteredProposals = proposals.filter((proposal) => proposal.reqID === requestId);
    setShowProposals(filteredProposals);
    setProposalModalOpen(true);
  };

  const handleAcceptAndPayBtn = (proposalId) => {
    const updatedProposalData = {
      status: "accepted",
    };
    dispatch(updateProposal(proposalId, updatedProposalData))
      .then(() => {
        // toast.success('Successfully accepted.');
        closeProposalModal();
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
      });
  };

  const editModal = (
    <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
      <h3>Edit Request</h3>
      <div className="mb-3">
        <label className="form-label">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdateRequest}>
        Update
      </button>
    </Modal>
  );

  const proposalModal = (
    <Modal isOpen={isProposalModalOpen} onClose={closeProposalModal}>
      <h3>Proposals</h3>
      {showProposals.map((proposal) => (
       <>
        <div className={styles.showProposalDiv} key={proposal._id}>
          {/* <p>Proposal ID: {proposal._id}</p> */}
          <p><b>Description:</b> <br/>{proposal.description}</p>
          <p><b>Amount:</b> <br/> {proposal.amount}</p>
         <div className={styles.showProposalBtnDiv}>
         <button className={styles.showProposalBtn} onClick={() => handleAcceptAndPayBtn(proposal._id)}>Accept & Pay</button>
         </div>
        </div>
       </>
      ))}
      <button className={styles.showProposalBtn} onClick={closeProposalModal}>Close</button>
    </Modal>
  );

  return (
    <div className={styles.requestInfo}>
     {userRequests.map((data) => (
  <div className={styles.requestDataContainer} key={data.id}>
    <div className={styles.requestHeader}>
      <div className={styles.subjectDescriptionContainer}>
        <h4 className={styles.subject}>{data.subject}</h4>
        <div className={styles.requestInfo}>
          <p className={styles.description}>{data.description}</p>
        </div>
      </div>
      <div className={styles.iconsContainer}>
        <div className={styles.editDeleteIcons}>
          {/* {getStatusIcon(data.status)} */}
          <FaEdit className={styles.editIcon} onClick={() => handleEditRequest(data._id)} />
          <FaTrash className={styles.deleteIcon} onClick={() => handleDeleteRequest(data._id)} />
        </div>
      </div>
    </div>
    <div className={getStatusColor(data.status)}>
      <div className={styles.statusContainer}>
        {getStatusIcon(data.status)}
        {data.status}
      </div>
    </div>
      <br />
      <button
        className={`${styles.payBtn} ${data.status === "pending" ? styles.disabled : ""}`}
        onClick={() => handleSeeProposalBtn(data._id)}
        disabled={data.status === "pending"}
      >
        See Proposals
      </button>
  </div>
))}

      {editModal}
      {showProposals.length > 0 ? proposalModal : (
        <Modal isOpen={isProposalModalOpen} onClose={closeProposalModal}>
          <h3>No Proposals</h3>
          <p>There are no proposals available.</p>
          <button onClick={closeProposalModal}>Close</button>
        </Modal>
      )}

      {requestToDelete && (
        <Modal isOpen={isDeleteConfirmationOpen} onClose={closeDeleteConfirmation}>
          <h3>Confirm Delete</h3>
          <p>Are you sure you want to delete this request?</p>
          <div className="btn-group">
            <button className="btn btn-danger" onClick={confirmDeleteRequest}>
              Delete
            </button>
            <button className="btn btn-secondary" onClick={closeDeleteConfirmation}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default RequestList;
