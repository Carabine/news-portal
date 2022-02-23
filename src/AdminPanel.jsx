import './App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Formik, Form, Field} from 'formik'
import { useEffect, useState } from 'react';
import axios from 'axios'

const AdminPanel = () => {
  const [news, setNews] = useState([])

  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/api/news")
    setNews(res.data)
  }, [])


  return (
    <>
      <h2>Admin Panel</h2>
      <button className="add-news-btn" onClick={async () => {
        const res = await axios.post("http://localhost:5000/api/admin/news", {title: "", body: ""})

        setNews([res.data, ...news])
      }}>Добавить новость</button>
      {
        news.map((n) => (
            <Formik
              key={n._id}
              initialValues={{ title: n.title, body: n.body }}
              onSubmit={async (values) => {
                  await axios.put("http://localhost:5000/api/admin/news", {id: n._id, title: values.title, body: values.body})
              }}
              >
              {({setFieldValue}) => (
                <div className='news-block'>
                  <Form>
                    <h5>Title</h5>
                    <Field type="text" name="title">
                      {
                        ({field}) => {
                          return <CKEditor
                            editor={ ClassicEditor }
                            data={field.value}
                            onChange={ ( event, editor ) => {
                                setFieldValue(field.name, editor.getData())
                            } }
                          />
                        }
                      }
                    </Field>
                    <h5>Body</h5>
                    <Field type="text" name="body">
                      {
                        ({field}) => {
                          return <CKEditor
                            editor={ ClassicEditor }
                            data={field.value}
                            onChange={ ( event, editor ) => {
                                setFieldValue(field.name, editor.getData())
                            } }
                          />
                        }
                      }
                    </Field>
                    <button className='save-btn' type="submit">
                      Сохранить
                    </button>
                    <button className='delete-btn' onClick={async () => {
                      await axios.delete("http://localhost:5000/api/admin/news", {params: {id: n._id}})
                      setNews(news.filter(newsElement => newsElement._id !== n._id))
                    }}>
                      Удалить
                    </button>
                  </Form>
                </div>
              )}
            </Formik>
        ))
      }

      
    </>
);
}

export default AdminPanel;
