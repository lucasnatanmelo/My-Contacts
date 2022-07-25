import { useCallback, useEffect, useRef } from 'react';

export default function useIsMounted() {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    });

    const getIsMounted = useCallback(() => isMounted.current, []);

    return getIsMounted;
}

// Utilizado para corrigir o erro caso o usuário saia faça a requisição e saia da página
