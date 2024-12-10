import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import './ManagePromotions.scss';

const ManagePromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const toggleAdd = () => {
    setShowAdd(!showAdd);
  };

  const fetchPromotions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/promotions');
      setPromotions(response.data);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const AddPromoForm = ({ values, handleChange, handleSubmit, isSubmitting }) => (
    <Form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        name="promoCode"
        placeholder="Promo Code"
        value={values.promoCode}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="promotionTitle"
        placeholder="Promotion Title"
        value={values.promotionTitle}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={values.description}
        onChange={handleChange}
        required
      />
      <button className="button" type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );

  return (
    <div className="admin-view">
      <button className="button" onClick={toggleAdd}>
        {showAdd ? 'Cancel' : 'Add Promotions'}
      </button>
      {showAdd && (
        <Formik
          initialValues={{
            promoCode: '',
            promotionTitle: '',
            description: '',
          }}
          onSubmit={async (promoData, { setSubmitting, resetForm }) => {
            try {
              await axios.post('http://localhost:8080/api/promotions', promoData);
              fetchPromotions();
              resetForm();
              setSubmitting(false);
              setShowAdd(false);
            } catch (error) {
              console.error('Error adding promotion:', error);
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <AddPromoForm
              values={values}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </Formik>
      )}
      <div className="box box1">
        <h3>Active Promotions</h3>
        {promotions.length > 0 ? (
          <ul>
            {promotions.map((promo) => (
              <li key={promo.promoId}>
                <strong>{promo.promoCode}</strong>: {promo.description} (Used {promo.useCount} times)
              </li>
            ))}
          </ul>
        ) : (
          <p>No active promotions.</p>
        )}
      </div>
    </div>
  );
};

export default ManagePromotions;