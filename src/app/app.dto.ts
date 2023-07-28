export class StudentDto {
  constructor(
    private firstName: string,
    private lastName: string,
    private email: string,
    private phone: string,
    private address: string,
    private course: string
  ) {}
}
