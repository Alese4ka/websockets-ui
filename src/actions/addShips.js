export const addShips = (message) => {
  const addShipsObj = JSON.stringify({
    type: "start_game",
    data: JSON.stringify({
            ships: JSON.parse(message.data),
            currentPlayerIndex: message.id,
        }),
    id: 0
  });
  return addShipsObj;
}