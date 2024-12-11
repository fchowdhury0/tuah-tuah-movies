import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import './ManageUsers.scss';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleEdit = (user = null) => {
    setSelectedUser(user);
    setShowEdit(!showEdit);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const EditUserForm = ({ values, handleChange, handleSubmit, isSubmitting }) => (
    <Form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        name="username"
        placeholder="Username"
        value={values.username}
        onChange={handleChange}
        required
      />
      <input
        className="input"
        type="email"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        required
      />
      <input
        className="input"
        type="text"
        name="firstName"
        placeholder="First Name"
        value={values.firstName}
        onChange={handleChange}
        required
      />
      <input
        className="input"
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={values.lastName}
        onChange={handleChange}
        required
      />
      <select
        className="input"
        name="status"
        value={values.status}
        onChange={handleChange}
        required
      >
        <option value={true}>Active</option>
        <option value={false}>Inactive</option>
      </select>
      <select
        className="input"
        name="role"
        value={values.role}
        onChange={handleChange}
        required
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <select
        className="input"
        name="isSubscribed"
        value={values.isSubscribed.toString()}
        onChange={handleChange}
        required
      >
        <option value="true">Subscribed to Promotions</option>
        <option value="false">Not Subscribed</option>
      </select>
      <button className="button" type="submit" disabled={isSubmitting}>
        Update
      </button>
    </Form>
  );

  return (
    <div className="admin-view">
      <h2>Manage Users</h2>
      {showEdit && selectedUser && (
        <Formik
          initialValues={{
            username: selectedUser.username,
            email: selectedUser.email,
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
            status: selectedUser.status,
            role: selectedUser.role,
            isSubscribed: selectedUser.isSubscribed
          }}
          onSubmit={async (userData, { setSubmitting }) => {
            try {
              await axios.put(`http://localhost:8080/api/user/${selectedUser.userId}`, userData);
              fetchUsers();
              setSubmitting(false);
              toggleEdit();
            } catch (error) {
              console.error('Error updating user:', error);
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <EditUserForm
              values={values}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </Formik>
      )}
      <div className="box">
        <h3>Users List</h3>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.userId}>
                <div className="user-info">
                  <div className="user-primary">
                    <strong>{user.username}</strong>
                    <span className="email">{user.email}</span>
                  </div>
                  <div className="user-name">
                    {user.firstName} {user.lastName}
                  </div>
                </div>
                <div className="user-status">
                  <span className={`status-badge ${user.status ? 'active' : 'inactive'}`}>
                    {user.status ? 'Active' : 'Inactive'}
                  </span>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                  <span className={`subscription-badge ${user.isSubscribed ? 'subscribed' : 'not-subscribed'}`}>
                    {user.isSubscribed ? 'Subscribed' : 'Not Subscribed'}
                  </span>
                </div>
                <button className="button" onClick={() => toggleEdit(user)}>Edit</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;