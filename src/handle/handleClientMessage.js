import {reg} from '../actions/reg.js';
import {createGame} from '../actions/createGame.js';
import {addShips} from '../actions/addShips.js';
import {attack} from '../actions/attack.js';
import path from 'path';
import fs from 'node:fs';

let countAttack = 0;
const dataBasePath = path.join('./src/database/database.json');
const dataBase = fs.readFileSync('./src/database/database.json', 'utf-8');
const users = JSON.parse(dataBase);

export const returnObjectToClient = (data) => {
  const message = JSON.parse(data);

  if (message.type === 'reg') {
    return reg(dataBasePath, users, message);
  }

  if (message.type === 'create_room' || message.type === 'single_play') {
    return createGame(users);
  }

  if(message.type === 'add_ships') {
    return addShips(message);
  }

  if(message.type === 'attack') {
    countAttack += 1;
    return attack(users, message, countAttack);
  }
}