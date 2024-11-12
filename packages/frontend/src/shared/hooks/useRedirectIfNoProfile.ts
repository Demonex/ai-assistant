import { useAccount } from '@/components/Header/hooks/useAccount.js';
import { useEffect } from 'react';
import { navigate } from 'wouter/use-browser-location';

export const useRedirectIfNoProfile = () => {
	const { profile } = useAccount();

	useEffect(() => {
        if (!profile) navigate('/auth/sign-in', { replace: true });
    }, [profile]);
}