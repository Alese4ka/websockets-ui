import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

let countAttack = 0;
const uuid = uuidv4();
const dataBasePath = path.join('./src/database/database.json');
const dataBase = fs.readFileSync('./src/database/database.json', 'utf-8');
const users = JSON.parse(dataBase);

const write = async (users) => {
  try {
    await fs.writeFile(dataBasePath, JSON.stringify(users));
  } catch (err) {
    console.error('Error:', err);
  }
}

const readAndWriteToDB = (userData, id) => {
  users.push({id, ...JSON.parse(userData.data)});
  write(users);
}

const getRandomAttackValue = () => {
  const values = ["miss", "killed", "shot"];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

export const returnObjectToClient = (data) => {
  const message = JSON.parse(data);
  console.log('message', message)

  if (message.type === 'reg') {
    const { type, ...userData} = message;
    const id = uuid;
    readAndWriteToDB({...userData}, id);
    const userName = JSON.parse(userData.data);
    const t = {
      name: userName.name,
      index: id,
      error: false,
      errorText: '',
    };
    const jsonString = {
      type: "reg",
      data: JSON.stringify(t),
      id: 0,
    };
    console.log('jsonString', jsonString)

    return JSON.stringify(jsonString);
  }

  if (message.type === 'create_room' || message.type === 'single_play') {
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

  if(message.type === 'add_ships') {
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

  if(message.type === 'attack') {
    countAttack += 1;
    if (countAttack < 20) {
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
    

    if (countAttack >= 20) {
      const winnerObj = JSON.stringify({
        type: "finish",
        data: JSON.stringify({
                winPlayer: users[0].id,
        }),
        id: 0,
      });
      return winnerObj;
    }
  }
}