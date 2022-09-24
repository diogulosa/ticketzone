import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './store/auth';

import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Dashboard from './pages/Admin/Dashboard';
import CreateEvent from './pages/CreateEvent';
import Register from './pages/Register';
import Pricing from './pages/Pricing';

import 'material-icons/iconfont/material-icons.css';
import './index.css';
import WhyUs from './pages/WhyUs';
import EventList from './components/layout/Dashboard/EventList';
import ContactInfo from './components/layout/Dashboard/ContactInfo';
import PageNotFound from './pages/404';
import EditEvent from './components/layout/Dashboard/EditEvent/EditEvent';
import BasicInfoEdit from './components/layout/Dashboard/EditEvent/BasicInfoEdit';
import LocationEdit from './components/layout/Dashboard/EditEvent/LocationEdit';
import DateAndTimeEdit from './components/layout/Dashboard/EditEvent/DateAndTimeEdit';
import DetailsEdit from './components/layout/Dashboard/EditEvent/DetailsEdit'
import SingleEvent from './components/Events/SingleEvent';
import RegisterConfirm from './pages/RegisterConfirm';
import InsertCountry from './pages/InsertCountry'
import TicketsEdit from './components/layout/Dashboard/EditEvent/TicketsEdit';
import ResetPassword from './pages/ResetPassword';
import EntryScreen from './pages/EntryScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<EntryScreen/>} />
            <Route path="/home" element={<Home/>} />
            {/* <Route path="/log-in" element={<Login/>}/>
            <Route path="/register" element={<Register/>} /> */}
            <Route path="/reset-password/:id" element={<ResetPassword/>} />
            <Route path="/pricing" element={<Pricing/>} />
            <Route path="/events/create"  element={<CreateEvent/>} />
            <Route path="/event/:id" element={<EventDetails/>} />
            <Route path="/dashboard" element={<Dashboard />} >  
              <Route path='my-events' element={<EventList />} />
              <Route path='event/:id/edit' element={<EditEvent />}>
                <Route path='basic-info' element={<BasicInfoEdit />} />
                <Route path='location' element={<LocationEdit />} />
                <Route path='date-and-time' element={<DateAndTimeEdit />} />
                <Route path='tickets' element={<TicketsEdit />} />
                <Route path='details' element={<DetailsEdit />} />
              </Route>
              <Route path='event/:id/view' element={<EditEvent />}>
                <Route path='' element={<SingleEvent />}></Route>
              </Route>  
              <Route path='account/contact-info' element={<ContactInfo />} />
            </Route>
            <Route path='/why-us' element={<WhyUs />} />
            <Route path='/user-registration/verify/:userId' element={<RegisterConfirm />} />
            <Route path='insertCountry' element={<InsertCountry />}></Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
);


