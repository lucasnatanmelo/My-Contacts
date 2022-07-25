import {
     useCallback,
   } from 'react';
   import useIsMounted from './useIsMounted';

   export default function useSafeAsyncAction() {
       const isMounted = useIsMounted();

       const runSafeAsyncAction = useCallback((callback) => {
           if (isMounted()) {
               callback();
           }
       }, [isMounted]);

       return runSafeAsyncAction;
   }

   // Utilizado para corrigir o erro caso o usuário saia faça a requisição e saia da página
