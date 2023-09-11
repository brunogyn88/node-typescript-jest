import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";

describe("Uuid Unit Tests", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

  test("shold throw error when uuid is valid", () => {
    expect(() => {
      new Uuid("invalid-uuid");
    }).toThrowError(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("should accept a valid", () => {
    const uuid = new Uuid("33625632-45ac-466a-ade4-fdf72ff56032");
    expect(uuid.id).toBe("33625632-45ac-466a-ade4-fdf72ff56032");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
