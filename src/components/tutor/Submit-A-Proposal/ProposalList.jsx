import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { proposalActions } from "../../../redux/slices/ProposalSlice";
import { FaCheckCircle, FaClock, FaTimesCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../assets/css/proposal.module.css";
import Modal from '../../UI/Modal';

const ProposalList = () => {
  const dispatch = useDispatch();
  const [editProposal, setEditProposal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedAmount, setUpdatedAmount] = useState('');

  useEffect(() => {
    dispatch(proposalActions.getProposals());
  }, [dispatch]);

  const proposals = useSelector((state) => state.proposal.proposals);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted':
        return <FaCheckCircle className={styles.accepted} />;
      case 'Pending':
        return <FaClock className={styles.pending} />;
      case 'Rejected':
        return <FaTimesCircle className={styles.rejected} />;
      default:
        return null;
    }
  };

  const handleEditProposal = (proposalId) => {
    const proposalToEdit = proposals.find((proposal) => proposal._id === proposalId);
    if (proposalToEdit) {
      setEditProposal(proposalToEdit);
      setUpdatedDescription(proposalToEdit.description);
      setUpdatedAmount(proposalToEdit.amount);
      setIsModalOpen(true);
    }
  };

  const handleUpdateProposal = () => {
    const updatedProposal = {
      id: editProposal._id, // Add the id property
      proposalData: { description: updatedDescription, amount: updatedAmount } // Create an object with updated data
    };
    dispatch(proposalActions.updateProposal(updatedProposal));
    setIsModalOpen(false);
    toast.success('Proposal updated successfully');
  };

  const handleDeleteProposal = (proposalId) => {
    dispatch(proposalActions.deleteProposal(proposalId));
    toast.success('Proposal deleted successfully');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {proposals.map((proposal) => (
        <div className={styles.proposalContainer} key={proposal._id}>
          <div className={styles.contentWrapper}>
            {/* <h3>{proposal.reqID}</h3> */}
            <p>{proposal.description}</p>
            <p>Amount: {proposal.amount}</p>
          </div>
          <div className={styles.statusContainer}>
            {getStatusIcon(proposal.status)}
            <span className={styles.status}>{proposal.status}</span>
            <FaEdit
              className={styles.editIcon}
              onClick={() => handleEditProposal(proposal._id)}
            />
            <FaTrash
              className={styles.deleteIcon}
              onClick={() => handleDeleteProposal(proposal._id)}
            />
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {editProposal && (
          <div>
            <h3>Edit Proposal</h3><br/>
            <input
  type="text"
  value={updatedDescription}
  onChange={(e) => setUpdatedDescription(e.target.value)}
  className="form-control"
/><br/>
<input
  type="text"
  value={updatedAmount}
  onChange={(e) => setUpdatedAmount(e.target.value)}
  className="form-control"
/><br/>

            <button className={styles.proposalUpdateBtn} onClick={handleUpdateProposal}>Update</button>
            <button className={styles.proposalUpdateBtn} onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        )}
      </Modal>
      <ToastContainer /> {/* Add the ToastContainer component */}
    </div>
  );
};

export default ProposalList;
