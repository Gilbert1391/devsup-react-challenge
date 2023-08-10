import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
  useMemo,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../Components/page/Page';
import Button from '../../Components/button/Button';
import { Product } from '../../features/products/models';
import { AppDispatch } from '../../store';
import {
  createProduct,
  fetchProducts,
  productSelector,
  updateProduct,
} from '../../features/products/productsSlice';
import styles from './ProductDetails.module.css';

interface FormData {
  id: string;
  name: string;
  description: string;
  logo: string;
  releaseDate: string;
  revisionDate: string;
}

const ProductDetails = () => {
  const { id: paramId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products } = useSelector(productSelector);

  const [formData, setFormData] = useState<FormData>({
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
    releaseDate: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // if page is refresh in this route, fetch products
  useEffect(() => {
    if (!products.length) dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (paramId) {
      const product: Product | undefined = products.find(
        (p) => p.id === paramId,
      );
      if (product) {
        const data: FormData = {
          id: product.id,
          name: product.name,
          description: product.description,
          logo: product.logo,
          releaseDate: formatISODateAsYyyyMmDd(product.date_release),
          revisionDate: formatISODateAsYyyyMmDd(product.date_revision),
        };
        setFormData(data);
      }
    }
  }, [paramId, products]);

  useEffect(() => {
    if (isSubmitted) validateForm();
  }, [formData, isSubmitted]);

  const formatISODateAsYyyyMmDd = (inputDate: string) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const setFieldError = (
    errors: any,
    field: keyof FormData,
    fieldLabel: string,
    min?: number,
    max?: number,
  ) => {
    if (!formData[field]) errors[field] = `${fieldLabel} es requerido`;
    else if (min && formData[field].length < min)
      errors[field] = `${fieldLabel} mínimo ${min} caracteres`;
    else if (max && formData[field].length > max)
      errors[field] = `${fieldLabel} máximo ${max} caracteres`;
  };

  const validateForm = () => {
    const errors: any = {};
    setFieldError(errors, 'id', 'ID', 3, 10);
    setFieldError(errors, 'name', 'Nombre', 5, 100);
    setFieldError(errors, 'description', 'Descripción', 10, 200);
    setFieldError(errors, 'logo', 'Logo');
    setFieldError(errors, 'releaseDate', 'Fecha de Liberación');

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReleaseDate = (dateVal: string) => {
    const releaseDate = new Date(dateVal);
    const revisionDate = new Date(
      releaseDate.getFullYear() + 1,
      releaseDate.getMonth(),
      releaseDate.getDate(),
    );
    setFormData((prevData) => ({
      ...prevData,
      releaseDate: dateVal,
      revisionDate: revisionDate.toISOString().substr(0, 10),
    }));
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'releaseDate') {
      handleReleaseDate(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm()) {
      const { id, name, description, logo } = formData;
      const request: Product = {
        id,
        name,
        description,
        logo,
        date_release: formData.releaseDate,
        date_revision: formData.revisionDate,
      };
      const thunk: any = paramId === undefined ? createProduct : updateProduct;
      const actionResult = await dispatch(thunk(request));
      if (thunk.fulfilled.match(actionResult)) {
        navigate('/products');
      } else {
        //handle error, by showing toast, etc
      }
    }
  };

  const isFormValid: boolean = useMemo(
    () => Object.values(formErrors).every((error) => !error),
    [formErrors],
  );
  const currentDate: string = useMemo(
    () => new Date().toISOString().split('T')[0],
    [],
  );

  return (
    <Page style={{ maxWidth: '750px' }}>
      <>
        <h1 className={styles.heading}>Formulario de Registro</h1>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className="form-group">
                <label className="form-group__label" htmlFor="id">
                  ID
                </label>
                <input
                  disabled={paramId !== undefined}
                  id="id"
                  type="text"
                  className={`form-group__input ${
                    formErrors.id ? 'has-error' : ''
                  }`}
                  name="id"
                  onChange={handleOnChange}
                  value={formData.id}
                />
                {formErrors.id && (
                  <div className="form-group__error">{formErrors.id}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-group__label" htmlFor="description">
                  Descripción
                </label>
                <input
                  id="description"
                  type="text"
                  className={`form-group__input ${
                    formErrors.description ? 'has-error' : ''
                  }`}
                  name="description"
                  onChange={handleOnChange}
                  value={formData.description}
                />
                {formErrors.description && (
                  <div className="form-group__error">
                    {formErrors.description}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-group__label" htmlFor="releaseDate">
                  Fecha Liberación
                </label>
                <input
                  id="releaseDate"
                  type="date"
                  min={currentDate}
                  className={`form-group__input ${
                    formErrors.releaseDate ? 'has-error' : ''
                  }`}
                  name="releaseDate"
                  onChange={handleOnChange}
                  value={formData.releaseDate}
                />
                {formErrors.releaseDate && (
                  <div className="form-group__error">
                    {formErrors.releaseDate}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.col}>
              <div className="form-group">
                <label className="form-group__label" htmlFor="name">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  className={`form-group__input ${
                    formErrors.name ? 'has-error' : ''
                  }`}
                  name="name"
                  onChange={handleOnChange}
                  value={formData.name}
                />
                {formErrors.name && (
                  <div className="form-group__error">{formErrors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-group__label" htmlFor="logo">
                  Logo
                </label>
                <input
                  id="logo"
                  type="text"
                  className={`form-group__input ${
                    formErrors.logo ? 'has-error' : ''
                  }`}
                  name="logo"
                  onChange={handleOnChange}
                  value={formData.logo}
                />
                {formErrors.logo && (
                  <div className="form-group__error">{formErrors.logo}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-group__label" htmlFor="revisionDate">
                  Fecha Revisión
                </label>
                <input
                  id="revisionDate"
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
