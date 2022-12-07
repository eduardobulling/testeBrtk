import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

import api from '../src/providers/api'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

function GoodForm() {


  const [cursos, setCursos] = useState<TCurso[]>([])

  type TCurso = {
    id: number,
    nome: string,
    descricao: string,
    vagas: number,
    modelo: string
  }

  useEffect(() => {
    getCurso();
  },);



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();



  function getCurso() {

    try {
      api.get('/listarCurso').then((response: any) => { setCursos(response.data) })

      console.log(cursos)
    } catch (error) {
      alert(error)
    }

  }


  const onSubmit = async (data: any) => {

    try {
      const response = await api.post('createCurso', data);

      alert(JSON.stringify('Curso Cadastrado'));

    } catch (error) {

      alert(JSON.stringify(error));
    }


  };

  const columns = [{
    dataField: 'id',
    text: 'Product ID'
  }, {
    dataField: 'nome',
    text: 'Product Name'
  },];

  return (
    <div className="app-container">


      <div className="form-group">
        <label>Nome do Curso</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Nome do Curso"
          {...register("nome", { required: true })}
        />
        {errors?.nome?.type === "required" && (
          <p className="error-message">Name is required.</p>
        )}
      </div>

      <div className="form-group">
        <label>Descrição do Curso</label>
        <input
          className={errors?.descricao && "input-error"}
          type="text"
          placeholder="Descrição do curso"
          {...register("descricao", { required: true })}
        />
        {errors?.descricao?.type === "required" && (
          <p className="error-message">Name is required.</p>
        )}
      </div>

      <div className="form-group">
        <label>Vagas</label>
        <input
          className={errors?.vagas && "input-error"}
          type="number"
          placeholder="Descrição do curso"
          {...register("vagas", { required: true })}
        />
        {errors?.vagas?.type === "required" && (
          <p className="error-message">Name is required.</p>
        )}
      </div>



      <div className="form-group">

        <label>Modelo</label>

        <select {...register("modelo")}>
          <option value="default">...</option>
          <option value="online">online</option>
          <option value="presencial">presencial</option>
        </select>

      </div>

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Criar conta</button>
      </div>

      <BootstrapTable keyField='id' data={cursos} columns={columns} pagination={paginationFactory()} />
    </div>
  );
};

export default GoodForm;