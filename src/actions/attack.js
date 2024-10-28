const getRandomAttackValue = () => {
  const values = ["miss", "killed", "shot"];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

export const attack = (users, message, countAttack) => {
  if (countAttack >= 20) {
    const winnerObj = JSON.stringify({
      type: "finish",
      data: JSON.stringify({
        winPlayer: users[0].id,
      }),
      id: 0,
    });
    return winnerObj;
  } else {
    const infoObj = JSON.parse(message.data);
    const attackShipsObj = JSON.stringify({
      type: "attack",
      data: JSON.stringify({
            position: {x: infoObj.x, y: infoObj.y },
            currentPlayerIndex: message.id,
            status: getRandomAttackValue()
          }),
      id: 0
    });
    return attackShipsObj;
  }
}