const updateItem = (items, newCard) => {
  const index = items.findIndex((item) => item.id === newCard.id);
  if (index === -1) {
    return items;
  }
  return [...items.slice(0, index), newCard, ...items.slice(index + 1)];
};

export {updateItem};
