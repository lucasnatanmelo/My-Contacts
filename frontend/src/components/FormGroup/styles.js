import styled from 'styled-components';

export const Container = styled.div`
    & + &{
        margin-top: 16px;
    }

    small{
        color: ${({ theme }) => theme.colors.danger.main};
        font-size: 12px;
        display: block;
        margin-top: 8px;
    }

    .form-item{
        position: relative;

        .loader{
            position: absolute;
            top: 18px;
            right: 16px;
        }
    }

`;

// Lógica de margin-top
// Caso tenha um após o outro, ele irá adicionar 16px
