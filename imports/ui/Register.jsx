import React from 'react'
import { useForm } from 'react-hook-form'

import { UserCollection } from '../api/newUsers.js'
import { validateRut, cleanRut } from 'rutlib';

import { regiones } from '../../data/comunas-regiones.json'
const Register = () => {
  const ExpresionNumber = new RegExp('^[0-9]+$', 'i');
  const { register, watch, handleSubmit, reset, setError, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      rut: '',
      lasNameFather: '',
      lasNameMother: '',
      codePostal: '',
      comuna: '',
      region: '',
    }
  });
  const listenRegion = watch('region')
  const foundComuna = regiones.find(element => element.region === listenRegion)
  const onSubmit = (data) => {
    const { name, rut, lasNameFather, lasNameMother, codePostal, comuna, region } = data;
    const rutClean = cleanRut(rut)
    const foundRut = UserCollection.findOne({ rut: rutClean })




    if (foundRut) {
      return alert('RUT ya registrado')
    }
    const valrut = validateRut(rut)
    if (valrut === false) {
      return alert('RUT invalido')
    } if (!ExpresionNumber.test(codePostal)) {
      return alert('Solo Numeros Codigo Postal')
    } else {
      UserCollection.insert({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        rut: rutClean.trim(),
        lasNameFather: lasNameFather.charAt(0).toUpperCase() + lasNameFather.slice(1),
        lasNameMother: lasNameMother.charAt(0).toUpperCase() + lasNameMother.slice(1),
        codePostal: codePostal.trim(),
        comuna: comuna,
        region: region,
        createdAt: new Date().toLocaleDateString(),
      });
      alert('Paciente creado exitosamente')
    }

    reset({
      name: '',
      rut: '',
      lasNameFather: '',
      lasNameMother: '',
      codePostal: '',
      comuna: '',
      region: '',

    });
  }


  return (
    <div
      className='flex flex-col  bg-slate-300 p-2 rounded-lg'>
      <h2 className='text-2xl font-semibold uppercase p-2'
      >Registro de usuario</h2>
      <form
        className='flex flex-col '
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}>

        <div className='grid grid-cols-4 gap-4 justify-items-center p-2'>
          <div
            className='flex flex-col '>
            <span className='font-semibold '
            >{`Nombre:`}</span>
            <input
              className={errors.name ? 'shadow appearance-none border border-red-600 rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' :
                'shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
              {...register('name', { required: true })}
              placeholder='Name'
              type="text"
            />
            {errors.name && <p className='px-1  text-red-600 text-sm'>{'Nombre es requerido'}</p>}
          </div>


          <div
            className='flex flex-col '>
            <span className='font-semibold'
            >{`RUT:`}</span>
            <input
              className={errors.rut ? 'shadow appearance-none border border-red-600 rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' :
                'shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
              {...register('rut', { required: true, type: Number })}
              placeholder='30.686.957-4'
              type="text" />
            {errors.rut && <p className='px-1  text-red-600 text-sm'>{'Rut es requerido'}</p>}
          </div>


          <div
            className='flex flex-col'>
            <span className='font-semibold'
            >{`Apellido Paterno`}</span>
            <input
              className={errors.lasNameFather ? 'shadow appearance-none border border-red-600 rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' :
                'shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
              {...register('lasNameFather', { required: true })}
              placeholder={`Apellido Paterno`}
              type="text" />
            {errors.lasNameFather && <p className='px-1  text-red-600 text-sm'>{'Apellido Paterno es requerido'}</p>}
          </div>

          <div
            className='flex flex-col'>
            <span className='font-semibold'
            >{`Apellido Materno`}</span>
            <input
              className={errors.lasNameMother ? 'shadow appearance-none border border-red-600 rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' :
                'shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
              {...register('lasNameMother', { required: true })}
              placeholder={`Apellido Materno`}
              type="text" />
            {errors.lasNameMother && <p className='px-1  text-red-600 text-sm'>{'Apellido Materno es requerido'}</p>}
          </div>

          <div
            className='flex flex-col'>
            <span className='font-semibold'>{`Codigo Postal:`}</span>
            <input
              className={errors.codePostal ? 'shadow appearance-none border border-red-600 rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' :
                'shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
              {...register('codePostal', { required: true, type: "number" })}
              placeholder={`2820000`}
              type='text'
            />

            {errors.codePostal && <p className='px-1  text-red-600 text-sm'>{'Codigo Postal es requerido'}</p>}
          </div>

          <div
            className='flex flex-col '>
            <span className='font-semibold'>{`Región:`}</span>
            <select {...register('region', { required: true })}
              className={errors.region ? 'shadow border border-red-600 rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' :
                'shadow  border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}>
              <option disabled>Región</option>
              {regiones && regiones.map((element, index) =>
                <option key={index} value={element.region} >{element.region}</option>
              )}
            </select>
            {errors.region && <p className='px-1  text-red-600 text-sm'>{'Region es requerido'}</p>}
          </div>
          <div
            className='flex flex-col '>
            <span className='font-semibold'
            >{`Comuna:`}</span>
            <select {...register('comuna', { required: true })}
              className={errors.comuna ? 'shadow  border border-red-600 rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' :
                'shadow  border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}>
              <option disabled>Comuna</option>
              {foundComuna && foundComuna.comunas.map((element, index) =>
                <option key={index} value={element} >{element}</option>)}
            </select>
            {errors.comuna && <p className='px-1  text-red-600 text-sm'>{'Comuna es requerido'}</p>}
          </div>

        </div>





        <button className='m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          type="submit">Registrar</button>
      </form >

    </div >
  )
}

export default Register