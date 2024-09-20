import { Route, Routes, useLocation } from 'react-router-dom'
import NotFound from './pages/notFound/Index'
import { useEffect } from 'react'
import Layout from './pages/Layout'
import SignIn from './pages/signIn/SignIn'
import Dashboard from './pages/dashboard/Dashboard'
import CourseList from './pages/courses/course/CourseList'
import Categories from './pages/courses/catagories/Categories'
import Notifications from './pages/notifications/Notifications'
import AddCourse from './pages/courses/course/AddCourse'
import Instructors from './pages/instructors/Instructors'
import InstructorDetails from './pages/instructors/InstructorDetails'
import Students from './pages/students/Students'
import Enrolment from './pages/enrolment/Enrolment'
import Resourse from './pages/resourse/Resourse'
import Setting from './pages/settings/Setting'

function App() {


  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname]);
    return null;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/dashboard' element={<Layout />}>
          <Route path='' element={<Dashboard />} />
          <Route path='notifications' element={<Notifications />} />
          <Route path='courses' element={<CourseList />} />
          <Route path='courses/add' element={<AddCourse />} />
          <Route path='courses/categories' element={<Categories />} />
          <Route path='instructors' element={<Instructors />} />
          <Route path='instructors/:id' element={<InstructorDetails />} />
          <Route path='students' element={<Students />} />
          <Route path='enrolment' element={<Enrolment />} />
          <Route path='resourses' element={<Resourse />} />
          <Route path='setting' element={<Setting />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
