import React, { useState } from 'react';
import Main from './Main';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const App = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  return (
    <div>
      <Main
        setOpenLoginModal={setOpenLoginModal}
      />
      {openLoginModal && (
        <LoginForm
          onClose={() => setOpenLoginModal(false)}
          setOpenRegisterModal={setOpenRegisterModal}
          setOpenLoginModal={setOpenLoginModal}
        />
      )}
      {openRegisterModal && (
        <RegisterForm
          onClose={() => setOpenRegisterModal(false)}
          setOpenRegisterModal={setOpenRegisterModal}
          setOpenLoginModal={setOpenLoginModal}
        />
      )}
    </div>
  );
};

export default App;
