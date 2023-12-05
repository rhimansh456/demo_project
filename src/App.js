import { Suspense, useState } from 'react';
import './App.css';
// import Home from './components/Home';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Create from './components/Create';
// import Read from './components/Read';
// import Update from './components/Update';
// import Login from './components/Login';
// import SignupForm from './components/SignUp';
// import isAuthenticated from './components/authMiddleware';
// import LeftSidebar from './components/LeftSidebar';
import PageRoutes from './components/page/PageRoutes';
import i18n from './i18n';
import LocaleContext from './LocaleContext';
import LanguageSelector from './components/LanguageSelector';
// const ProtectedRoute = ({ element }) => {
//   return isAuthenticated() ? element : <Navigate to='/' />;
// };

function App() {

  const [locale, setLocale] = useState(i18n.language);

  i18n.on('languageChanged', (lng) => setLocale(i18n.language));

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  }

  function Loading() {
    return (
      <>
        Loading.....
      </>
    )
  }

  const dirAttribute = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dirAttribute} className="App">



      <LocaleContext.Provider value={{ locale, setLocale }}>
        <Suspense fallback={<Loading />}>
          <LanguageSelector onChange={(e) => handleChange(e)} />
          <PageRoutes />
        </Suspense>
      </LocaleContext.Provider>

      {/* <LeftSidebar /> */}

      {/* <Router> */}
      {/* <Routes>

        <Route path='/' element={<Login />} />

        <Route path='/register' element={<SignupForm />} />


        <Route path='/leftsidebar'
          element={<ProtectedRoute element={<LeftSidebar />} />}
        />

        <Route path='/home'
          element={<ProtectedRoute element={<Home />} />}
        />

        <Route path='/create'
          element={<ProtectedRoute element={<Create />} />}
        />

        <Route path='/read/:id'
          element={<ProtectedRoute element={<Read />} />}
        />

        <Route path='/edit/:id'
          element={<ProtectedRoute element={<Update />} />}
        />


      </Routes> */}
      {/* </Router> */}
    </div>
  );
}

export default App;
