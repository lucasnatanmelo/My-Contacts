import styled from 'styled-components';

export default styled.select`
    width: 100%;
    border: none;
    height: 52px;
    background: #FFF;
    border: 2px solid #FFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    outline: none;
    padding: 0 16px;
    font-size: 16px;
    transition: border-color 0.2s ease-in;
    appearance: none;

    &:focus{
        border-color: ${({ theme }) => theme.colors.primary.main};
    }

    &[disabled]{
        background-color: ${({ theme }) => theme.colors.gray[100]};
        border-color: ${({ theme }) => theme.colors.gray[200]};
    }
`;

// Somente o styled do input
