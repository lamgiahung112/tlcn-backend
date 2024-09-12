import UpdateMotorbikeRequest from '../dto/UpdateMotorbikeRequest';
import MotorbikeRepository from '../repositories/motorbike.repository';

export default class MotorbikeService {
    constructor(private readonly motorbikeRepository: MotorbikeRepository) {}

    async create(data: UpdateMotorbikeRequest) {
        return this.motorbikeRepository.create(data);
    }

    async update(id: string, data: UpdateMotorbikeRequest) {
        return this.motorbikeRepository.update(id, data);
    }
}
