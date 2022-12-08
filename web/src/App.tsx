import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';


import "./App.css";

import api from '../src/providers/api'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
    dataField: 'nome',
    text: 'Nome do Curso'
  },
  {
    dataField: 'descricao',
    text: 'Descrição do Curso'
  },
  {
    dataField: 'vagas',
    text: 'Vagas do Curso'
  },
  {
    dataField: 'modelo',
    text: 'Modelo do Curso'
  },];





  return (

    <Container>
      <Row>
        <Col sm={8}>



          <div className="form-group">
            <label>Nome do Curso</label>
            <input
              className={errors?.name && "input-error"}
              type="text"
              placeholder="Nome do Curso"
              {...register("nome", { required: true })}
            />
            {errors?.nome?.type === "required" && (
              <p className="error-message">Nome é obrigatorio.</p>
            )}

          </div>

          <div className="form-group">

            <label>Descrição do Curso</label>
            <input
              className={errors?.descricao && "input-error"}
              type="text"
              placeholder="Descrição do curso"
              {...register("descricao")}
            />

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
              <p className="error-message">Informe o numero de vagas.</p>
            )}
          </div>



          <div className="form-group">
            <label>Modelo</label>
            <select {...register("modelo", { required: true })}>
              <option value="default">...</option>
              <option value="online">online</option>
              <option value="presencial">presencial</option>
            </select>
            {errors?.modelo?.type === "required" && (
              <p className="error-message">Informe o numero de vagas.</p>
            )}

          </div>

          <div className="form-group">
            <button onClick={() => handleSubmit(onSubmit)()}>Criar Curso</button>
          </div>


        </Col>
      </Row>

      <Row>
        <Col sm={8}>


          <div className="form-group">

            <BootstrapTable keyField='id' data={cursos} columns={columns} pagination={paginationFactory({})} />
          </div>

        </Col>
      </Row>

    </Container>





  );
};

export default GoodForm;