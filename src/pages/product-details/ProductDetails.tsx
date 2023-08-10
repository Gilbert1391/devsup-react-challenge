import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../Components/button/Button';
import Page from '../../Components/page/Page';
import styles from './ProductDetails.module.css';

type ProductDetailsProps = {};

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const { id } = useParams();
  return (
    <Page style={{ maxWidth: '700px' }}>
      <>
        <h1 className={styles.heading}>Formulario de Registro</h1>
        <form>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className="form-group">
                <label className="form-group__label">ID</label>
                <input type="text" className="form-group__input" />
              </div>

              <div className="form-group">
                <label className="form-group__label">Descripción</label>
                <input type="text" className="form-group__input" />
              </div>

              <div className="form-group">
                <label className="form-group__label">Fecha Liberación</label>
                <input type="text" className="form-group__input" />
              </div>
            </div>
            <div className={styles.col}></div>
          </div>
          <div className={styles.footer}>
            <Button type="secondary" onClick={() => {}}>
              Reiniciar
            </Button>
            <Button onClick={() => {}}>Enviar</Button>
          </div>
        </form>
      </>
    </Page>
  );
};

export default ProductDetails;
