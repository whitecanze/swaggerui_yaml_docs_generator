import styled from 'styled-components'

export const MainWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #222;
    color: #ddd;
`

export const HeaderTitle = styled.h1`
    background-color: #111;
    width: 100%;
    height: auto;
    padding: 1vw 0 1vw 0;
    text-align: center;
    font-size: 2vw;
    font-weight: 500;

    &:before {
        content: '${({ textContent }) => textContent ? textContent : 'Blah Blah'}';
    }
`

export const FormWrapper = styled.div`
    width: 50vw;
    height: auto;
    padding: 3vw;
    display: flex;
    flex-direction: column;
    gap: 2.5vw;
`

export const FormContentWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const FormTitle = styled.h1`
    font-size: 1.25vw;
    font-weight: 300;

    &:before {
        content: '${({ textContent }) => textContent ? textContent : 'Blah Blah'}';
    }
`

export const FormInput = styled.input`
    font-size: 1.25vw;
    font-weight: 300;
    padding: 0 .25vw 0 .25vw;
    min-width: 8vw;
    max-width: 10vw;
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 3px solid #e45275;
    text-align: center;
    border-bottom-redius: 10px;
    color: #ddd;
`

export const FormResult = styled.h1`
    font-size: 1.25vw;
    font-weight: 300;
    color: #ddd;
    &:before {
        content: '${({ textContent }) => textContent ? textContent : 'Blah Blah'}';
    }
`