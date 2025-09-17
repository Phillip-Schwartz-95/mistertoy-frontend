import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { toyService } from '../services/toyService.js'
import { saveToy } from '../store/actions/toy.actions.js'   // ✅ fixed import
import { useOnlineStatus } from '../custom-hooks/useOnlineStatus.js'
import { useExitWhileUnsavedChanges } from '../custom-hooks/useExitWhileUnsavedChanges.js'
import { useTranslation } from 'react-i18next'

export default function ToyEdit() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(toyService.getEmptyToy())
  const [isDirty, setIsDirty] = useState(false)
  const navigate = useNavigate()
  const isOnline = useOnlineStatus()
  const { t } = useTranslation()

  useExitWhileUnsavedChanges(isDirty)

  // Load toy if editing
  useEffect(() => {
    const loadToy = async () => {
      if (toyId) {
        try {
          const toy = await toyService.getById(toyId)
          setToy(toy)
        } catch (err) {
          console.error('Cannot load toy', err)
        }
      }
    }
    loadToy()
  }, [toyId])

  const ToySchema = Yup.object().shape({
    name: Yup.string()
      .required(t('errors.nameRequired'))
      .min(2, t('errors.nameTooShort'))
      .max(50, t('errors.nameTooLong')),
    price: Yup.number()
      .required(t('errors.priceRequired'))
      .min(1, t('errors.priceMin')),
  })

  // Save handler
  async function onSaveToy(values) {
    if (!isOnline) {
      alert(t('errors.offline'))
      return
    }

    try {
      await saveToy(values)   // ✅ dispatches ADD_TOY or UPDATE_TOY internally
      setIsDirty(false)
      navigate('/toy')
    } catch (err) {
      console.error('Cannot save toy', err)
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={toy}
      validationSchema={ToySchema}
      onSubmit={onSaveToy}
    >
      {({ errors, touched, handleChange, values }) => (
        <Form>
          {!isOnline && (
            <p style={{ color: 'red' }}>
              Offline: changes cannot be saved
            </p>
          )}

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
            {errors.name && touched.name && (
              <div style={{ color: 'red' }}>{errors.name}</div>
            )}
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
            {errors.price && touched.price && (
              <div style={{ color: 'red' }}>{errors.price}</div>
            )}
          </div>

          <button type="submit" disabled={!isOnline}>Save</button>
        </Form>
      )}
    </Formik>
  )
}