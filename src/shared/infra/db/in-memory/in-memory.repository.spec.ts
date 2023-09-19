import { Entity } from "../../../domain/entity";
import { ValueObject } from "../../../domain/value-object";
import { Uuid } from "../../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityConstructor = {
  entity_id?: Uuid;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityConstructor) {
    super();
    this.entity_id = props.entity_id;
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return { name: this.name, price: this.price, entity_id: this.entity_id.id };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe("InMemoryRepository Unit Tests", () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  test("should insert a new entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Test",
      price: 100,
    });

    await repo.insert(entity);
    expect(repo.items.length).toBe(1);
  });

  test("should bulk insert entities", async () => {
    const entities = [
      new StubEntity({
        entity_id: new Uuid(),
        name: "Test",
        price: 100,
      }),
      new StubEntity({
        entity_id: new Uuid(),
        name: "Test",
        price: 100,
      }),
    ];

    await repo.bulkInsert(entities);

    expect(repo.items.length).toBe(2);
    expect(repo.items[0]).toBe(entities[0]);
    expect(repo.items[1]).toBe(entities[1]);
  });

  test("should returns all entities", async () => {
    const aggregate = new StubEntity({ name: "name value", price: 5 });
    await repo.insert(aggregate);

    const entities = await repo.findAll();
    expect(entities).toStrictEqual([aggregate]);
  });

  it("should delete an entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "name value",
      price: 5,
    });
    await repo.insert(entity);

    await repo.delete(entity.entity_id);
    expect(repo.items).toHaveLength(0);

    await repo.insert(entity);
    await repo.delete(entity.entity_id);
    expect(repo.items).toHaveLength(0);
  });
});
