import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const useAuthForm = () => {
  const { onLogin, onRegister } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearFields = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const switchMode = (registerMode: boolean) => {
    setIsRegistering(registerMode);
    clearFields();
  };

  const handleLogin = async () => {
    const result = await onLogin!(email, password);
    if (result?.error) {
      alert(result.msg);
    }
  };

  const handleRegister = async () => {
    const result = await onRegister!(name, email, password);
    if (result?.error) {
      alert(result.msg);
    } else {
      handleLogin();
    }
  };

  return {
    isRegistering,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    switchMode,
    handleLogin,
    handleRegister,
  };
};
