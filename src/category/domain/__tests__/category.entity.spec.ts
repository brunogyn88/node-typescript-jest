import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Uni Tests", () => {
  test("should change name", () => {
    const category = Category.create({ name: "Movie" });
    category.changeName("other name");
    expect(category.name).toBe("other name");
  });

  test("should change description", () => {
    const category = Category.create({ name: "Movie" });
    category.changeDescription("some description");
    expect(category.description).toBe("some description");
  });

  test("should active a category", () => {
    const category = Category.create({ name: "Movie", is_active: false });
    category.activate();
    expect(category.is_active).toBeTruthy();
  });

  test("should disable a category", () => {
    const category = Category.create({ name: "Movie", is_active: true });
    category.deactivate();
    expect(category.is_active).toBeFalsy();
  });

  describe("constructor", () => {
    test("should create a category with default values", () => {
      var category = Category.create({ name: "Movie" });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);

      const created_at = new Date();

      category = Category.create({
        name: "Movie",
        description: "Movie description",
        is_active: false,
        created_at,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(created_at);

      category = Category.create({
        name: "Movie",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);

      category = Category.create({
        name: "Movie",
        description: "Movie description",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should create a category with all values", () => {
      const created_at = new Date();

      const category = Category.create({
        name: "Movie",
        description: "Movie description",
        is_active: false,
        created_at,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(created_at);
    });

    test("should create a category with name and description", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });
});
