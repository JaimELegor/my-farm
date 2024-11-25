import React from 'react'
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';

interface AnimalFormData {
  color: string;
  genero: string;
  especie: string;
  peso: number;
  estado: string;
  edad: number;
  raza: string;
  nombre: string;
  fecha_nacimiento: string;
  fecha_ingreso: string;
}

interface Animal {
  raza: string[];
}

function Form() {
  const [formData, setFormData] = useState<AnimalFormData>({
    color: '',
    genero: '',
    especie: '',
    peso: 0,
    estado: '',
    edad: 0,
    raza: '',
    nombre: '',
    fecha_nacimiento: '',
    fecha_ingreso: '',
  });

  const razas: { [raza: string]: Animal; } = {
    'Vaca': { raza: ['Holstein', 'Angus', 'Charolais'] },
    'Cerdo': { raza: ['Landrace', 'Yorkshire', 'Duroc', 'Berkshire'] },
    'Borrego': { raza: ['Merino', 'Suffolk', 'Dorset', 'Texel'] },
    'Chivo': { raza: ['Merino', 'Suffolk', 'Dorset', 'Texel'] },
    'Perro': { raza: ['Merino', 'Suffolk', 'Dorset', 'Texel'] },
    'Caballo': { raza: ['Merino', 'Suffolk', 'Dorset', 'Texel'] },
    'Burro': { raza: ['Merino', 'Suffolk', 'Dorset', 'Texel'] }
  }
  const genderOptions = ['Macho', 'Hembra'];
  const speciesOptions = ['Vaca', 'Cerdo', 'Borrego', 'Chivo', 'Perro', 'Caballo', 'Burro'];
  if (formData.especie) {
    const breedList = razas[formData.especie];
  }
  const breedList = razas['Vaca'];
  return (
    <>
      <Header tabs={false} />
      <div className="form-container">
        <form /*onSubmit={handleSubmit}*/ className="animal-form">
          <div className="form-grid">

            <div>
              <label htmlFor="color">Color:</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                //onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="genero">Género:</label>
              <select
                id="genero"
                name="genero"
                value={formData.genero}
                //onChange={handleSelectChange}
                required
              >
                <option value="">Seleccione genero:</option>
                {genderOptions.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="especie">Especie:</label>
              <select
                id="especie"
                name="especie"
                value={formData.especie}
                // onChange={handleSelectChange}
                required
              >
                <option value="">Select Species</option>
                {speciesOptions.map((species) => (
                  <option key={species} value={species}>
                    {species}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="peso">Peso (kg):</label>
              <input
                type="number"
                id="peso"
                name="peso"
                value={formData.peso}
                //onChange={handleNumberChange}
                required
              />
            </div>

            <div>
              <label htmlFor="estado">Estado:</label>
              <input
                type="text"
                id="estado"
                name="estado"
                value={formData.estado}
                //onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="edad">Edad:</label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={formData.edad}
                //onChange={handleNumberChange}
                required
              />
            </div>

            <div>
              <label htmlFor="raza">Raza:</label>
              <select
                id="raza"
                name="raza"
                value={formData.raza}
                //onChange={handleSelectChange}
                required
                disabled={formData.especie === ''}
              >
                <option value="">Select Breed</option>
                {breedList.raza.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                //onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
              <input
                type="date"
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                //onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="fecha_ingreso">Fecha de Ingreso:</label>
              <input
                type="date"
                id="fecha_ingreso"
                name="fecha_ingreso"
                value={formData.fecha_ingreso}
                //onChange={handleInputChange}
                required
              />
            </div>
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

export default Form
