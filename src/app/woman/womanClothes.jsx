import React, { useEffect } from 'react';
import useProductStore from '../../store/apiClothes.js';

function WomenClothing() {
    const { products, isLoading, error, fetchWomenClothing } = useProductStore();

    useEffect(() => {
        fetchWomenClothing(); // Fetch de productos al cargar el componente
    }, [fetchWomenClothing]);

    return (
        <div>
            <h1>Women's Clothing</h1>

            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} style={{ border: '1px solid #ccc', padding: '20px' }}>
                            <img src={product.image} alt={product.title} style={{ width: '100px', height: '150px' }} />
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
}

export default WomenClothing;
