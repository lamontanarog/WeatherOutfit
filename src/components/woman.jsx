"use client";
import { useProductStore } from "../store/apiClothes.js";
import { useEffect, useState } from "react";

function WomanClothes() {
    const { product, fetchRandomProduct, loading, error } = useProductStore();
    const [selectCategory, setSelectCategory] = useState(null)

    const handleCategoryClick = (category) => {
        setSelectCategory(category);
        fetchRandomProduct(category);

    };

    useEffect(() => {
        if (selectCategory) {
            fetchRandomProduct(selectCategory);
        }
        
    }, [selectCategory]);

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>

    // Lista de categorías
    const categories = [
        { name: "chaquetas", value: "womens-jackets" },
        { name: "Vestido", value: "womens-dresses" },
        { name: "abrigo", value: "womens-coats" },
        { name: "pantalon", value: "womens-pants" },
        { name: "blusas", value: "womens-tops" },
        { name: "zapatos", value: "womens-shoes" },
        { name: "sudaderas", value: "womens-hoodies" },
        { name: "faldas", value: "womens-skirts" },
        { name: "accesorios", value: "womens-accessories" },

    ];

    return (
        <div>
            <h1>Elige una categoría</h1>
            <div>
                {categories.map((category) => (
                    <button
                        key={category.value}
                        onClick={() => handleCategoryClick(category.value)}
                        style={{ margin: "10px", padding: "10px" }}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Mostrar el producto seleccionado */}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {product && (
                <div style={{ marginTop: "20px" }}>
                    <h2>{product.title}</h2>
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        style={{ width: "150px", height: "200px" }}
                    />
                </div>
            )}
        </div>
    );
}

export default WomanClothes;
