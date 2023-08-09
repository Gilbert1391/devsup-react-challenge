import { Product } from '../../features/products/models';
import './ProductsTable.css';

interface Props {
  data: Product[];
}

const ProductsTable: React.FC<Props> = ({ data }) => {
  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>Logo</th>
          <th>Nombre del producto</th>
          <th>Descripcion</th>
          <th>Fecha de liberacion</th>
          <th>Fecha de revision</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.id}>
            <td>
              <img
                src={p.logo}
                style={{
                  width: '30%',
                }}
              />
            </td>
            <td>{p.name}</td>
            <td>{p.description}</td>
            <td>{p.date_release}</td>
            <td>{p.date_revision}</td>
            <td>...</td>
          </tr>
        ))}
      </tbody>
      <tfoot>{data.length} Resultados</tfoot>
    </table>
  );
};

export default ProductsTable;
