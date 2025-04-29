export const createProductSchema = {
    body: {
      type: 'object',
      required: ['name', 'price', 'categoryId'],
      properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        categoryId: { type: 'integer' },
      },
    },
  };
  
  export const updateProductSchema = {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        categoryId: { type: 'integer' },
      },
    },
  };
  
  export const productParamsSchema = {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'integer' },
      },
    },
  };
  