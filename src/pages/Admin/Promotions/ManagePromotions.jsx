// ManagePromotions.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ManagePromotions.scss';

const ManagePromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [newPromotion, setNewPromotion] = useState({
    code: '',
    discount: '',
    description: '',
    expiryDate: '',
  });

  useEffect(() => {
    axios.get('/api/admin/promotions')
      .then(response => setPromotions(response.data))
      .catch(error => console.error('Error fetching promotions:', error));
  }, []);

  const handleChange = (e) => {
    setNewPromotion({
      ...newPromotion,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPromotion = (e) => {
    e.preventDefault();
    axios.post('/api/admin/promotions', newPromotion)
      .then(response => {
        setPromotions([...promotions, response.data]);
        setNewPromotion({
          code: '',
          discount: '',
          description: '',
          expiryDate: '',
        });
        alert('Promotion added successfully');
      })
      .catch(error => {
        console.error('Error adding promotion:', error);
        alert('Failed to add promotion');
      });
  };

  const handleDeletePromotion = (id) => {
    axios.delete(`/api/admin/promotions/${id}`)
      .then(() => {
        setPromotions(promotions.filter(promotion => promotion.id !== id));
        alert('Promotion deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting promotion:', error);
        alert('Failed to delete promotion');
      });
  };

  return (
    <div className="manage-promotions">
      <h2>Manage Promotions</h2>
      <form onSubmit={handleAddPromotion}>
        <h3>Add New Promotion</h3>
        <div className="form-group">
          <label>Promotion Code:</label>
          <input type="text" name="code" value={newPromotion.code} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Discount (%):</label>
          <input type="number" name="discount" value={newPromotion.discount} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input type="text" name="description" value={newPromotion.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Expiry Date:</label>
          <input type="date" name="expiryDate" value={newPromotion.expiryDate} onChange={handleChange} />
        </div>
        <button type="submit">Add Promotion</button>
      </form>

      <h3>Existing Promotions</h3>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Discount</th>
            <th>Description</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map(promotion => (
            <tr key={promotion.id}>
              <td>{promotion.code}</td>
              <td>{promotion.discount}%</td>
              <td>{promotion.description}</td>
              <td>{promotion.expiryDate}</td>
              <td>
                <button onClick={() => handleDeletePromotion(promotion.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePromotions;