import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests } from '../../redux/slices/RequestsSlice';
import { getSingleUser } from '../../redux/slices/authSlice';
import CreateProposal from './Submit-A-Proposal/CreateProposal';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.request.list || []);
  const loading = useSelector((state) => state.request.loading);
  const error = useSelector((state) => state.request.error);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getSingleUser(user._id)); // Pass the user ID to getSingleUser
    }
  }, [dispatch, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleProposalSubmission = (requestId, userId) => {
    const proposalData = {
      requestId: requestId,
      userId: userId,
    };

    localStorage.setItem('proposalData', JSON.stringify(proposalData));

    setSelectedRequestId(requestId);
    console.log(`Submitting proposal for request ID: ${requestId}`);
  };

  if (selectedRequestId) {
    return <CreateProposal requestId={selectedRequestId} />;
  }

  return (
    <div>
      {requests.map((request) => (
        <div key={request._id}>
          <h4>{request.subject}</h4>
          <p>{request.description}</p>
          {user && (
            <div>
              <p>User Details:</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          )}
          <button onClick={() => handleProposalSubmission(request._id, request.userID)}>Submit Proposal</button>
        </div>
      ))}
    </div>
  );
};

export default Requests;
