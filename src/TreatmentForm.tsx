import React from 'react'
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { TreatmentFormData } from './Context/Treatment';
import { toast } from 'react-toastify';
import { treatmentAPI } from './Context/Auth';
import { add, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const validation = Yup.object().shape({
  id_animal: Yup.number().required("Se requiere el ID del animal"),
  fecha_tratamiento: Yup.date().required("Se requiere la fecha de inicio"),
  descripcion: Yup.string().required("Se requiere una descripcion"),
  fecha_final: Yup.date().required("Se requiere la fecha final")
});

const addTreatment = async (
  id_animal: number,
  fecha_tratamiento: Date,
  descripcion: string,
  fecha_final: Date,
  edit: boolean
) => {

  const ft_date_treatment = format(fecha_tratamiento, 'yyyy/MM/dd');
  const ft_date_end = format(fecha_final, 'yyyy/MM/dd');
  await treatmentAPI(
    id_animal,
    ft_date_treatment,
    descripcion,
    ft_date_end,
    edit)
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

function TreatmentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TreatmentFormData>({ resolver: yupResolver(validation) });

  const [isStoredTreatment, setIsStoredTreatment] = useState<boolean>(false);
  const [animals, setAnimals] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInput = (form: TreatmentFormData) => {
    addTreatment(form.id_animal, form.fecha_tratamiento, form.descripcion, form.fecha_final, isStoredTreatment);
    reset();
    localStorage.removeItem("TRATAMIENTO");
    navigate("/dashboard/tratamiento/show");
  };

  var storedTreatment: string | null = null;
  var treatmentData: any = null;

  const fetchAnimals = async () => {
    const api = "http://localhost/my-farm-api/db/ANIMAL";
    setLoading(true);
    const response = await fetch(api);
    const data = await response.json();
    console.log(data);

    // Extract names from the response
    const animalsArray = data.data.map((item: { id_animal: number }) => item.id_animal);
    setAnimals(animalsArray);
    setLoading(false);
  };

  useEffect(() => {
    storedTreatment = localStorage.getItem("TRATAMIENTO");
    if (storedTreatment) {
      setIsStoredTreatment(true);
      treatmentData = JSON.parse(storedTreatment);
      reset({
        id_animal: treatmentData?.id_animal || '',
        fecha_tratamiento: treatmentData?.fecha_tratamiento || '',
        descripcion: treatmentData?.descripcion || '',
        fecha_final: treatmentData?.fecha_final || ''
      });
    }
  }, [reset]);


  useEffect(() => {
    fetchAnimals(); // Fetch breeds whenever species changes
  }, []);

  return (
    <>
      <Header tabs={false} />
      <div className="form-container">
        <form onSubmit={handleSubmit(handleInput)} className="animal-form">
          <div className="form-grid">

            <div>
              <label htmlFor="id_animal">ID del animal:</label>
              <select
                id="id_animal"
                required={!isStoredTreatment}
                disabled={isStoredTreatment}
                {...register("id_animal")}
              >
                {
                  animals.map((id) => (
                    <option key={id} value={id}>
                      {id}
                    </option>
                  ))
                }
              </select>
            </div>
            {errors.id_animal ? <p>{errors.id_animal.message}</p> : ""}
            <div>
              <label htmlFor="fecha_tratamiento">Fecha de inicio:</label>
              <input
                type="date"
                id="fecha_tratamiento"
                required
                placeholder='Ingrese la fecha de inicio'
                {...register("fecha_tratamiento")}
              />
            </div>
            {errors.fecha_tratamiento ? <p>{errors.fecha_tratamiento.message}</p> : ""}
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
              <label htmlFor="fecha_final">Fecha final:</label>
              <input
                type="date"
                id="fecha_final"
                required
                placeholder='Ingrese la fecha final'
                {...register("fecha_final")}
              />
            </div>
            {errors.fecha_final ? <p>{errors.fecha_final.message}</p> : ""}
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

export default TreatmentForm;
