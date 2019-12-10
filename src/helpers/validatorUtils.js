import Validator from 'indicative/builds/validator';
import { validations, } from 'indicative';
import { Vanilla, } from 'indicative/builds/formatters';


export const sanitizeRules = {
    categoryCode: 'trim',
    diagnosisCode: 'trim',
    fullCode: 'trim',
    abbreviatedCode: 'trim',
    fullDescription: 'trim',
    categoryTitle: 'trim',
    publish: 'to_boolean',
};


export const messages = {
    required: '{{ field }} is required',
    string: '{{ field }} is not a string',
    unique: '{{ field }} must be unique',
    min: '{{ field }} must be more than {{ argument.0 }} characters',
    alpha_numeric: 'only numbers and letters are allowed for {{ field }}',
};


export const validatorInstance = Validator(validations, Vanilla);
