// ENUMS, CONSTANTS
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: './.env.development' });

export const CADMIN_PASS = process.env.CADMIN_PASS;

export enum SAT {
  MONOTAX = 'Monotributo',
  REGISTERED_RESPONSIBLE = 'Responsable Inscripto',
  NON_REGISTERED_RESPONSIBLE = 'Responsable No Inscripto',
  EXEMPT = 'Exento',
}

export enum ROLE {
  CADMIN = 'cadmin',
  USER = 'user',
  SUPERADMIN = 'superadmin',
}

export enum FUNCTIONAL_UNIT_TYPE {
  APARTMENT = 'Apartmento',
  GARAGE = 'Garaje',
  COMMERCIAL_SPACE = 'Espacio Comercial',
  OFFICE = 'Oficina',
  OTHER = 'Otro',
}

export enum STATUS {
  ACTIVATED = 'activated',
  DISABLED = 'disabled',
}

export enum EXPENDITURE_STATUS {
  UNPAID = 'impago',
  PAID = 'pagado',
}

export enum EXPENDITURE_CATEGORY {
  UTILITIES = 'Servicios Públicos',
  SERVICE_SUBSCRIPTION = 'Abono de Servicios',
  COMMON_AREA_MAINTENANCE = 'Mantenimiento de partes comunes',
  BANK_FEES = 'Gastos bancarios',
  CLEANING_EXPENSES = 'Gastos de limpieza',
  ADMINISTRATIVE_EXPENSES = 'Gastos administrativos',
  INSURANCES = 'Seguro',
  SALARIES = 'Sueldos',
  OTHER_EXPENSES = 'Otros',
}