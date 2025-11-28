import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Carousel, type CarouselResponsiveOption } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

const CarouselComponent = () => {
    const [products, setProducts] = useState<Product[]>([]);

    // 🔥 Mock direto no componente
    const mockProducts: Product[] = [
        {
            id: "1000",
            code: "f230fh0g3",
            name: "Bamboo Watch",
            description: "Product Description",
            image: "bamboo-watch.jpg",
            price: 65,
            category: "Accessories",
            quantity: 24,
            inventoryStatus: "INSTOCK",
            rating: 5
        },
        {
            id: "1001",
            code: "nvklal433",
            name: "Black Watch",
            description: "Product Description",
            image: "black-watch.jpg",
            price: 72,
            category: "Accessories",
            quantity: 61,
            inventoryStatus: "INSTOCK",
            rating: 4
        },
        {
            id: "1000",
            code: "f230fh0g3",
            name: "Bamboo Watch",
            description: "Product Description",
            image: "bamboo-watch.jpg",
            price: 65,
            category: "Accessories",
            quantity: 24,
            inventoryStatus: "INSTOCK",
            rating: 5
        },
        {
            id: "1001",
            code: "nvklal433",
            name: "Black Watch",
            description: "Product Description",
            image: "black-watch.jpg",
            price: 72,
            category: "Accessories",
            quantity: 61,
            inventoryStatus: "INSTOCK",
            rating: 4
        },
        {
            id: "1000",
            code: "f230fh0g3",
            name: "Bamboo Watch",
            description: "Product Description",
            image: "bamboo-watch.jpg",
            price: 65,
            category: "Accessories",
            quantity: 24,
            inventoryStatus: "INSTOCK",
            rating: 5
        },
        {
            id: "1001",
            code: "nvklal433",
            name: "Black Watch",
            description: "Product Description",
            image: "black-watch.jpg",
            price: 72,
            category: "Accessories",
            quantity: 61,
            inventoryStatus: "INSTOCK",
            rating: 4
        },
        {
            id: "1000",
            code: "f230fh0g3",
            name: "Bamboo Watch",
            description: "Product Description",
            image: "bamboo-watch.jpg",
            price: 65,
            category: "Accessories",
            quantity: 24,
            inventoryStatus: "INSTOCK",
            rating: 5
        },
        {
            id: "1001",
            code: "nvklal433",
            name: "Black Watch",
            description: "Product Description",
            image: "black-watch.jpg",
            price: 72,
            category: "Accessories",
            quantity: 61,
            inventoryStatus: "INSTOCK",
            rating: 4
        }
    ];

    const responsiveOptions: CarouselResponsiveOption[] = [
        { breakpoint: "1400px", numVisible: 2, numScroll: 1 },
        { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
        { breakpoint: "767px", numVisible: 2, numScroll: 1 },
        { breakpoint: "575px", numVisible: 1, numScroll: 1 }
    ];

    const getSeverity = (product: Product) => {
        switch (product.inventoryStatus) {
            case "INSTOCK": return "success";
            case "LOWSTOCK": return "warning";
            case "OUTOFSTOCK": return "danger";
            default: return null;
        }
    };

    // 🔥 Em vez de API, carregamos mock aqui
    useEffect(() => {
        setProducts(mockProducts);
    }, []);

    const productTemplate = (product: Product) => {
        return (
            <Card className="border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img
                        src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
                        alt={product.name}
                        className="w-6 shadow-2"
                    />
                </div>
                <div>
                    <h4 className="mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">${product.price}</h6>
                    <Tag value={product.inventoryStatus} severity={getSeverity(product)} />
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" rounded />
                        <Button icon="pi pi-star-fill" rounded severity="success" />
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <div className="mt-5">
            <Card className="justify-content-center align-items-center">
                <Carousel
                    value={products}
                    numVisible={3}
                    numScroll={3}
                    responsiveOptions={responsiveOptions}
                    itemTemplate={productTemplate}
                    circular
                    autoplayInterval={3000}
                />
            </Card>
        </div>
    );
};

export default CarouselComponent;