import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs';

const uuid = uuidv4();

const write = async (dataBasePath, users) => {
  try {
    await fs.writeFile(dataBasePath, JSON.stringify(users));
  } catch (err) {
    console.error('Error:', err);
  }
}

const readAndWriteToDB = (userData, id, dataBasePath, users) => {
  users.push({id, ...JSON.parse(userData.data)});
  write(dataBasePath, users);
}

export const reg = (dataBasePath, users, message) => {
  const { type, ...userData} = message;
    const id = uuid;
    readAndWriteToDB({...userData}, id, dataBasePath, users);
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

    return JSON.stringify(jsonString);
}