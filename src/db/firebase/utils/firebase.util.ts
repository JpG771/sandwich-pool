export const setObjectId = (firebaseSandwich: any): any => {
  const { idField, ...withoutId } = firebaseSandwich;
  return {
    ...withoutId,
    id: idField
  };
}