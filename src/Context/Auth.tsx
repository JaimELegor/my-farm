
import { handleError } from "./ErrorHandler";
import axios from "axios";
import { UserProfileToken } from "./User";
import { AnimalData } from "./Animal";


const api = "http://localhost/my-farm-api/";
const adapter = axios.create({
  baseURL: api,
  headers: {
    Accept: 'application/json;charset=UTF-8',
  }
});

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await adapter.post<UserProfileToken>(api + "login", {
      username: username,
      password: password,
    }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};


export const registerAPI = async (email: string, username: string, password: string) => {
  try {
    const data = await adapter.post<UserProfileToken>(api + "register", {
      username: username,
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const editAPI = async (email: string, username: string, password: string) => {
  try {
    const data = await adapter.post<UserProfileToken>(api + "edit", {
      username: username,
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const foodAPI = async (
  especie: string,
  porcion_diaria: number,
  descripcion: string,
  cantidad: number
) => {
  try {
    const data = await adapter.post<AnimalData>(api + "alimento", {
      especie: especie,
      porcion_diaria: porcion_diaria,
      descripcion: descripcion,
      cantidad: cantidad
    },

      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
}

export const foodEditAPI = async (
  id_alimento: number,
  especie: string,
  porcion_diaria: number,
  descripcion: string,
  cantidad: number
) => {
  try {
    const data = await adapter.post<AnimalData>(api + "edit/alimento", {
      id_alimento: id_alimento,
      especie: especie,
      porcion_diaria: porcion_diaria,
      descripcion: descripcion,
      cantidad: cantidad
    },

      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
}

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
    const data = await adapter.post<AnimalData>(api + apiextra, {
      id_animal: id_animal,
      especie: especie,
      color: color,
      genero: genero,
      peso: peso,
      estado: estado,
      raza: raza,
      fecha_nacimiento: fecha_nacimiento,
      fecha_ingreso: fecha_ingreso,
    },

      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
}

export const treatmentAPI = async (
  id_animal: number,
  fecha_tratamiento: string,
  descripcion: string,
  fecha_final: string,
  edit: boolean
) => {
  try {
    const apiextra = edit ? "edit/tratamiento" : "tratamiento"
    const data = await adapter.post<AnimalData>(api + apiextra, {
      id_animal: id_animal,
      fecha_tratamiento: fecha_tratamiento,
      descripcion: descripcion,
      fecha_final: fecha_final
    },

      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
}
