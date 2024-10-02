import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import NotFound from './pages/notFound/Index'
import { useEffect } from 'react'
import Layout from './pages/Layout'
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Course from './pages/courses/course/Course'
import Categories from './pages/courses/catagories/Categories'
import Notifications from './pages/notifications/Notifications'
import AddCourse from './pages/courses/course/AddCourse'
import Instructors from './pages/instructors/Instructors'
import InstructorDetails from './pages/instructors/InstructorDetails'
import Students from './pages/students/Students'
import Enrolment from './pages/enrolment/Enrolment'
import Resourse from './pages/resourse/Resourse'
import Setting from './pages/settings/Setting'
import Blogs from './pages/blogs/Blogs'
import Faq from './pages/faq/Faq'
import { Box } from '@mui/material'
import { useAuth } from './context/AuthProvider'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]);
  return null;
}


function App() {

  const { token } = useAuth()

  return (
    <Box
      sx={{ overflowX: 'hidden' }}
    >
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Navigate to={token ? '/dashboard' : '/login'} />} />
        <Route path='/login' element={token ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path='/dashboard' element={token ? <Layout /> : <Login />}>
          <Route path='' element={<Dashboard />} />
          <Route path='notifications' element={<Notifications />} />
          <Route path='courses' element={<Course />} />
          <Route path='courses/add' element={<AddCourse />} />
          <Route path='courses/categories' element={<Categories />} />
          <Route path='instructors' element={<Instructors />} />
          <Route path='instructors/:id' element={<InstructorDetails />} />
          <Route path='students' element={<Students />} />
          <Route path='enrolment' element={<Enrolment />} />
          <Route path='resourses' element={<Resourse />} />
          <Route path='blogs' element={<Blogs />} />
          <Route path='faq' element={<Faq />} />
          <Route path='setting' element={<Setting />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Box>
  )
}

export default App
