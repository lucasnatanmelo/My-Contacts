import { useState } from 'react';

export default function useErrors() {
    const [errors, setErrors] = useState([]);

    function setError({ field, message }) {
        const errorAlreadyExists = errors.find((error) => error.field === field);

        if (errorAlreadyExists) {
            return;
        }

        setErrors((prevState) => [
            ...prevState,
            { field, message },
        ]);
    }

    function removeError(fieldName) {
        setErrors((prevState) => prevState.filter(
            (error) => error.field !== fieldName,
        ));
    }

    function getErrorMessageByFieldName(fieldName) {
        // "?" retornará false se fieldName for undefined
        // findError será um valor booleano
        const findError = errors.find((error) => error.field === fieldName)?.message;
        return findError;
    }

    return {
        errors,
        setError,
        removeError,
        getErrorMessageByFieldName,
    };
}
