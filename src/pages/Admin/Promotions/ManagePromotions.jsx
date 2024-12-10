import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import './ManagePromotions.scss';

const ManagePromotions = () => {
  const [promotions, setPromotions] = useState([{
    promoTitle: '',
    promoDescription: '',
    promoCode: '',
  }]);
  
  const [showAdd, setShowAdd] = useState(false);
  const handleChange = () => {
    setShowAdd(!showAdd);
  }

  /*submit button will console log data*/
  const AddPromoForm = ({ values, handleChange}) => (
    <Form className="form-container">
      <input
        className="input"
        type="text"
        id="promotionTitle"
        placeholder="Promotion Title"
        value={values.promotionTitle}
        onChange={handleChange}
      />
      <input
        type="text"
        id="description"
        placeholder="Description"
        onChange={handleChange}
        value={values.description} />
      <input
        type="text"
        id="promoCode"
        placeholder="Promo Code"
        onChange={handleChange}
        value={values.promoCode} />
      <button className="button" type="submit">Submit</button>
    </Form>
  );


  return (
    <div className="admin-view">
            <button className="button" onClick={handleChange}>Add Promotions</button>
      {showAdd && (
      <Formik
        /*these are the form values, may be updated as needed*/
        initialValues={{
          promotionTitle: '',
          description: '',
          promoCode: ''
        }}
        onSubmit={async (promoData, { setSubmitting }) => {
          setSubmitting(true)
          console.log(promoData)
          setSubmitting(false)
        }}>
        {({ values, handleChange, onSubmit }) => (
          <AddPromoForm values={values} handleChange={handleChange} onSubmit={onSubmit} />
        )}
      </Formik>
      )}
      <div className="box box1">Active Promotions</div>
    </div>
  )
};

export default ManagePromotions;