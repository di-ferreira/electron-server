import {
  iCustomer,
  iCustomerRepository,
  iShowCustomer,
} from '../../../ProjectTypes/Customer/iCustomerService';
import AppError from '../../../errors/AppError';
import CustomerRepository from '../Repository';

class ShowCustomerByPhoneService {
  private customerRepository: iCustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({ phoneid }: iShowCustomer): Promise<iCustomer> {
    const customer = await this.customerRepository.findByPhone(String(phoneid));

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerByPhoneService;
