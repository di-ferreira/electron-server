import { Request, Response } from 'express';
import { iProductController } from '../../../ProjectTypes/Product/iProductController';
import CreateProductService from '../Services/CreateProductService';
import DeleteProductService from '../Services/DeleteProductService';
import ListProductService from '../Services/ListProductService';
import ShowProductService from '../Services/ShowProductService';
import UpdateProductService from '../Services/UpdateProductService';

export default class ProductController implements iProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page);
    const limit = Number(request.query.limit);
    const listProduct = new ListProductService();
    const products = await listProduct.execute({ page, limit });

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProduct = new ShowProductService();
    const product = await showProduct.execute({ id: Number(id) });
    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { costPrice, minStock, name, stock, description } = request.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      costPrice,
      minStock,
      name,
      stock,
      description,
    });
    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { costPrice, minStock, name, stock, description } = request.body;
    const createProduct = new UpdateProductService();
    const product = await createProduct.execute({
      id: Number(id),
      costPrice,
      minStock,
      name,
      stock,
      description,
    });
    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProduct = new DeleteProductService();
    await deleteProduct.execute({ id: Number(id) });
    return response.status(204).json([]);
  }
}
