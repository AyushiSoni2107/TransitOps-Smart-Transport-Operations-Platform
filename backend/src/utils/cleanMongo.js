export function cleanMongoId(value) {
  if (Array.isArray(value)) {
    return value.map(cleanMongoId);
  }

  if (value && typeof value === 'object') {
    const { _id, ...rest } = value;
    return rest;
  }

  return value;
}
