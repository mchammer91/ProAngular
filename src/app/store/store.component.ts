import { Component } from "@angular/core";
import { Product } from "../models/product.model";
import { ProductRepository } from "../models/product.repository";

@Component({
    selector: "store",
    templateUrl: "store.component.html"
})
export class StoreComponent {
    selectedCategory: string | undefined;
    productsPerPage = 4;
    selectedPage = 1;

    constructor(private repository: ProductRepository) { }

    get products(): Product[] {
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage
        return this.repository.getProducts(this.selectedCategory)
            .slice(pageIndex, pageIndex + this.productsPerPage);
    }

    get categories(): string[] {
        return this.repository.getCategories();
    }

    changeCategory(newCategory?: string) {
        this.selectedCategory = newCategory;
    }

    changePage(newPage: number) {
        this.selectedPage = newPage;
    }

    changePageSize(newSize: number) {
        this.productsPerPage = Number(newSize);
        this.changePage(1);
    }

    // get pageNumbers(): number[] {
    //   return Array(Math.ceil(this.repository
    //       .getProducts(this.selectedCategory).length / this.productsPerPage))
    //           // interesting way of getting all page #s
    //           .fill(0).map((x, i) => i + 1);
    // }

    // for using bad structural directive
    get pageCount(): number {
      return Math.ceil(this.repository
          .getProducts(this.selectedCategory).length / this.productsPerPage)
  }
}
