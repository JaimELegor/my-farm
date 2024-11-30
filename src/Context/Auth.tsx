
import { handleError } from "./ErrorHandler";
import axios from "axios";
import { UserProfileToken } from "./User";
import { AnimalData } from "./Animal";


const api = "http://localhost/my-farm-api/";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (email: string, username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "register", {
      username: username,
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};


export const animalAPI = async (
  id_animal: number,
  especie: string,
  color: string,
  genero: string,
  peso: number,
  estado: string,
  raza: string,
  fecha_nacimiento: string,
  fecha_ingreso: string,
  edit: boolean
) => {
  try {
    const apiextra = edit ? "edit/animal" : "animal"
    const data = await axios.post<AnimalData>(api + apiextra, {
      id_animal: id_animal,
      especie: especie,
      color: color,
      genero: genero,
      peso: peso,
      estado: estado,
      raza: raza,
      fecha_nacimiento: fecha_nacimiento,
      fecha_ingreso: fecha_ingreso,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
}

