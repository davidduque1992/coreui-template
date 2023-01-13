import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormSelect,
  CButton,
  CForm,
  CFormTextarea,
  CCloseButton,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasBody,
  COffcanvasTitle,
  CFormFeedback,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CCardImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLineSpacing, cilPencil, cilXCircle } from '@coreui/icons'
import Dropzone, { useDropzone } from 'react-dropzone'

// const axiosConfig = {
//   headers: {
//     token: token,
//     'Content-Type': 'multipart/form-data',
//   },
// }

const workers = [
  {
    id: 1,
    name: 'Jose',
  },
  {
    id: 2,
    name: 'Cecilia',
  },
  {
    id: 3,
    name: 'Karen',
  },
  {
    id: 4,
    name: 'David',
  },
  {
    id: 5,
    name: 'Martin',
  },
]

const platforms = [
  {
    id: 1,
    name: 'Web',
    color: 'primary', //primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' |
  },
  {
    id: 2,
    name: 'Celulares',
    color: 'success',
  },
  {
    id: 3,
    name: 'Escritorio',
    color: 'danger',
  },
]

const estados = [
  {
    id: 0,
    value: 'Finalizada',
    color: 'success',
  },
  {
    id: 1,
    value: 'En curso',
    color: 'primary',
  },
  {
    id: 2,
    value: 'Pendiente',
    color: 'danger',
  },
]

const proyectos = [
  {
    id: 1,
    titulo: 'Formulario de inscripción vendimia + gestor',
    descripcion:
      'Formulario de inscripción para precandidatas a reina en la vendimia departamental y gestor para protocolo.',
    encargado_id: 2,
    equipo: [5, 2, 1],
    github_url: 'github.com/...',
    comentario: 'Algo',
    plataforma: 0,
    captura: null,
    archivo: null,
    estado: 0,
  },
  {
    id: 2,
    titulo: 'ChatBot',
    descripcion: 'Consulta de deudas desde el chatBot y formulario de generación de incidentes.',
    encargado_id: 4,
    equipo: [4, 2],
    github_url: 'github.com/...',
    comentario: 'Algo',
    plataforma: 0,
    captura: null,
    archivo: null,
    estado: 0,
  },
  {
    id: 3,
    titulo: 'Ciudad Universitaria Web',
    descripcion: 'Rediseño de pagina web de ciudad universitaria con React.',
    encargado_id: 5,
    equipo: [5, 2, 3],
    github_url: 'github.com/...',
    comentario: 'Algo',
    plataforma: 0,
    captura: null,
    archivo: null,
    estado: 1,
  },
  {
    id: 4,
    titulo: 'Ciudad Universitaria Movil',
    descripcion: 'Creación de App para celulares de ciudad universitaria con React Native.',
    encargado_id: 1,
    equipo: [4, 2, 1],
    github_url: 'github.com/...',
    comentario: 'Algo',
    plataforma: 1,
    captura: null,
    archivo: null,
    estado: 1,
  },
  {
    id: 5,
    titulo: 'MendoApp app movil',
    descripcion: 'Creación de app movil de Ciudad de Mendoza.',
    encargado_id: 2,
    equipo: [2, 4],
    github_url: 'github.com/...',
    comentario: 'Algo',
    plataforma: 1,
    captura: null,
    archivo: null,
    estado: 2,
  },
]

const Projects = () => {
  const [pasoSelect, setPasoSelect] = useState(0)
  const [pSelect, setPSelect] = useState(0)
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const formRef = useRef()
  const [formState, setFormState] = useState({
    codigo: '',
    descripcion: '',
    area: '',
    sistema: '',
  })
  const [src, setSrc] = useState()
  ////////////////////////////////////////////////////////////////////////////////////////mensaje del toast
  const exampleToast = (mensaje) => (
    <CToast>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill={mensaje.color}></rect>
        </svg>
        <strong className="me-auto">¡Notificacion de sistema!</strong>
        <small>Justo ahora</small>
      </CToastHeader>
      <CToastBody>{mensaje.mensaje}</CToastBody>
    </CToast>
  )
  //DropZone://////////////////////////////////
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const openEditor = (p_a_id) => {
    setPSelect(p_a_id)
    if (pSelect !== null) {
      setVisible(true)
      console.log(p_a_id)
    }
  }

  const handleOnPaste = (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items

    console.log('items: ', JSON.stringify(items))

    let blob = null
    if (items[0].type.indexOf('image') === 0) {
      blob = items[0].getAsFile()
    }

    if (blob !== null) {
      // axios
      //   .post(
      //     server + '/ingresarPasoPro_Err/agregarCapture',
      //     {
      //       p_e: pro_err.cod_int + pro_err.cod,
      //       num_paso: pasos[pasoSelect].paso,
      //       capture: blob,
      //       id_usuario: loginState.id,
      //     },
      //     axiosConfig,
      //   )
      //   .then((response) => {
      //     setPasos(response.data.pasos)
      //     console.log('pasos:  ' + response.data.pasos)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      const reader = new FileReader()
      reader.onload = function (event) {
        setSrc(event.target.result)
      }
      reader.readAsDataURL(blob)

      console.log({ src })
    }
  }

  return (
    <>
      <COffcanvas
        placement="end"
        style={{ width: '45%' }}
        visible={visible}
        onHide={() => setVisible(false)}
        onPaste={handleOnPaste}
      >
        <COffcanvasHeader>
          <COffcanvasTitle>{proyectos[pSelect].titulo}</COffcanvasTitle>
          <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
        </COffcanvasHeader>
        <COffcanvasBody>
          <CForm>
            {pSelect !== 0 && (
              <CFormTextarea
                id="descripcion"
                label="Descripción"
                defaultValue={
                  pSelect > 0
                    ? proyectos[pSelect].descripcion
                    : 'Agregá una descripción de la tarea'
                }
                //placeholder="Agregá una descripción de la tarea"
                rows={3}
              />
            )}
            {src !== null && <CCardImage src={src} style={{ width: '60%' }} />}

            <section>
              <CCard
                {...getRootProps({ className: 'dropzone' })}
                className="text-center"
                style={{
                  height: 200,
                  backgroundColor: '#fff',
                  borderWidth: 2,
                  borderColor: '#000',
                  borderStyle: 'dashed',
                  borderRadius: 20,
                  textAlign: 'center',
                }}
              >
                <input {...getInputProps()} />
                <CCardTitle>Suelta aqui un archivo</CCardTitle>
              </CCard>
              <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
              </aside>
            </section>
          </CForm>
        </COffcanvasBody>
      </COffcanvas>
      {/* <CButton onClick={() => addToast(exampleToast)}>Send a toast</CButton> */}
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCard>
        <CCardHeader className="text-center">
          <strong>Buscar Proyecto</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            //validated={AddErr}
            //onSubmit={handleSubmit}
            ref={formRef}
          >
            <CCol md={6}>
              {/* <CFormLabel htmlFor="validationCustomUsername"></CFormLabel> */}
              <CInputGroup className="has-validation">
                <CInputGroupText id="inputGroupPrepend">Nombre del proyecto:</CInputGroupText>
                <CFormInput
                  type="text"
                  id="nombreProyecto"
                  name="nombreProyecto"
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={handleChange}
                />
                <CFormFeedback invalid>Ingresa el nombre del proyecto</CFormFeedback>
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              {/* <CFormLabel htmlFor="validationCustomUsername"></CFormLabel> */}
              <CInputGroup className="has-validation">
                <CInputGroupText id="inputGroupPrepend">Encargado/a:</CInputGroupText>
                <CFormSelect id="encargado" name="encargado" onChange={handleChange}>
                  {/* <option value={pro_err.id_areas}>{areas.includes(pro_err.id_areas).nombreArea}</option> */}
                  {workers.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </CFormSelect>
              </CInputGroup>
            </CCol>
            <CCol md={12}>
              {/* <CFormLabel htmlFor="validationCustomUsername"></CFormLabel> */}
              <CInputGroup className="has-validation">
                <CInputGroupText id="inputGroupPrepend">Descripción:</CInputGroupText>
                <CFormInput
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={handleChange}
                />
                <CFormFeedback invalid>Ingresar descripción</CFormFeedback>
              </CInputGroup>
            </CCol>

            <CCol xs={12} className="text-center">
              <CButton color="primary" type="submit">
                Buscar
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
        <CTable hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Titulo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Estado</CTableHeaderCell>
              <CTableHeaderCell scope="col">Encargado/a</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {proyectos.map((item, key) => {
              return (
                <CTableRow
                  key={key}
                  onClick={() => openEditor(key)}
                  color={estados[item.estado].color}
                >
                  <CTableHeaderCell scope="row">
                    <CIcon icon={cilLineSpacing} />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                  <CTableDataCell>{item.titulo}</CTableDataCell>
                  <CTableDataCell>{estados[item.estado].value}</CTableDataCell>
                  <CTableDataCell>{workers[item.encargado_id - 1].name}</CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </CCard>
    </>
  )
}

export default Projects
