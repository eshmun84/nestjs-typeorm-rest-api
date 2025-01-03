export class Permission {
  private readonly _id?: number | undefined;
  public _name: string;
  public _description?: string;
  private readonly _createdAt?: Date | undefined;
  private readonly _updatedAt?: Date | undefined;
  private readonly _deletedAt?: Date | undefined;


  constructor(id: number = undefined, name: string, description: string, createdAt: Date = undefined, updatedAt: Date = undefined, deletedAt: Date = undefined) {
    if (name.trim().length === 0) {
      throw new Error("Missing name");
    }

    this._id = id || null;
    this._name = name;
    this._description = description || null;
    this._createdAt = createdAt || undefined;
    this._updatedAt = updatedAt || undefined;
    this._deletedAt = deletedAt || undefined;
  }

  get id(): number | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  get deletedAt(): Date | undefined {
    return this._deletedAt;
  }

  public static create(name: string, description: string): Permission {
    return new Permission(null, name, description);
  }
}
