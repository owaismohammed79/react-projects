import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import  { store }  from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)//So you can see that here too just like we gave contextProvide and values were passed to it when using context API, the similar thing happens here where we have a attribute called store that we need to pass and even the name of our store is store only
