import { useAccount } from '@/components/Header/hooks/useAccount.js';
import { useEffect } from 'react';
import { navigate } from 'wouter/use-browser-location';

export const useRedirectIfProfile = () => {
	const { profile } = useAccount();

	useEffect(() => {
        if (profile) navigate('/account');
    }, [profile]);
}