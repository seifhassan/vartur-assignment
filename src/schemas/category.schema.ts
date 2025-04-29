export const createCategorySchema = {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        parentId: { type: 'number', nullable: true },
      },
    },
  };
  
  export const updateCategorySchema = {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        parentId: { type: 'number', nullable: true },
      },
    },
  };
  
  export const categoryParamsSchema = {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'integer' },
      },
    },
  };
  