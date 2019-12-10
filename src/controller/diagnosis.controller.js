import Baserepository from '../Baserepository';
import db from '../database/models';
import Pagination from '../helpers/pagination';
import { responseGenerator } from '../helpers/responseGenerator';

class DiagnosisController {
  static async createDiagnosis(req, res) {
    const {
      categoryCode,
      diagnosisCode,
      fullCode,
      abbreviatedCode,
      fullDescription,
      categoryTitle,
    } = req.body;

    const diagnosis = await Baserepository.create(db.diagnosis, {
      category_code: categoryCode,
      diagnosis_code: diagnosisCode,
      full_code: fullCode,
      abbreviated_code: abbreviatedCode,
      full_description: fullDescription,
      category_title: categoryTitle,
    });

    return responseGenerator.sendSuccess(
      res,
      201,
      { diagnosis },
      'Diagnosis created successfully',
    );
  }

  static async modifyDiangosis(req, res) {
    const {
      categoryCode,
      diagnosisCode,
      fullCode,
      abbreviatedCode,
      fullDescription,
      categoryTitle,
    } = req.body;

    const diagnosis = await Baserepository.findAndUpdate(db.diagnosis, {
      category_code: categoryCode,
      diagnosis_code: diagnosisCode,
      full_code: fullCode,
      abbreviated_code: abbreviatedCode,
      full_description: fullDescription,
      category_title: categoryTitle,
    });

    return responseGenerator.sendSuccess(res, 200, { diagnosis });
  }

  static async deleteDiagnosis(req, res) {
    const { id } = req.params;
    await Baserepository.remove(db.diagnosis, { id });

    return responseGenerator.sendSuccess(res, 203, {});
  }

  static async getSpecificDiagnosis(req, res) {
    const { id } = req.params;
    const specificDiagnosis = await Baserepository.findOneByField(db.diagnosis, { id });
    if (!specificDiagnosis) {
      return responseGenerator.sendError(res, 400, 'Diagnosis does not exist');
    }
    return responseGenerator.sendSuccess(res, 200, specificDiagnosis);
  }

  static async getAllDiagnosis(req, res) {
    const { page = 1 } = query;
    const paginate = new Pagination(page, req.query.limit);
    const { limit, offset } = paginate.getQueryMetadata();
    const { count, rows } = await Baserepository.findAndCountAll(db.diagnosis);


    return responseGenerator.sendSuccess(
      res,
      200,
      articles,
      null,
      paginate.getPageMetadata(count, '/api/v1/articles')
    );
  }
}

export default DiagnosisController;
