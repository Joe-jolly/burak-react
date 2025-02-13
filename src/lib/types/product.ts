import { ProductCollection, ProductSize, ProductStatus } from "../enums/product.enum";


export interface Product {
    _id: string;
    productStatus: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    ProductPrice: Number;
    productLeftCount: Number;
    productSize: ProductSize;
    productVolume: Number;
    productDesc?: string;
    productImages: string[];
    productViews: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductInquiry
{
    order: string;
    page: number;
    limit: number;
    productCollection?: ProductCollection;
    search?: string;
}