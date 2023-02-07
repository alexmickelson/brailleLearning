
export interface Rules {
  regex?: RegExp,
  max?: number,
  min?: number,
  required?: boolean
}

export function validate(value: string, rules?: Rules): string {
  if (rules) {
    if (rules.regex) {
      if (!rules.regex.test(value)) {
        return `${value} does not match ${rules.regex}`
      }
    }
    if (rules.max) {
      if (value.length > rules.max) {
        return `must be less than ${rules.max} characters`
      }
    }
    if (rules.min) {
      if (value.length < rules.min) {
        return `must be at least ${rules.min} characters`
      }
    }
    if (rules.required && value.length === 0) {
      return `required`
    }
  }
  return ''
}