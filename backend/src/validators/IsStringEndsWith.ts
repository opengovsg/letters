import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'

@ValidatorConstraint()
export class IsStringEndsWith implements ValidatorConstraintInterface {
  validate(text: string, validationArguments: ValidationArguments) {
    const endsWith = validationArguments.constraints[0]
    return text.toLowerCase().endsWith(endsWith.toLowerCase())
  }
}
