import { useAccount } from '@/components/Header/hooks/useAccount.js';
import { useEffect } from 'react';
import { navigate } from 'wouter/use-browser-location';

export const useRedirectIfNoProfile = () => {
	const { profile, loading, initializing } = useAccount();

	useEffect(() => {
        if (!initializing && !loading && !profile) navigate('/auth/sign-in', { replace: true });
    }, [initializing, loading, profile]);
}