import {
  IsEnum,
  IsString,
  Length,
  Matches,
  IsEmail,
  IsDecimal,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';
import { FUNCTIONAL_UNIT_TYPE } from 'src/utils/constants';

export class CreateFunctionalUnitDto {
  /**
   * El tipo de la Unidad Funcional
   * @example "Apartamento"
   */
  @IsEnum(FUNCTIONAL_UNIT_TYPE, {
    message:
      'El tipo debe ser uno de los siguientes: Apartmento, Garaje, Espacio Comercial, Oficina, Otro',
  })
  @IsNotEmpty({ message: 'El tipo es requerido' })
  type: FUNCTIONAL_UNIT_TYPE;

  /**
   * La ubicación de la Unidad Funcional
   * @example "Piso 1, Departamento A"
   */
  @IsString({ message: 'La ubicación debe ser una cadena de texto' })
  @Length(1, 50, { message: 'La ubicación debe tener entre 1 y 50 caracteres' })
  @IsNotEmpty({ message: 'La ubicación es requerida' })
  location: string;

  /**
   * El número de la Unidad Funcional
   * @example "1A"
   */
  @IsString({ message: 'El número debe ser una cadena de texto' })
  @Length(1, 20, { message: 'El número debe tener entre 1 y 20 caracteres' })
  @IsNotEmpty({ message: 'El número es requerido' })
  number: string;

  /**
   * El propietario de la Unidad Funcional
   * @example "Maria Lopez"
   */
  @IsString({ message: 'El propietario debe ser una cadena de texto' })
  @Length(1, 50, {
    message: 'El propietario debe tener entre 1 y 50 caracteres',
  })
  @IsNotEmpty({ message: 'El propietario es requerido' })
  owner: string;

  /**
   * El número de teléfono del propietario de la Unidad Funcional
   * @example "1145678901"
   */
  @IsString({ message: 'El número de teléfono debe ser una cadena de texto' })
  @Length(1, 20, {
    message: 'El número de teléfono debe tener entre 1 y 20 caracteres',
  })
  @Matches(/^[0-9]+$/, {
    message: 'El número de teléfono debe contener solo números',
  })
  @IsNotEmpty({ message: 'El número de teléfono es requerido' })
  owner_phone_number: string;

  /**
   * El correo electrónico del propietario de la Unidad Funcional
   * @example "maria.lopez@example.com"
   */
  @IsEmail(
    {},
    {
      message: 'El correo electrónico debe ser una dirección de correo válida',
    },
  )
  @Length(1, 50, {
    message: 'El correo electrónico debe tener entre 1 y 50 caracteres',
  })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  owner_email: string;

  /**
   * El saldo de la Unidad Funcional
   * @example "1500.50"
   */
  @IsNotEmpty({ message: 'El saldo es requerido' })
  @IsDecimal(
    { decimal_digits: '2', force_decimal: true },
    { message: 'El saldo debe ser un número decimal con hasta 2 decimales' },
  )
  balance: number;

  /**
   * El id del consorcio al que pertenece la Unidad Funcional
   * @example "5e4d5f8b-2e6d-4f49-9b3e-8d6c6f7e8a5b"
   */
  @IsUUID()
  @IsNotEmpty({ message: 'El ID del consorcio es requerido' })
  consortium_id: string;
}
