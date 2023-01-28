import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import { CButton } from '@coreui/react'

const ImageEditorComponent = ({ getImage }) => {
  const imgEditorRef = React.useRef(null)
  const [imagen, setImagen] = useState(null)
  let dataUrl = null

  const getEditedImage = () => {
    let instance = imgEditorRef.current.getInstance()
    dataUrl = instance.toDataURL()
    setImagen(dataUrl)
    getImage(dataUrl)
  }

  useEffect(() => {}, [imagen])

  return (
    <>
      <ImageEditor
        key={'img'}
        ref={imgEditorRef}
        includeUI={{
          loadImage: {
            path: '',
          },
          menu: ['shape', 'draw', 'text'],
          initMenu: 'draw',
          uiSize: {
            width: '1000px',
            height: '700px',
          },
          menuBarPosition: 'bottom',
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={false}
      />
      <CButton color="primary" onClick={getEditedImage}>
        Get Image
      </CButton>
      {imagen != null && <img src={imagen} />}
    </>
  )
}

ImageEditorComponent.propTypes = {
  getImage: PropTypes.string,
}

export default React.memo(ImageEditorComponent)

// class ImageEditorComponent extends React.Component {
//   imgEditorRef = React.createRef()
//   dataUrl = null

//   getEditedImage = () => {
//     let instance = this.imgEditorRef.current.getInstance()
//     this.dataUrl = instance.toDataURL()
//     console.log(this.dataUrl)
//   }

//   render() {
//     return (
//       <>
//         <ImageEditor
//           key={'img'}
//           ref={this.imgEditorRef}
//           includeUI={{
//             loadImage: {
//               path: '',
//             },
//             menu: ['shape', 'draw', 'text'],
//             initMenu: 'draw',
//             uiSize: {
//               width: '1000px',
//               height: '700px',
//             },
//             menuBarPosition: 'bottom',
//           }}
//           cssMaxHeight={500}
//           cssMaxWidth={700}
//           selectionStyle={{
//             cornerSize: 20,
//             rotatingPointOffset: 70,
//           }}
//           usageStatistics={false}
//         />
//         <CButton color="primary" onClick={this.getEditedImage}>
//           Get Image
//         </CButton>
//         {this.dataUrl != null && <img src={this.dataUrl} />}
//       </>
//     )
//   }
// }

// export default React.memo(ImageEditorComponent)
