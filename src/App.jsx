import React, { useEffect, useState } from 'react'
import { RouterProvider} from 'react-router-dom'
import { routes } from './components/routes/Routes'

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/db.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (<>
  <h1>Data from db.json</h1>
  <pre>{JSON.stringify(data, null, 2)}</pre>
  <RouterProvider router={routes}></RouterProvider>
  </>
  )
}

export default App
