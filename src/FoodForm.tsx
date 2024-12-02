

import React from 'react'
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { FoodFormData } from './Context/Food';
import { toast } from 'react-toastify';
import { foodAPI, foodEditAPI } from './Context/Auth';
import { useNavigate } from 'react-router-dom';

const validation = Yup.object().shape({
  especie: Yup.string().required("Se requiere la especie"),
  porcion_diaria: Yup.number().required("Se requiere la frecuencia"),
  descripcion: Yup.string().required("Se requiere una descripcion"),
  cantidad: Yup.number().required("Se requiere la cantidad")
});


const editFood = async (
  id_alimento: number,
  especie: string,
  porcion_diaria: number,
  descripcion: string,
  cantidad: number
) => {
  await foodEditAPI(
    id_alimento,
    especie,
    porcion_diaria,
    descripcion,
    cantidad)
    .then((res) => {
      if (res) {
        console.log(res);
        toast.success("Datos ingresados correctamente");
      } else {
        toast.error("Datos no pudieron registrarse :(");
      }
    }).catch((e) => {
      console.log("error");
      toast.warning("Error del servidor");
    });
};

const addFood = async (
  especie: string,
  porcion_diaria: number,
  descripcion: string,
  cantidad: number
) => {
  await foodAPI(
    especie,
    porcion_diaria,
    descripcion,
    cantidad)
    .then((res) => {
      if (res) {
        console.log(res);
        toast.success("Datos ingresados correctamente");
      } else {
        toast.error("Datos no pudieron registrarse :(");
      }
    }).catch((e) => {
      console.log("error");
      toast.warning("Error del servidor");
    });
};

function FoodForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FoodFormData>({ resolver: yupResolver(validation) });

  const [isStoredFood, setIsStoredFood] = useState<boolean>(false);
  const [idFood, setIDFood] = useState<number>(0);
  const speciesOptions = ['cattle', 'sheep', 'deer'];

  const handleInput = (form: FoodFormData) => {
    isStoredFood ?
      editFood(
        idFood,
        form.especie,
        form.porcion_diaria,
        form.descripcion,
        form.cantidad
      )
      :
      addFood(
        form.especie,
        form.porcion_diaria,
        form.descripcion,
        form.cantidad

      );
    reset();
    localStorage.removeItem("ALIMENTO");
    navigate("/dashboard/alimento/show");
  };

  var storedFood: string | null = null;
  var foodData: any = null;
  useEffect(() => {
    storedFood = localStorage.getItem("ALIMENTO");
    if (storedFood) {
      setIsStoredFood(true);
      foodData = JSON.parse(storedFood);
      setIDFood(foodData?.id_alimento);
      reset({
        especie: foodData?.especie || '',
        porcion_diaria: foodData?.porcion_diaria || '',
        descripcion: foodData?.descripcion || '',
        cantidad: foodData?.cantidad || ''
      });
    }
  }, [reset]);

  return (
    <>
      <Header tabs={false} />
      <div className="form-container">
        <form onSubmit={handleSubmit(handleInput)} className="animal-form">
          <div className="form-grid">

            <div>
              <label htmlFor="especie">Especie:</label>
              <select
                id="especie"
                required={!isStoredFood}
                {...register("especie")}
              >
                {
                  speciesOptions.map((specie) => (
                    <option key={specie} value={specie}>
                      {specie}
                    </option>
                  ))
                }
              </select>
            </div>
            <div>
              <label htmlFor="porcion_diaria">Porcion diaria (kg):</label>
              <input
                type="number"
                id="peso"
                required
                placeholder='Ingrese la porcion diaria'
                {...register("porcion_diaria")}
              />
            </div>
            {errors.porcion_diaria ? <p>{errors.porcion_diaria.message}</p> : ""}
            <div>
              <label htmlFor="descripcion">Descripcion: </label>
              <input
                type="text"
                id="estado"
                required
                placeholder='Ingrese la descripcion'
                {...register("descripcion")}
              />
            </div>
            {errors.descripcion ? <p>{errors.descripcion.message}</p> : ""}
            <div>
              <label htmlFor="cantidad">Cantidad:</label>
              <input
                type="number"
                id="cantidad"
                required
                placeholder='Ingrese la cantidad'
                {...register("cantidad")}
              />
            </div>
            {errors.cantidad ? <p>{errors.cantidad.message}</p> : ""}
            <div className="submit-container">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default FoodForm;
