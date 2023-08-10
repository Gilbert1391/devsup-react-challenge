import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../Components/page/Page';
import Button from '../../Components/button/Button';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    logo: '',
    releaseDate: '',
    revisionDate: '',
  });
  const [formErrors, setFormErrors] = useState({
    id: '',
    name: '',
    description: '',
    logo: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // validate form when formData changes
  useEffect(() => {
    if (isSubmitted) validateForm();
  }, [formData, isSubmitted]);

  const validateForm = () => {
    const errors: any = {};

    if (!formData.id || formData.id.length < 3 || formData.id.length > 10) {
      errors.id = 'ID must be between 3 and 10 characters';
    }

    if (
      !formData.name ||
      formData.name.length < 5 ||
      formData.name.length > 10
    ) {
      errors.name = 'Name must be between 5 and 10 characters';
    }

    if (
      !formData.description ||
      formData.description.length < 10 ||
      formData.description.length > 200
    ) {
      errors.description = 'Description must be between 10 and 200 characters';
    }

    if (!formData.logo) {
      errors.logo = 'Logo is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const populateRevisionDate = (dateVal: string) => {
    const releaseDate = new Date(dateVal);
    const revisionDate = new Date(
      releaseDate.getFullYear() + 1,
      releaseDate.getMonth(),
      releaseDate.getDate(),
    );
    setFormData((prevData) => ({
      ...prevData,
      revisionDate: revisionDate.toISOString().substr(0, 10),
    }));
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'releaseDate') {
      populateRevisionDate(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      console.log(formData);
    }
  };

  const isFormValid = Object.values(formErrors).every((error) => !error);

  return (
    <Page style={{ maxWidth: '750px' }}>
      <>
        <h1 className={styles.heading}>Formulario de Registro</h1>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className="form-group">
                <label className="form-group__label">ID</label>
                <input
                  type="text"
                  className={`form-group__input ${
                    formErrors.id ? 'has-error' : ''
                  }`}
                  name="id"
                  onChange={handleOnChange}
                />
                {formErrors.id && (
                  <div className="form-group__error">{formErrors.id}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-group__label">Descripción</label>
                <input
                  type="text"
                  className={`form-group__input ${
                    formErrors.description ? 'has-error' : ''
                  }`}
                  name="description"
                  onChange={handleOnChange}
                />
                {formErrors.description && (
                  <div className="form-group__error">
                    {formErrors.description}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-group__label">Fecha Liberación</label>
                <input
                  type="date"
                  className="form-group__input"
                  name="releaseDate"
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className={styles.col}>
              <div className="form-group">
                <label className="form-group__label">Nombre</label>
                <input
                  type="text"
                  className={`form-group__input ${
                    formErrors.name ? 'has-error' : ''
                  }`}
                  name="name"
                  onChange={handleOnChange}
                />
                {formErrors.name && (
                  <div className="form-group__error">{formErrors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-group__label">Logo</label>
                <input
                  type="text"
                  className={`form-group__input ${
                    formErrors.logo ? 'has-error' : ''
                  }`}
                  name="logo"
                  onChange={handleOnChange}
                />
                {formErrors.logo && (
                  <div className="form-group__error">{formErrors.logo}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-group__label">Fecha Revisión</label>
                <input
                  type="date"
                  className="form-group__input"
                  name="revisionDate"
                  value={formData.revisionDate}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <Button type="secondary" onClick={() => console.log('reset')}>
              Reiniciar
            </Button>
            <Button onClick={() => {}} disabled={!isFormValid}>
              Enviar
            </Button>
          </div>
        </form>
      </>
    </Page>
  );
};

export default ProductDetails;
