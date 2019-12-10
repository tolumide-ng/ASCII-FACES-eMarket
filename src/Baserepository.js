import Sequelize from 'sequelize';
import models from './database/models';

class Baserepository {
  static async create(model, options) {
    return model.create(options);
  }

  static async findOneByField(model, options) {
    return model.findOne({ where: options, raw: true });
  }

  static async findAndUpdate(model, fields, options) {
    return model.update(fields, {
      where: options,
      returning: true,
    });
  }

  static async remove(model, options) {
    return model.destroy({
      where: { ...options },
    });
  }
}

export default Baserepository;
