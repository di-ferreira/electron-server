import {
  iCustomer,
  iCustomerRepository,
  iDeleteCustomer,
} from '../../../ProjectTypes/Customer/iCustomerService';
import AppError from '../../../errors/AppError';
import CustomerRepository from '../Repository';

class DeleteCustomerService {
  private customerRepository: iCustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({ id }: iDeleteCustomer): Promise<iCustomer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    await this.customerRepository.remove(customer);

    return customer;
  }
}

export default DeleteCustomerService;
