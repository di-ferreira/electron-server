import { iExistAddress } from '../../../ProjectTypes/Address/iAddressService';
import {
  iCreateCustomer,
  iCustomer,
  iCustomerRepository,
} from '../../../ProjectTypes/Customer/iCustomerService';
import AppError from '../../../errors/AppError';
import AppDataSource from '../../../infra/DataSource';
import { Address } from '../../Address/Entity';
import AddressRepository from '../../Address/Repository';
import { Customer } from '../Entity';
import CustomerRepository from '../Repository';

class CreateCustomerService {
  private customerRepository: iCustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({
    name,
    phone,
    address,
  }: iCreateCustomer): Promise<iCustomer> {
    const phoneExists = await this.customerRepository.findByPhone(phone);
    if (phoneExists) {
      throw new AppError('There is already one customer with this phone');
    }

    const customer = new Customer();
    customer.name = name;
    customer.phone = phone;

    const customerSave = await AppDataSource.manager.save(customer);

    if (address.city) {
      const addressRepository = new AddressRepository();
      const addressExists = await addressRepository.findExists(
        address as iExistAddress
      );

      if (addressExists) {
        throw new AppError('Address exists');
      }

      const addressSave = new Address();
      addressSave.street = address.street;
      addressSave.number = address.number;
      addressSave.district = address.district;
      addressSave.city = address.city;
      addressSave.complement = address.complement;
      addressSave.state = address.state;
      addressSave.customer = customerSave;

      await AppDataSource.manager.save(addressSave);
    }

    const result = await this.customerRepository.findById(customerSave.id);

    return result;
  }
}

export default CreateCustomerService;
