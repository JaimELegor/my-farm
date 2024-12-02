
import React from 'react'
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { AnimalFormData } from './Context/Animal';
import { toast } from 'react-toastify';
import { animalAPI } from './Context/Auth';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const validation = Yup.object().shape({
  id_animal: Yup.number().required("El id del animal es requerido"),
  color: Yup.string().required("El color es requerido"),
  genero: Yup.string().required("El genero es requerido"),
  peso: Yup.number().required("El peso es requerido"),
  estado: Yup.string().required("El estado es requerido"),
  raza: Yup.string().required("La raza es requerida"),
  fecha_nacimiento: Yup.date().required("La fecha es requerida"),
  fecha_ingreso: Yup.date().required("La fecha es requerida"),
});


const addAnimal = async (
  id_animal: number,
  especie: string,
  color: string,
  genero: string,
  peso: number,
  estado: string,
  raza: string,
  fecha_nacimiento: Date,
  fecha_ingreso: Date,
  edit: boolean
) => {
  const ft_date_born = format(fecha_nacimiento, 'yyyy/MM/dd');
  const ft_date_reg = format(fecha_ingreso, 'yyyy/MM/dd');
  await animalAPI(id_animal,
    especie,
    color,
    genero,
    peso,
    estado,
    raza,
    ft_date_born,
    ft_date_reg,
    edit).then((res) => {
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

function AnimalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnimalFormData>({ resolver: yupResolver(validation) });

  const fetchBreed = async (specie: string) => {
    setLoading(true);
    const response = await fetch('https://api.purefarming.com/reference/breeds?species=' + specie);
    const data = await response.json();

    // Extract names from the response
    const namesArray = data.map((item: { name: string }) => item.name);
    setBreeds(namesArray);
    setLoading(false);
  };

  const [breeds, setBreeds] = useState<string[]>([]);
  const [species, setSpecies] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isStoredAnimal, setIsStoredAnimal] = useState<boolean>(false);
  const genderOptions = ['Macho', 'Hembra'];
  const speciesOptions = ['cattle', 'sheep', 'deer'];
  const statusOptions = ['VIVO', 'MUERTO', 'ENFERMO', 'VENDIDO'];
  const navigate = useNavigate();

  const handleChangeSpecies = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpecies = e.target.value;
    setSpecies(selectedSpecies);
  };

  const handleInput = (form: AnimalFormData) => {
    console.log("enviando...");
    console.log(isStoredAnimal);
    addAnimal(
      form.id_animal,
      species,
      form.color,
      form.genero,
      form.peso,
      form.estado,
      form.raza,
      form.fecha_nacimiento,
      form.fecha_ingreso,
      isStoredAnimal
    );
    reset();
    localStorage.removeItem("ANIMAL");
    navigate("/dashboard/animal/show");
  };

  var storedAnimal: string | null = null;
  var animalData: any = null;
  useEffect(() => {
    storedAnimal = localStorage.getItem("ANIMAL");
    if (storedAnimal) {
      setIsStoredAnimal(true);
      animalData = JSON.parse(storedAnimal);
      fetchBreed(animalData?.especie);
      // Reset form values based on the stored data
      reset({
        id_animal: animalData?.id_animal || '',
        color: animalData?.color || '',
        genero: animalData?.genero || '',
        peso: animalData?.peso || '',
        estado: animalData?.estado || '',
        raza: animalData?.raza || '',
        fecha_nacimiento: animalData?.fecha_nacimiento || '',
        fecha_ingreso: animalData?.fecha_ingreso || '',
      });
      setSpecies(animalData?.especie || ''); // Set species for breed fetching
    }
  }, [reset]);


  useEffect(() => {
    if (species) {
      fetchBreed(species); // Fetch breeds whenever species changes
    }
  }, [species]);

  return (
    <>
      <Header tabs={false} />
      <div className="form-container">
        <form onSubmit={handleSubmit(handleInput)} className="animal-form">
          <div className="form-grid">

            <div>
              <label htmlFor="id_animal">ID:</label>
              <input
                type="number"
                id="id_animal"
                required
                placeholder="Ingrese el id del animal"
                disabled={isStoredAnimal}
                {...register("id_animal")}
              />
            </div>
            {errors.color ? <p>{errors.color.message}</p> : ""}
            <div>
              <label htmlFor="color">Color:</label>
              <input
                type="text"
                id="color"
                required
                placeholder="Ingrese el color"
                {...register("color")}
              />
            </div>
            {errors.color ? <p>{errors.color.message}</p> : ""}
            <div>
              <label htmlFor="genero">Género:</label>
              <select
                id="genero"
                required
                {...register("genero")}
              >
                <option value="">Seleccione genero:</option>
                {genderOptions.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
            {errors.genero ? <p>{errors.genero.message}</p> : ""}
            <div>
              <label htmlFor="especie">Especie:</label>
              <select
                id="especie"
                required={!isStoredAnimal}
                value={species}
                onChange={handleChangeSpecies}
              >
                {/* If storedAnimal exists, show the stored specie */}
                {isStoredAnimal ? (
                  <option value=''>{species}</option>
                ) : (
                  speciesOptions.map((specie) => (
                    <option key={specie} value={specie}>
                      {specie}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div>
              <label htmlFor="peso">Peso (kg):</label>
              <input
                type="number"
                id="peso"
                required
                placeholder='Ingrese el peso'
                {...register("peso")}
              />
            </div>
            {errors.peso ? <p>{errors.peso.message}</p> : ""}
            <div>
              <label htmlFor="estado">Estado:</label>
              <select
                id="estado"
                required
                {...register("estado")}
              >
                <option value="">Seleccione estado:</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            {errors.estado ? <p>{errors.estado.message}</p> : ""}
            {breeds.length !== 0 && !loading ?
              <div>
                <label htmlFor="raza">Raza:</label>
                <select
                  id="raza"
                  required
                  {...register("raza")}
                >
                  <option value="">Seleccione la raza</option>
                  {breeds.map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </div>
              :
              <></>
            }
            <div>
              <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
              <input
                type="date"
                id="fecha_nacimiento"
                required
                placeholder='Ingrese la fecha de nacimiento'
                {...register("fecha_nacimiento")}
              />
            </div>
            {errors.fecha_nacimiento ? <p>{errors.fecha_nacimiento.message}</p> : ""}
            <div>
              <label htmlFor="fecha_ingreso">Fecha de Ingreso:</label>
              <input
                type="date"
                id="fecha_ingreso"
                required
                placeholder='Ingrese la fecha de ingreso'
                {...register("fecha_ingreso")}
              />
            </div>
            {errors.fecha_ingreso ? <p>{errors.fecha_ingreso.message}</p> : ""}
          </div>

          <div className="submit-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default AnimalForm;
