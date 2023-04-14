import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, DashboardPage, PageNotFound, GamePage } from './components/pages';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/home' element={<DashboardPage />}/>
                <Route path='/register'>
                    <Route path='supervisor' element={<DashboardPage />} />
                    <Route path='therapist' element={<DashboardPage />} />
                    <Route path='patient' element={<DashboardPage />} />
                </Route>
                <Route path='/show'>
                    <Route path='supervisor' element={<DashboardPage />} />
                    <Route path='therapist' element={<DashboardPage />} />
                    <Route path='patient' element={<DashboardPage />} />
                </Route>
                <Route path='/edit-user'>
                    <Route path='supervisor/:id' element={<DashboardPage />} />
                    <Route path='therapist/:id' element={<DashboardPage />} />
                    <Route path='patient/:id' element={<DashboardPage />} />
                </Route>
                <Route path='/show-user'>
                    <Route path='supervisor/:id' element={<DashboardPage />} />
                    <Route path='therapist/:id' element={<DashboardPage />} />
                    <Route path='patient/:id' element={<DashboardPage />} />
                </Route>
                <Route path='create-test' element={<DashboardPage />}/>
                <Route path='show-tests' element={<DashboardPage />}/>
                <Route path='show-test/:id' element={<DashboardPage />}/>
                <Route path='add-question/:idQuestion/:idTest' element={<DashboardPage />}/>
                <Route path='add-therapy' element={<DashboardPage />}/>
                <Route path='schedule-therapies' element={<DashboardPage />}/>
                <Route path='therapy/:idTherapy/test/:idTest/question/:currentQuestion' element={<GamePage />}/>

                <Route path='/results' element={<DashboardPage />}/>
                <Route path='/show-profile' element={<DashboardPage />}/>
                <Route path='/edit-profile' element={<DashboardPage />}/>

                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;