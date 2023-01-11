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

const estados = ['Finalizada', 'Pendiente', 'En curso']

const tareas = [
  {
    id: 1,
    descripcion: 'Crear usuarios',
    worker_id: 5,
    captura: null,
    archivo: null,
    estado: 1,
  },
  {
    id: 2,
    descripcion: 'Blanquear contraseñas',
    worker_id: 1,
    captura: null,
    archivo: null,
    estado: 2,
  },
  {
    id: 3,
    descripcion: 'Arreglar montos de reporte',
    worker_id: 3,
    captura: null,
    archivo: null,
    estado: 0,
  },
  {
    id: 4,
    descripcion: 'Verificar error en la tabla T01I600 con el usuario fulanito',
    worker_id: 4,
    captura: null,
    archivo: null,
    estado: 2,
  },
]

const Tasks = () => {
  const [pasoSelect, setPasoSelect] = useState(0)
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

  const openEditor = (paso) => {
    setPasoSelect(paso)
    if (pasoSelect !== null) {
      setVisible(true)
      console.log(paso)
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
          <COffcanvasTitle>Crear Tarea</COffcanvasTitle>
          <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
        </COffcanvasHeader>
        <COffcanvasBody>
          <CForm>
            <CFormTextarea
              id="descripcion"
              label="Descripción"
              placeholder="Agregá una descripción de la tarea"
              rows={3}
            ></CFormTextarea>
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
                <div>
                  <input {...getInputProps()} />
                  <CCardTitle>Suelta aqui un archivo</CCardTitle>
                </div>
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
          <strong>Buscar Tarea</strong>
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
                <CInputGroupText id="inputGroupPrepend">Codigo:</CInputGroupText>
                <CFormInput
                  type="text"
                  id="codigo"
                  name="codigo"
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={handleChange}
                />
                <CFormFeedback invalid>Ingresar Codigo del Error</CFormFeedback>
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              {/* <CFormLabel htmlFor="validationCustomUsername"></CFormLabel> */}
              <CInputGroup className="has-validation">
                <CInputGroupText id="inputGroupPrepend">Asignada a:</CInputGroupText>
                <CFormSelect id="area" name="area" onChange={handleChange}>
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
                <CFormFeedback invalid>Ingresar Descripción</CFormFeedback>
              </CInputGroup>
            </CCol>

            <CCol xs={12} className="text-center">
              <CButton color="primary" type="submit">
                Actualizar
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
        <CTable hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Descripción</CTableHeaderCell>
              <CTableHeaderCell scope="col">Asignada a</CTableHeaderCell>
              <CTableHeaderCell scope="col">Archivo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Captura</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {tareas.map((item, key) => {
              return (
                <CTableRow key={key} onClick={() => openEditor(key)}>
                  <CTableHeaderCell scope="row">
                    <CIcon icon={cilLineSpacing} />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                  <CTableDataCell>{item.descripcion}</CTableDataCell>
                  <CTableDataCell>{workers[item.worker_id - 1].name}</CTableDataCell>
                  <CTableDataCell>{item.archivo}</CTableDataCell>
                  <CTableDataCell>{item.captura}</CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </CCard>
    </>
  )
}

export default Tasks
