interface IMockModel {
  findOne: jest.Mock<any, any>;
  find: jest.Mock<any, any>;
  create: jest.Mock<any, any>;
  exec: jest.Mock<any, any>;
  save: jest.Mock<any, any>;
  populate: jest.Mock<any, any>;
  toObject: jest.Mock<any, any>;
}

export function mockModel<T>(data: T): T & IMockModel {
  return {
    ...data,
    findOne: jest.fn().mockImplementation(() => ({
      ...mockModel(data),
      ...Promise.resolve(mockModel(data)),
    })),
    find: jest.fn().mockImplementation(() => ({
      ...mockModel(data),
      ...Promise.resolve(mockModel(data)),
    })),
    create: jest.fn().mockImplementation(() => ({
      ...mockModel(data),
      ...Promise.resolve(mockModel(data)),
    })),
    exec: jest.fn().mockImplementation(() => ({
      ...mockModel(data),
      ...Promise.resolve(mockModel(data)),
    })),
    save: jest.fn().mockImplementation(() => ({
      ...mockModel(data),
      ...Promise.resolve(mockModel(data)),
    })),
    populate: jest.fn().mockImplementation(() => ({
      ...mockModel(data),
      ...Promise.resolve(mockModel(data)),
    })),
    toObject: jest.fn().mockImplementation(() => {
      const copy = Object.assign({} as IMockModel, data);
      return removeFunctions(copy);
    }),
  };
}

function removeFunctions<T>(object: T & IMockModel): T {
  for (const property in object) {
    if (typeof object[property] === 'function') {
      delete object[property];
    } else if (
      typeof object[property] === 'object' &&
      object[property].constructor === Object
    ) {
      removeFunctions(object[property]);
    } else if (Array.isArray(object[property])) {
      object[property].forEach(removeFunctions);
    }
  }

  return object;
}
