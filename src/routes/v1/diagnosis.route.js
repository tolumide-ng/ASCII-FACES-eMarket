import { Router } from 'express';
import DiagnosisController from '../../controller/diagnosis.controller';
import {
  createDiagnosis,
  modifyDiagnosis,
  getSpecificDiagnosis,
} from '../../validators/diagnosis.validator';

const router = Router();

router.post('/', createDiagnosis, DiagnosisController.createDiagnosis);
router.put('/', modifyDiagnosis, DiagnosisController.modifyDiangosis);
router.get('/', DiagnosisController.getAllDiagnosis);
router.get('/:diagnosisCode', getSpecificDiagnosis, DiagnosisController.getSpecificDiagnosis);

export default router;
