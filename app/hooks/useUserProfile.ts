import { useEffect, useState } from 'react';
import { profileRequest } from '../services/authService';

export const useUserProfile = () => {
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await profileRequest();
        setUserName(response.data?.name ?? '');
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return {
    userName,
    isLoading,
    hasError,
  };
};
