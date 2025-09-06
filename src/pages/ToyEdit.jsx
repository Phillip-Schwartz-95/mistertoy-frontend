import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { toyService } from '../services/toyService.js'
import { addToy, updateToy } from '../store/actions/toy.actions.js'
import { useOnlineStatus } from '../custom-hooks/useOnlineStatus.js'
import { useExitWhileUnsavedChanges } from '../custom-hooks/useExitWhileUnsavedChanges.js'

export default function ToyEdit() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(toyService.getEmptyToy())
  const [isDirty, setIsDirty] = useState(false)
  const navigate = useNavigate()
  const isOnline = useOnlineStatus()

  // Warn if leaving with unsaved changes
  useExitWhileUnsavedChanges(isDirty)

  // Load toy if editing
  useEffect(() => {
    if (toyId) {
      toyService.getById(toyId)
        .then(setToy)
        .catch(err => console.log('Cannot load toy', err))
    }
  }, [toyId])

  // Yup validation schema
  const ToySchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Too short!')
      .max(50, 'Too long!'),
    price: Yup.number()
      .required('Price is required')
      .min(1, 'Price must be at least 1'),
  })

  // Save handler
  function onSaveToy(values) {
    if (!isOnline) {
      alert('You are offline! Cannot save changes.')
      return
    }

    toyService.save(values)
      .then(savedToy => {
        toy._id ? updateToy(savedToy) : addToy(savedToy)
        setIsDirty(false)
        navigate('/toy')
      })
      .catch(err => console.log('Cannot save toy', err))
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={toy}
        validationSchema={ToySchema}
        onSubmit={onSaveToy}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            {!isOnline && <p style={{ color: 'red' }}>Offline: changes cannot be saved</p>}

            <div>
              <Field
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={e => {
                  handleChange(e)
                  setIsDirty(true)
                }}
              />
              {errors.name && touched.name && <div style={{ color: 'red' }}>{errors.name}</div>}
            </div>

            <div>
              <Field
                name="price"
                type="number"
                placeholder="Price"
                value={values.price}
                onChange={e => {
                  handleChange(e)
                  setIsDirty(true)
                }}
              />
              {errors.price && touched.price && <div style={{ color: 'red' }}>{errors.price}</div>}
            </div>

            <button type="submit" disabled={!isOnline}>Save</button>
          </Form>
        )}
      </Formik>
    </>
  )
}

