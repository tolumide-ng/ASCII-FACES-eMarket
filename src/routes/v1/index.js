import diagnosisRoute from './diagnosis.route';

export default (app) => {
  app.use('/api/v1/diagnos', diagnosisRoute);
};
