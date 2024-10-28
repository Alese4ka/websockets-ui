export const createGame = (users) => {
  const addUserObj = {
    type: "create_game", 
    data: JSON.stringify({
      idGame: 0,  
      idPlayer: users[0].id,
    }),
    id: 0,
  };
  return JSON.stringify(addUserObj);
}