// what is the point / intent of this file?
/* From the book:
    The data source is responsible for providing the application with the data it requires,
    but access to that data is typically mediated by a repository,
    which is responsible for distributing that data to individual application building blocks
    so that the details of how the data has been obtained are kept hidden.
*/

import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class ProductRepository {
    private products: Product[] = [];
    private categories: string[] = [];

    constructor(private dataSource: StaticDataSource) {
        dataSource.getProducts().subscribe(data => {
            this.products = data;
            this.categories = data.map(p => p.category ?? "(None)")
                // what exactly is this filter method doing?
                // basically like reduce, removing duplicate category names
                .filter((c, index, array) => array.indexOf(c) == index).sort();
        });
    }

    getProducts(category?: string): Product[] {
        return this.products
            .filter(p => category == undefined || category == p.category);
    }

    getProduct(id: number): Product | undefined {
        return this.products.find(p => p.id == id);
    }

    getCategories(): string[] {
        return this.categories;
    }
}
