import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Product } from '../../features/products/models';
import Button from '../button/Button';
import ContextMenu, { ContextMenuOption } from '../contextMenu/ContextMenu';
import { AppDispatch } from '../../store';
import { deleteProduct } from '../../features/products/productsSlice';
import styles from './ProductsTable.module.css';

interface ProductsTableProps {
  data: Product[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const pageSize = 5;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    paginateProducts(data, currentPage);
  }, [data]);

  const paginateProducts = (products: Product[], page: number) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const result = products.slice(startIndex, endIndex);
    setFilteredProducts(result);
  };

  const totalPages: number = useMemo(
    () => Math.ceil(data.length / pageSize),
    [data],
  );

  const handlePagination = (page: any) => {
    paginateProducts(data, page);
    setCurrentPage(page);
  };

  const isWhitespaceString = (input: string) => {
    return /^\s*$/.test(input);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);

    if (isWhitespaceString(term)) {
      paginateProducts(data, 1);
    } else {
      const filteredItems = data.filter((p) =>
        p.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
      );
      // Always display the first page of search results
      paginateProducts(filteredItems, 1);
    }
  };

  const contextMenuOptions = useCallback((id: string): ContextMenuOption[] => {
    return [
      { label: 'Editar', onClick: () => navigate(`/products/${id}`) },
      {
        label: 'Eliminar',
        onClick: () => dispatch(deleteProduct(id)),
      },
    ];
  }, []);

  return (
    <>
      <div className={styles.actionHeader}>
        <input
          type="text"
          placeholder="Search..."
          className="input"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button onClick={() => navigate('/new-product')}>Agregar</Button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
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
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={p.logo}
                    style={{
                      width: '50px',
                    }}
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.date_release}</td>
                <td>{p.date_revision}</td>
                <td>
                  <ContextMenu options={contextMenuOptions(p.id)} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>{data.length} Resultados</td>
              <td>
                <select
                  className="input"
                  value={currentPage}
                  onChange={(e) => handlePagination(Number(e.target.value))}>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ProductsTable;
