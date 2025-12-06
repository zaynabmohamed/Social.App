
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from "./Components/Layout/Layout"
import './App.css'
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import CounterContextProvider from './Components/Context/CounterContext';
import UserContextProvider from './Components/Context/UserContext';
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';
import PostContextProvider from './Components/Context/PostContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import PostDetails from './Components/PostDetails/PostDetails';
import  { Toaster } from 'react-hot-toast';
const Query = new QueryClient()

function App() {
  const router = createBrowserRouter([
    {path:"" , element:<Layout/> 
       , children:[
      {index:true , element: <Home/>},
      {path:"/profile" , element: <ProtectedRoute><Profile/></ProtectedRoute>},
      {path:"/postdetails/:id" , element: <ProtectedRoute><PostDetails/></ProtectedRoute>},
      {path: "/login" , element:<Login/>},
      {path:"/register" , element:<Register/>},
      {path:"*" , element:<NotFound/>},

    ]}
  ])
  return (
    <>
      <UserContextProvider>   
      <PostContextProvider>
      <CounterContextProvider>
        <QueryClientProvider client={Query}>
    <RouterProvider router={router}/>
    <Toaster/>
    <ReactQueryDevtools/>
        </QueryClientProvider>
    </CounterContextProvider>
    </PostContextProvider>
    </UserContextProvider>
    </>
  )
}

export default App
