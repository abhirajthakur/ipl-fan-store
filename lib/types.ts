export interface User {
    id: string;
    name: string;
    email: string;
    team: IPLTeam;
}

export interface IPLTeam {
    id: string;
    name: string;
    colors: {
        primary: string;
        secondary: string;
    };
    logo: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: ProductCategory;
}

export type ProductCategory = 'Apparel' | 'Equipment' | 'Accessories' | 'Collectibles';

export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    product: Product;
}

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
}